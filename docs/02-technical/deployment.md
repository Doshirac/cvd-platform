# Deployment & DevOps

Original documentation: https://docs.google.com/document/d/1yJLejGVrdJQ4Gq0f72P750_r9pzv-XMS-WSrUH_jQEI/edit?usp=sharing

## Overview

The containerization layer runs the CVD API, PostgreSQL, and Redis as isolated services managed together with Docker and Docker Compose. It uses a multi-stage Dockerfile to build a lean Node.js 20 runtime image from the TypeScript backend and a docker-compose.yml that wires the API to its dependencies with health checks, resource limits, and persistent volumes. This setup provides consistent local development and deployment while centralizing configuration via shared .env files.

## Diagram of the pipeline setup and interactions

[Diagram](assets/diagrams/deployment_architecture_diagram.jpg) - Here you can find the diagram

## Environment Variables

| Variable | Default | Required | Description | Example |
|---|---:|:---:|---|---|
| `PORT` | `4000` | Yes | The port on which the Express API server listens. Used by the API container and referenced in health checks. | `4000` |
| `NODE_ENV` | `development` | No | Runtime environment mode. Set to `production` for production builds. Affects logging verbosity, error detail exposure, and certain middleware behavior. | `production` |
| `DATABASE_URL` | - | Yes | Full PostgreSQL connection string used by Prisma. Format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`. | `postgresql://cvd_user:password@localhost:5431/cvd_db` |
| `POSTGRES_USER` | - | Yes | PostgreSQL username. Used by the `db` container in docker-compose.yml. | `postgres` |
| `POSTGRES_PASSWORD` | - | Yes | PostgreSQL password. Used by the `db` container. | `password` |
| `POSTGRES_DB` | - | Yes | PostgreSQL database name. Used by the `db` container. | `cvd_db` |
| `REDIS_HOST` | `localhost` | Yes | Hostname or IP of the Redis server. Set to `redis` when running via Docker Compose. | `redis` |
| `REDIS_PORT` | `6379` | Yes | Port on which Redis is listening. | `6379` |
| `SENTRY_DSN` | - | No | Sentry project DSN for error tracking and performance monitoring. If not provided, Sentry integration is disabled. | `https://...` |
| `CORS_ORIGIN` | `*` | No | Allowed origin(s) for CORS requests. Set to your frontend URL in production (e.g., `https://your-frontend.com`). | `http://localhost:5173` |
| `API_URL` | - | No | Base URL of the backend REST API, used by the frontend and tooling to build requests (e.g. `http://localhost:4000/api`). Typically matches the external address of the `/api` prefix in development and production. | `http://localhost:4000/api` |
| `CLIENT_URL` | - | No | Base URL of the frontend application that consumes this API (e.g. `http://localhost:5173`). Can be used for redirects, links in error messages, or security checks when needed. | `http://localhost:5173` |
| `LOG_LEVEL` | `info` | No | Minimal log level for the application logger (e.g. `info`, `debug`, `warn`, `error`). This controls verbosity of JSON logs and is useful to reduce noise in production while keeping more detailed output in development. | `debug` |

## Docker Images

### 4.1 API Service (cvd-api)

#### 4.1.1 Purpose & Functionality

Backend REST API for cardiovascular disease data queries, providing endpoints for diseases, symptoms, risk factors, and sources with pagination, filtering, and bilingual support (en/ru).

#### 4.1.2 Base Image & Justification

`node:20-alpine` — minimal Alpine Linux-based Node.js 20 runtime (~180 MB base) chosen for security, small footprint, and production readiness. Alpine uses musl libc and apk package manager for fast, lightweight builds.

#### 4.1.3 Final Image Size

891.38 MB (19 layers) — includes compiled TypeScript code, production node_modules (~551 MB), Prisma client (~94 KB), and build artifacts (~315 KB).

#### 4.1.4 Key Optimizations

- Multi-stage build: Separate build stage (installs deps, compiles TS with SWC, generates Prisma client) from runtime stage (copies only production artifacts)
- Non-root user: Runs as `app` user for security hardening
- Minimal runtime: Only production dependencies copied from build stage
- Build caching: `package*.json` copied separately before `node_modules` to leverage Docker layer cache
- Entrypoint: `CMD ["node", "build/src/server.js"]` starts the compiled server

