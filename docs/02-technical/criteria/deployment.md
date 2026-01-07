# Deployment & DevOps

Original documentation: https://docs.google.com/document/d/1yJLejGVrdJQ4Gq0f72P750_r9pzv-XMS-WSrUH_jQEI/edit?usp=sharing

## Overview

The platform runs as three services via Docker Compose: API (Node/Express), PostgreSQL, and Redis. This provides a reproducible local environment and a production-like deployment model.

## Diagram

[Deployment diagram](assets/diagrams/deployment_architecture_diagram.jpg)

## How to Run (Local)

1. Create a `.env` file (or set environment variables) for the backend.
2. Run `docker compose up --build`.
3. Verify health: `GET /api/health` returns 204.

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

## Notes

- Health checks are configured for API/DB/Redis in `docker-compose.yml`.
- Persistent data is stored in Docker volumes for PostgreSQL and Redis.

## Conclusion

The CVD platform containerization implementation demonstrates a production-ready Docker Compose architecture with three core services: backend API (cvd-api), PostgreSQL database (db-1), and Redis cache (redis-1). The configuration adheres to containerization best practices including multi-stage builds, resource limits, health checks, and persistent volume management.

**Key Achievements:**
- Multi-stage Dockerfile reduces API image size from ~1.5 GB to 891 MB by eliminating build tools and devDependencies from the final image
- Named volumes (pgdata, redisdata) ensure data persistence across container restarts and deployments
- Health checks monitor service availability every 30 seconds with automatic recovery after 3 consecutive failures
- Resource limits (CPU: 0.5 cores API/DB, 0.25 cores Redis; Memory: 512 MB API/DB, 256 MB Redis) prevent resource exhaustion on shared infrastructure
- Non-root user execution enhances security posture
