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

# CVD Platform Frontend

React + TypeScript frontend built with Vite.

## Table of Contents

- [Overview](#overview)
- [Intended Routes](#intended-routes)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Redux Toolkit Architecture](#redux-toolkit-architecture)
- [Mock Server Workflow](#mock-server-workflow)
- [Scripts Reference](#scripts-reference)
- [Testing](#testing)
- [Storybook](#storybook)
- [Code Quality](#code-quality)

## Overview

This folder contains the UI for the CVD Platform workspace.

## Intended Routes

Route constants are defined in `src/app/providers/Router/config/routes.ts`.

| Route | Purpose | Status |
|---|---|---|
| `/` | Main page | Intended (currently commented out in the router) |
| `/sources` | Sources page | Intended (currently commented out in the router) |
| `/diseases/:id` | Disease details page | Intended (currently commented out in the router) |
| `/research` | Research page | Intended (constant exists; wiring may be pending) |
| `/error` | Error page | Implemented |
| `*` | Not found page | Implemented |

Router wiring lives in `src/app/providers/Router/ui/Router.tsx`.

## Tech Stack

- React 19, TypeScript
- Vite
- Redux Toolkit (+ RTK Query scaffold)
- React Router
- Axios
- Jest + React Testing Library
- Playwright (E2E)
- Storybook
- ESLint, Stylelint, Prettier, Husky, lint-staged

## Getting Started

From the repository root:

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Copy [frontend/.env.example](frontend/.env.example) to `frontend/.env`.

Common variables:

- `VITE_API_URL`  base URL for API requests (used in `src/shared/api/config/config.ts`).
- `SENTRY_DSN`  Sentry DSN for `@sentry/react` init (used in `src/main.tsx`).
- `VITE_RELEASE`  release label reported to Sentry (defaults to `dev`).
- `VITE_LOG_LEVEL`  application logging level.

Example:

```dotenv
VITE_API_URL=http://localhost:4000/api
SENTRY_DSN=
VITE_RELEASE=dev
VITE_LOG_LEVEL=debug
```

Note: Vite only exposes selected env vars to `import.meta.env`. This project is configured to expose both `VITE_` and `SENTRY_` prefixed variables.

## Project Structure

High-level layout:

```
frontend/
  src/
    main.tsx                 # App bootstrap
    app/                     # App shell, providers, layouts
    pages/                   # Route-level pages
    shared/                  # Shared UI + utils + API client
    mock/                    # Local mock JSON data and routes
    assets/                  # Static assets
  tests/
    e2e/                     # Playwright E2E specs
  .storybook/                # Storybook configuration
```

## Redux Toolkit Architecture

Redux is wired through the app provider layer:

- Store creation: `src/app/providers/StoreProvider/config/store.ts`
- Provider wrapper: `src/app/providers/StoreProvider/ui/StoreProvider.tsx`

Data fetching (current approach):

- Thunks live in `src/shared/api/**/**Thunks.ts`
- HTTP calls are implemented in `src/shared/api/**/**Queries.ts` using `axiosInstance`
- Slices handle thunk lifecycle in `extraReducers`

RTK Query note:

- The base API store/middleware is present, but endpoints may be scaffolded/empty depending on current progress.

## Mock Server Workflow

The mock server is powered by `json-server` and serves local JSON files from `src/mock/data/*`.

Start mock server:

```bash
npm run start:mock
```

By default it runs on port `4000`.

Point the frontend at the mock server:

- Set `VITE_API_URL` so the resulting base URL matches your mock routes.
- If your app expects an `/api` prefix, update `src/mock/data/routes.json` accordingly.

## Scripts Reference

All scripts are defined in `package.json`.

| Script | Command | Goal |
|---|---|---|
| `dev` | `vite` | Start the Vite dev server. |
| `build` | `tsc -b && vite build` | Type-check/build TS, then produce a production bundle. |
| `preview` | `vite preview` | Serve the production build locally. |
| `lint` | `eslint "src/**/*.{ts,tsx}" --fix` | Lint TypeScript/TSX and auto-fix issues. |
| `lint:style` | `stylelint "src/**/*.scss" --fix` | Lint SCSS and auto-fix issues. |
| `prettier` | `prettier --write "src/**/*.{ts,tsx,scss,json}"` | Format source files with Prettier. |
| `format` | `npm run prettier && npm run lint && npm run lint:style` | Run formatting + linting in one go. |
| `test` | `jest --config=./jest.config.js` | Run unit/component tests. |
| `test:watch` | `jest --watch` | Run Jest in watch mode. |
| `test:coverage` | `jest --coverage` | Run tests and generate coverage output. |
| `test:e2e` | `npx playwright test` | Run Playwright end-to-end tests. |
| `storybook` | `storybook dev -p 6006` | Run Storybook on port 6006. |
| `build-storybook` | `storybook build` | Build static Storybook output. |
| `start:mock` | `json-server ... --port 4000` | Start local mock API from JSON files. |

## Testing

- Unit/component: Jest + React Testing Library
- E2E: Playwright (`tests/e2e`)

## Storybook

Run Storybook:

```bash
npm run storybook
```

## Code Quality

- ESLint for TypeScript/TSX linting
- Stylelint for SCSS linting
- Prettier for formatting
- Husky + lint-staged for pre-commit automation

## Features

- React v19 with modern hooks
- TypeScript for type safety
- Redux Toolkit for state management
- RTK Query for API data fetching
- React Router v7 for routing
- SCSS modules for styling
- Storybook for component documentation
- Jest and Testing Library for testing
- Vite for fast development and build

## Tech Stack

- **Core:** React 19, TypeScript
- **State Management:** Redux Toolkit
- **Styling:** SCSS Modules, classnames
- **Routing:** React Router v7
- **API Client:** Axios, RTK Query
- **Build Tool:** Vite
- **Testing:** Jest, React Testing Library
- **Documentation:** Storybook
- **Linting and Formatting:** ESLint, Stylelint, Prettier
- **Git Hooks:** Husky, lint-staged

## Library & Tooling Versions

The versions below are taken from `package.json`.

### Runtime dependencies

- **react** `^19.1.1`, **react-dom** `^19.1.1` — UI framework + DOM renderer.
- **react-router-dom** `^7.7.0` — client-side routing.
- **@reduxjs/toolkit** `^2.8.2` and **react-redux** `^9.2.0` — predictable state management, async flows, and store wiring.
- **axios** `^1.10.0` — HTTP client used by the current async thunks/queries.
- **@sentry/react** `^9.44.0` — error reporting (used in thunk error handling).
- **sass** `^1.89.2` — SCSS compilation.
- **classnames** `^2.5.1` — conditional class name composition.
- **react-virtualized** `^9.22.6` — virtualization for large lists/grids.
- **lodash.throttle** `^4.1.1` — throttling for high-frequency events.
- **lucide-react** `^0.561.0` — icon library.
- **motion** `^12.23.22` — animations.
- **react-markdown** `^10.1.0` and **@uiw/react-md-editor** `^4.0.8` — Markdown rendering/editing.

### Developer tooling

- **vite** `^6.3.5` and **@vitejs/plugin-react** `^4.7.0` — dev server + production bundling.
- **typescript** `~5.8.3` — type checking + TS build.
- **eslint** `^9.29.0` (+ `typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-unicorn`) — linting.
- **prettier** `^3.6.1` — formatting.
- **stylelint** `^16.21.0` (+ `stylelint-config-standard-scss`) — SCSS linting.
- **jest** `^30.0.3` + **ts-jest** `^29.4.0` + **@testing-library/react** `^16.3.0` — unit/component tests.
- **playwright** `^1.57.0` — E2E tests.
- **storybook** `^10.1.8` (+ addons) — isolated UI development + documentation.
- **husky** `^9.1.7` + **lint-staged** `^16.1.2` — pre-commit automation.

## File Structure

This repo follows Feature-Sliced Design (FSD). Key folders/files:

```
frontend/
  .env.example
  vite.config.ts
  jest.config.js
  playwright.config.ts
  src/
    main.tsx                 # App bootstrap
    app/                     # App-level providers, layouts, global styles
      providers/
        StoreProvider/       # Redux store configuration + Provider wrapper
        Router/              # Router provider
        ErrorBoundary/       # Error boundary provider
      styles/                # Global SCSS (reset, variables, mixins)
    pages/                   # Route-level pages (ErrorPage, NotFoundPage, ...)
    shared/                  # Reusable infrastructure
      api/                   # Axios config + thunks/slices/queries
      ui/                    # Shared UI kit components
      utils/                 # Shared helpers (e.g., thunk error handling)
      constants/             # App-wide constant strings
    mock/                    # Local JSON mock data and docs
      data/                  # diseases.json, symptoms.json, ...
  tests/
    e2e/                     # Playwright E2E specs
  .storybook/                # Storybook configuration
```

## Redux Toolkit Architecture

Redux is wired through the app provider layer:

- **Store creation**: `src/app/providers/StoreProvider/config/store.ts` exports `createReduxStore()` and a singleton `store`.
- **Provider**: `src/app/providers/StoreProvider/ui/StoreProvider.tsx` creates a store (optionally with `initialState`) and wraps the app with `react-redux`’s `Provider`.

### State shape

The root reducer combines:

- **RTK Query base API**: `src/shared/api/config/api.ts` exports `api` (added as `[api.reducerPath]: api.reducer`) and `api.middleware` is registered.
- **Domain slices**:
  - `diseases`: `src/shared/api/diseases/diseasesSlice.ts`
  - `sources`: `src/shared/api/sources/sourcesSlice.ts`

### Async flow (current implementation)

This project currently uses **createAsyncThunk + axios** for fetching:

- Thunks live in `src/shared/api/**/**Thunks.ts` (e.g. `fetchDiseases`, `fetchSources`).
- HTTP calls are implemented in `src/shared/api/**/**Queries.ts` using `axiosInstance` from `src/shared/api/config/axiosConfig.ts`.
- Each slice handles thunk lifecycle via `extraReducers` and exposes selectors like `selectDiseases`, `selectSources`.

### Error handling

- `src/shared/utils/errorHandler.ts` captures errors in Sentry and extracts Axios error messages when available.

> Note: RTK Query is scaffolded (base `api` store/middleware is present), but the endpoints object is currently empty; fetching is implemented via thunks + axios queries.

## Mock Server Workflow

The mock server is powered by `json-server` and serves local JSON files from `src/mock/data/*`.

### Start mock server

```bash
npm run start:mock
```

Default behavior:

- Runs on port **4000**.
- Serves endpoints such as `/diseases`, `/riskFactors`, `/symptoms`, `/sources`.

### Pointing the frontend at the mock server

The frontend reads `VITE_API_URL` from `.env` (fallback is `http://localhost:4000/api`).

- If you want requests like `/diseases` to work against `json-server`, set `VITE_API_URL` so the resulting base URL matches your mock routes.
- If your app expects an `/api` prefix, you can also update the `src/mock/data/routes.json` mapping to include it.

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd news-client

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following content:

```
VITE_API_URL=http://localhost:4000/api
```

## Scripts Reference

All scripts are defined in `package.json`.

| Script | Command | Goal |
|---|---|---|
| `dev` | `vite` | Start the Vite dev server. |
| `build` | `tsc -b && vite build` | Type-check/build TS, then produce a production bundle. |
| `preview` | `vite preview` | Serve the production build locally. |
| `lint` | `eslint "src/**/*.{ts,tsx}" --fix` | Lint TypeScript/TSX and auto-fix issues where possible. |
| `lint:style` | `stylelint "src/**/*.scss" --fix` | Lint SCSS and auto-fix issues where possible. |
| `prettier` | `prettier --write "src/**/*.{ts,tsx,scss,json}"` | Format source files with Prettier. |
| `format` | `npm run prettier && npm run lint && npm run lint:style` | Run formatting + linting in one go. |
| `test` | `jest --config=./jest.config.js` | Run unit/component tests. |
| `test:watch` | `jest --watch` | Run Jest in watch mode. |
| `test:coverage` | `jest --coverage` | Run tests and generate coverage output. |
| `test:e2e` | `npx playwright test` | Run Playwright end-to-end tests. |
| `storybook` | `storybook dev -p 6006` | Run Storybook on port 6006. |
| `build-storybook` | `storybook build` | Build static Storybook output. |
| `prepare` | `husky` | Install Git hooks (runs on install). |
| `start:mock` | `json-server ... --port 4000` | Start local mock API from JSON files. |

## Testing

The project uses Jest and React Testing Library for unit and component testing. Tests are located next to the components they test in `__tests__` folders.

## Storybook

Storybook is used for documenting UI components. To view the component documentation:

```bash
npm run storybook
```

This will start Storybook on port 6006.

## Code Quality

The project maintains code quality through:

- ESLint for JavaScript/TypeScript linting
- Stylelint for SCSS linting
- Prettier for code formatting
- Husky for Git hooks
- lint-staged for running linters on staged files

## Core Code Style Agreements

- Always use predefined constant values for props instead of arbitrary strings or numbers.

  **Example:**

  ```tsx
  // Good:
  <Button size={buttonSizes.MEDIUM} variant={buttonVariants.PRIMARY} />
  // Avoid:
  <Button size="22px" variant="custom" />

  ```

- Use or create SCSS mixins for repeatable logic (e.g. flexbox, typography) instead of duplicating code.

  **Example:**

  ```scss
  // Good:
  @include flex(row, center, center);
  // Avoid:
  display: flex;
  justify-content: center;
  align-items: center;
  ```

- Keep tests as simple as possible: mock all third-party libraries and complex dependencies.

  **Example:**

  ```tsx
  jest.mock('react-router-dom', () => ({ ... }))
  jest.mock('../SomeComplexComponent', () => () => <div />)
  ```

  ```

  ```

- Use tokens for colors and do not use magic strings or values. Save all colors and other values in SCSS variables.

  **Example:**

  ```scss
  // Good:
  $color-primary: #1976d2;
  .button {
    color: $color-primary;
  }
  // Avoid:
  .button {
    color: '#1976d2';
  }
  ```

- If a component has a hook with logic, move the hook to a separate file.

  **Example:**

  ```tsx
  // useButtonLogic.ts
  export function useButtonLogic() {
    /* ... */
  }
  // Button.tsx
  import { useButtonLogic } from './useButtonLogic';
  ```

- If a component has many constants or large types, move them to separate files.

  **Example:**

  ```tsx
  // Button.constants.ts
  export const BUTTON_SIZES = ['small', 'medium', 'large'];
  // Button.types.ts
  export type ButtonSize = 'small' | 'medium' | 'large';
  ```