### 4.2 Database Service (db)

#### 4.2.1 Purpose & Functionality

PostgreSQL 16 database for persistent storage of diseases, symptoms, risk factors, sources, translations, and relational junction tables (M:N mappings via Prisma ORM).

#### 4.2.2 Base Image & Justification

`postgres:16` (official Docker Hub image) — stable, production-grade PostgreSQL with JSON/JSONB support, advanced indexing, and performance optimizations. Official images are actively maintained and receive security patches.

#### 4.2.3 Final Image Size

635.52 MB (25 layers) — includes PostgreSQL binaries, init scripts, locale support, and default extensions.

#### 4.2.4 Key Optimizations

- Official image: No custom modifications needed; uses maintained Debian base
- Volume mount: Data persisted in `pgdata:/var/lib/postgresql/data` to survive container restarts
- Health check: `pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}` for readiness detection
- Resource limits: 0.5 CPU, 512 MB RAM in docker-compose.yml to prevent runaway queries

### 4.3 Caching Service (redis)

#### 4.3.1 Purpose & Functionality

In-memory key-value cache for frequently accessed disease/symptom/risk factor queries, reducing database load and improving API response times (TTL-based expiration via ioredis).

#### 4.3.2 Base Image & Justification

`redis:7-alpine` (official Redis on Alpine Linux) — lightweight image with Redis 7 features. Alpine is chosen for a minimal attack surface.

#### 4.3.3 Final Image Size

60.66 MB (17 layers) — includes Redis server, redis-cli, persistence tools (redis-check-rdb), and minimal Alpine utilities.

#### 4.3.4 Key Optimizations

- Alpine base for minimal footprint
- Persistence via `redisdata:/data` volume (RDB snapshots)
- Health check: `redis-cli ping` returns `PONG` if Redis is ready
- Resource limits: 0.25 CPU, 256 MB RAM

| Image | Base | Size | Layers | Purpose | Key Feature |
|---|---|---:|---:|---|---|
| `cvd-api` | `node:20-alpine` | 891 MB | 19 | Backend API | Multi-stage build, non-root user |
| `postgres:16` | Debian (official) | 635 MB | 25 | Database | Official image, volume persistence |
| `redis:7-alpine` | Alpine (official) | 61 MB | 17 | Cache | Ultra-lightweight, RDB snapshots |

## Docker Containers

### 5.1 API Service (cvd-api)

#### 5.1.1 External & Internal Ports

External: 4000 (host) → Internal: 4000 (container) — HTTP API accessible at http://localhost:4000/api.

#### 5.1.2 Volumes & Purpose

No persistent volumes mounted directly to the `cvd-api` container — all application code is baked into the image at build time. Data persistence is handled by `db` and `redis` services.

#### 5.1.3 Health Check Strategy

`wget -qO- http://localhost:4000/api/health || exit 1` every 30s (timeout: 5s, retries: 3). The endpoint returns HTTP 204 if the service is healthy; Docker Compose marks the container unhealthy after 3 consecutive failures.

#### 5.1.4 Resource Limits

CPU: 0.5 cores | Memory: 512 MB — prevents resource exhaustion under load.

Figure 2 – CVD-API container initialization in docker-compose.yml

### 5.2 Database Service (db)

#### 5.2.1 External & Internal Ports

External: 5431 (host) → Internal: 5432 (container) — mapped to a non-standard host port to avoid conflicts with local PostgreSQL instances. Connect via localhost:5431.

#### 5.2.2 Volumes & Purpose

`pgdata:/var/lib/postgresql/data` — named Docker volume persisting database files. Data survives container restarts and `docker-compose down` (unless volumes are explicitly removed).

#### 5.2.3 Health Check Strategy

`pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}` every 30s (timeout: 5s, retries: 3). Checks if PostgreSQL is accepting connections; returns exit code 0 when ready.

#### 5.2.4 Resource Limits

CPU: 0.5 cores | Memory: 512 MB.

Figure 3 – DB container initialization in docker-compose.yml

### 5.3 Cache Service (redis)

