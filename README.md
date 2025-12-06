# CVD Platform

Backend for a cardiovascular disease (CVD) knowledge platform.  
This README focuses on the **backend** service (`cvd-api`).

## Backend Overview

- Node.js + TypeScript REST API for querying cardiovascular diseases, symptoms, risk factors, and sources.
- PostgreSQL via Prisma for persistence; Redis via `ioredis` for caching.
- Modular monolith with clear domain modules (`disease`, `source`, `monitoring`, `cache`).
- Fully containerized with Docker and orchestrated via Docker Compose.

## Tech Stack (Backend)

- **Runtime & Lang:** Node.js 20, TypeScript.
- **Framework:** Express 5, CORS, `http-proxy-middleware`.
- **ORM & DB:** Prisma (`@prisma/client`, `prisma`) with PostgreSQL.
- **Caching:** Redis with `ioredis`.
- **Docs:** `express-jsdoc-swagger` for OpenAPI/Swagger docs (`/api-docs`).
- **Logging & Observability:** Winston, Morgan, Sentry (`@sentry/node`, `@sentry/profiling-node`).
- **Tooling:** SWC, Jest + `@swc/jest`, ESLint + `@typescript-eslint`, Prettier, Husky, lint-staged.

## Backend Commands

From the `backend/` directory:

### Core lifecycle

- `npm run dev` – start dev server with `nodemon`.
- `npm run build` – compile TypeScript (and Prisma folder) with SWC into `build/`.
- `npm start` – run compiled server (`build/src/server.js`).

### Database & Prisma

- `npm run migrate` – run Prisma migrations (`prisma migrate dev`).
- `npm run generate` – generate Prisma client.
- `npm run seed` – seed DB with test data (TypeScript seed).
- `npm run seed:prod` – seed DB using compiled JS.
- `npm run prismacore` – **full reset** helper: remove `prisma/migrations`, reset DB, run migrations, generate client, seed.

### Quality & Maintenance

- `npm test` – run Jest test suite.
- `npm run test:coverage` – Jest with coverage report.
- `npm run test:watch` – Jest in watch mode.
- `npm run typecheck` – TypeScript type check with no emit.
- `npm run lint` – ESLint (with auto-fix) on `src/**/*.ts,tsx`.
- `npm run format` – Prettier on `src/**/*.{ts,tsx,js,json,md}`.
- `npm run check:outdated` – list outdated npm deps.
- `npm run deps:update` – update dependencies.
- `npm run audit` – `npm audit`.
- `npm run proxy` – run `src/proxyServer.ts` via `ts-node-dev` (if used as HTTP proxy).

Husky + lint-staged run `eslint --fix` and `prettier` on staged files before each commit.

## Configuration (ENV)

Backend configuration is provided via environment variables (`.env` in `backend/`, plus Docker Compose).

Typical keys:

- **Server**
  - `PORT` – API port (default 4000).
  - `NODE_ENV` – `development` | `production`.

- **Database (PostgreSQL)**
  - `DATABASE_URL` – full Prisma connection string.
  - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` – for DB container.

- **Redis**
  - `REDIS_HOST` – host (`localhost` or `redis` in Docker).
  - `REDIS_PORT` – port (default 6379).

- **API / Client**
  - `API_URL` – base API URL, e.g. `http://localhost:4000/api`.
  - `CLIENT_URL` – frontend URL, e.g. `http://localhost:5173`.
  - `CORS_ORIGIN` – allowed origin for CORS, e.g. `http://localhost:8080`.

- **Observability**
  - `SENTRY_DSN` – Sentry DSN (optional).
  - `LOG_LEVEL` – `debug` | `info` | `warn` | `error`.

Configuration is read via a `ConfigService` wrapper around `process.env`, which enforces required keys and supports numeric parsing.

## Backend Project Structure

