# Technology Stack

## Stack Overview

| Layer | Technology | Version | Justification |
|-------|------------|---------|---------------|
| Frontend | React + TypeScript + Vite | React 19.1, TS 5.8, Vite 6.3 | Fast SPA dev/build |
| UI Styling | SCSS Modules + Sass | Sass 1.89 | Lightweight theming |
| Backend | Node.js + Express | Node 20, Express 5.1 | REST API performance |
| Database | PostgreSQL | 16 | Relational integrity |
| ORM | Prisma | 6.19 | Type-safe data access |
| Cache | Redis + ioredis | Redis 7 | Read caching |
| Analytics | Python ETL | 3.x | Deterministic outputs |
| Deployment | Docker Compose | - | Multi-service orchestration |

## Key Decisions

| Decision | Rationale | Alternative Rejected |
|----------|-----------|---------------------|
| React + Vite | Fast iteration, SPA routing, theming | Next.js (SSR complexity) |
| Express + Prisma | Lightweight API, type-safe DB | Django (heavier stack) |
| Redux Toolkit | Centralized data lifecycle | Local state only |
| Normalized schema | Data integrity, M:N relations, i18n | Single denormalized table |
| Python ETL | Cacheable visuals, no BI dependencies | Power BI/live charts |

## Development Tools

| Tool | Purpose |
|------|---------|
| VS Code | IDE with ESLint/Prettier |
| Git + Husky | Version control, pre-commit hooks |
| Jest + Playwright | Unit/E2E testing |
| Prisma CLI | Migrations, seeding |
| OpenAPI + Storybook | API/component documentation |
| Docker Compose | Local environment |

## External Services

| Service | Purpose |
|---------|---------|
| Sentry | Error monitoring |
| WHO/Eurostat/CDC | Open health datasets |