#### 5.3.1 External & Internal Ports

External: 6379 (host) → Internal: 6379 (container) — Redis default port exposed for direct access via redis-cli or debugging tools.

#### 5.3.2 Volumes & Purpose

`redisdata:/data` — named Docker volume for RDB persistence (snapshot files like `dump.rdb`). Redis writes periodic snapshots to `/data` for crash recovery.

#### 5.3.3 Health Check Strategy

`redis-cli ping` every 30s (timeout: 5s, retries: 3). Returns `PONG` if Redis is running and accepting commands.

#### 5.3.4 Resource Limits

CPU: 0.25 cores | Memory: 256 MB — lighter workload than database.

Figure 4 – Redis container initialization in docker-compose.yml

| Container | Role | Ports (Host→Container) | Volume | Health Check | CPU | Memory |
|---|---|---|---|---|---:|---:|
| `cvd-api` | Backend API | 4000→4000 | None | `wget /api/health` | 0.5 | 512 MB |
| `db` | PostgreSQL 16 | 5431→5432 | `pgdata:/var/lib/postgresql/data` | `pg_isready` | 0.5 | 512 MB |
| `redis` | Redis cache | 6379→6379 | `redisdata:/data` | `redis-cli ping` | 0.25 | 256 MB |

## Metrics

| Metric | Value | Description |
|---|---:|---|
| Build Time (first) | 5–8 min | Initial build with dependency installation, TypeScript compilation (SWC), Prisma client generation |
| Build Time (cached) | 30 sec – 1 min | Subsequent builds leveraging Docker layer cache when only source code changes |
| API Image Size | 891 MB | Multi-stage build with Node.js Alpine, production dependencies, compiled JS, Prisma client |
| PostgreSQL Image Size | 635 MB | Official postgres:16 image |
| Redis Image Size | 61 MB | Official redis:7-alpine image |
| Total Stack Size | ~1.6 GB | Combined size of all 3 images (API + DB + cache) |
| Cold Start (first run) | 6–9 min | Includes image pulls, build, container startup, DB init, health checks |
| Cold Start (cached) | 15–25 s | All images cached, volumes exist, waiting only for service startup + health checks |
| API Startup Time | 10–15 s | From container start to `/api/health` returning 204 |
| PostgreSQL Startup | 5–8 s | From container start to `pg_isready` passing |
| Redis Startup | 2–3 s | From container start to `redis-cli ping` returning PONG |
| API Memory (idle) | 60–100 MB | Typical RAM usage without active requests |
| API Memory (under load) | 200–400 MB | RAM usage with concurrent requests and active caching |
| API CPU (idle) | 5–10% | CPU usage when no requests being processed |
| API CPU (under load) | 30–50% | CPU usage during active request processing |
| PostgreSQL Memory (idle) | 50–80 MB | Minimal connections, no active queries |
| PostgreSQL Memory (under load) | 200–350 MB | Active connections and complex queries |
| PostgreSQL CPU (idle) | 2–5% | Minimal database activity |
| PostgreSQL CPU (under load) | 20–40% | Processing queries and transactions |
| Redis Memory (idle) | 10–30 MB | Minimal cached data |
| Redis Memory (under load) | 50–150 MB | Active caching with TTL-based eviction |
| Redis CPU (idle) | 1–3% | No cache operations |
| Redis CPU (under load) | 5–15% | Frequent cache reads/writes |
| API CPU Limit | 0.5 cores | Maximum CPU allocation per Docker Compose config |
| API Memory Limit | 512 MB | Maximum RAM allocation per Docker Compose config |
| PostgreSQL CPU Limit | 0.5 cores | Maximum CPU allocation per Docker Compose config |
| PostgreSQL Memory Limit | 512 MB | Maximum RAM allocation per Docker Compose config |
| Redis CPU Limit | 0.25 cores | Maximum CPU allocation per Docker Compose config |
| Redis Memory Limit | 256 MB | Maximum RAM allocation per Docker Compose config |
| Health Check Interval | 30 s | Frequency of health checks for all services |
| Health Check Timeout | 5 s | Maximum time to wait for health check response |
| Health Check Retries | 3 | Failed checks before marking container unhealthy |