```
backend/
├── prisma/
│   ├── migrations/              # Prisma migrations
│   ├── seeder/                  # Seed constants & helpers
│   ├── schema.prisma            # DB schema & relations
│   └── seed.ts                  # Seed entrypoint
├── src/
│   ├── app/
│   │   └── app.ts               # Express app setup
│   ├── cache/
│   │   └── redisClient.ts       # Redis client
│   ├── config/
│   │   ├── configService.ts     # ConfigService (env access)
│   │   ├── keys.ts              # Enum of config keys
│   │   ├── index.ts             # Re-exports + ConfigService instance
│   │   ├── instrument.js        # Sentry instrumentation
│   │   └── swagger.ts           # Swagger/OpenAPI setup
│   ├── constants/
│   │   └── messages.ts          # User-facing/system messages
│   ├── controllers/
│   │   ├── baseController.ts    # Base class with route binding
│   │   └── healthController.ts  # /health and /health/details
│   ├── disease/
│   │   ├── disease.controller.ts
│   │   ├── disease.service.ts
│   │   ├── disease.repository.ts
│   │   ├── disease.interfaces.ts
│   │   └── disease.cache.ts
│   ├── source/
│   │   ├── source.controller.ts
│   │   ├── source.service.ts
│   │   ├── source.repository.ts
│   │   ├── source.interfaces.ts
│   │   └── source.cache.ts
│   ├── errors/
│   │   ├── ApiError.ts
│   │   ├── createApiError.ts
│   │   └── index.ts
│   ├── middlewares/
│   │   ├── errorMiddleware.ts   # Global error handler + Sentry
│   │   └── notFoundMiddleware.ts# 404 handler
│   ├── routes/
│   │   └── index.ts             # Mounts /health, /diseases, /sources
│   ├── utils/
│   │   ├── logger.ts            # Winston logger
│   │   └── requestLogger.ts     # HTTP logging (Morgan)
│   ├── monitoring/              # (if present, metrics/health helpers)
│   ├── container.ts             # Inversify DI container
│   ├── types.ts                 # DI token identifiers
│   ├── main.ts                  # Resolve App from container
│   └── server.ts                # HTTP server + graceful shutdown
├── tests/
│   ├── disease/                 # Controller/service/repository tests
│   └── source/                  # Same pattern for sources
├── Dockerfile                   # Multi-stage Node 20 Alpine
├── docker-compose.yml           # api + Postgres + Redis
├── jest.config.ts
├── nodemon.json
├── package.json
└── tsconfig.json
```

## API & Documentation

Base path: `http://localhost:4000/api`.

Main endpoint groups:

- `GET /api/` – API metadata.
- `GET /api/health` – simple liveness check (204).
- `GET /api/health/details` – detailed health/system info.
- `GET /api/diseases` – diseases list with pagination, filtering and locale.
- `GET /api/diseases/risk-factors` – all risk factors with codes (by locale).
- `GET /api/diseases/symptoms` – all symptoms with codes (by locale).
- `GET /api/sources` – sources list with pagination and search.

Interactive OpenAPI/Swagger docs are available at:

- `http://localhost:4000/api-docs`

Docs are generated from JSDoc annotations using `express-jsdoc-swagger`.

## Testing

- Jest + `@swc/jest` for fast TS tests.
- `supertest` for HTTP-level tests of controllers.
- Tests live under `backend/tests/**` mirroring the `src/**` layout (e.g. `tests/disease/disease.controller.test.ts`).

Commands:

- `npm test` – run all tests.
- `npm run test:coverage` – run tests and generate coverage report.
- `npm run test:watch` – watch mode during development.

Husky + lint-staged ensure ESLint and Prettier run on staged files before each commit.

## Deployment & Containerization (Backend)

- Backend image built via multi-stage **Dockerfile** on `node:20-alpine` (build + runtime).
- Runs as non-root user, with `.dockerignore` excluding dev-only files.
- Orchestrated by **Docker Compose**:
  - `api` – backend
  - `db` – PostgreSQL
  - `redis` – Redis cache
- Health checks configured for:
  - API: `GET /api/health`
  - Postgres: `pg_isready`
  - Redis: `redis-cli ping`
- Resource limits and `restart: unless-stopped` set for production-like behavior.
- Env vars provided via `.env` and `env_file`/`environment` in Compose.

Quick commands:

```
docker-compose up --build   # build & start api, db, redis
docker-compose down         # stop & remove containers
docker-compose logs -f api  # follow backend logs
```

## Global Error Handling & Logging

- Central error middleware logs all errors with context (path, method, stack) and returns consistent JSON:
  - `{ success: false, message, errors?, stack? }`
- Errors are automatically reported to **Sentry** via `Sentry.captureException`.
- 404s are handled by a dedicated `NotFoundMiddleware`.
- Logging:
  - Winston for structured JSON logs (level, message, service, timestamp).
  - Morgan for HTTP access logs integrated into the logger.
- Logs go to stdout/stderr and can be collected by Docker or any centralized logging solution.