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
