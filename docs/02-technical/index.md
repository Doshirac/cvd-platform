# 2. Technical Implementation

This section describes how the CVD platform is implemented: the frontend SPA, the backend REST API, the database schema, the research/analytics workflow, and the deployment/runtime setup.

## Contents

- [Tech Stack](tech-stack.md)
- [Criteria Documentation](criteria/) - ADRs for evaluation criteria
- [Deployment](deployment.md)

## Solution Architecture

### High-Level Architecture

[Diagram](assets/diagrams/high_level_architecture.jpg) - High-level architecture diagram

Additional diagrams:
- [ER Diagram](assets/diagrams/er_diagram.jpg)
- [Deployment Diagram](assets/diagrams/deployment_architecture_diagram.jpg)

### System Components

| Component | Description | Technology |
|-----------|-------------|------------|
| **Frontend** | Single-page application (disease library UI, theming, routing, error boundaries). | React + TypeScript + Vite |
| **Backend** | REST API for diseases/symptoms/risk factors/sources, pagination/filtering, locale-aware responses, OpenAPI docs. | Node.js + TypeScript + Express |
| **Database** | Persistent, normalized content store (diseases, symptoms, risk factors, translations, junction tables). | PostgreSQL 16 + Prisma |
| **Cache** | Optional read caching to reduce DB load for frequently accessed data. | Redis 7 (ioredis client) |
| **External Services** | Error monitoring and performance tracking (optional via env). | Sentry |

### Data Flow

```
[User Action] → [Frontend (React)] → [HTTP Request] → [Backend (Express)]
                                                      │
                                                      ├─▶ [Cache (Redis)] ──(hit)──▶ [Response]
                                                      │
                                                      └─▶ (miss) [Prisma] → [PostgreSQL] → [Response]
                                                                              
[UI Update] ← [Frontend renders data] ←───────────────────────────────┘
```

Locale-aware content is handled by selecting translations (EN/RU) at the API/service layer based on the `locale` query parameter.

## Key Technical Decisions

| Decision | Rationale | Alternatives Considered |
|----------|-----------|------------------------|
| React + Vite SPA | Fast iteration and simple deployment for a content-focused UI. | Next.js SSR/ISR |
| Express + Prisma API | Lightweight REST API with type-safe DB access and migrations. | Fastify, NestJS, Python (FastAPI/Django) |
| PostgreSQL normalized schema + translation tables | Data integrity, M:N modeling (with metadata), and bilingual support. | Single-table MVP, MongoDB |
| Redis caching for read-heavy endpoints | Improves latency and reduces DB load for repeated requests. | No cache, in-memory cache |
| Observability via Sentry + structured logs | Practical debugging and error reporting without heavy APM tooling. | Console-only logs, full APM suites |

## Security Overview

| Aspect | Implementation |
|--------|----------------|
| **Authentication** | Not implemented (MVP is read-only; no user accounts). |
| **Authorization** | Not implemented (public content API; no roles/permissions). |
| **Data Protection** | No PII/PHI stored by design; DB credentials provided via environment variables; TLS expected at the reverse proxy/hosting layer if deployed publicly. |
| **Input Validation** | Controller-level validation of query parameters (e.g., pagination bounds) with centralized error handling middleware and consistent error payloads. |
| **Secrets Management** | Environment variables via `.env` / Docker Compose (`SENTRY_DSN`, `DATABASE_URL`, etc.); sensitive values should be stored outside git and injected at runtime for staging/production. |

## Criteria Documentation

The evaluation criteria ADRs are located in [criteria/](criteria/) and include:

- [Frontend](criteria/frontend.md)
- [Backend](criteria/backend.md)
- [Database](criteria/database.md)
- [Research](criteria/research.md)
- [Deployment](criteria/deployment.md)
- [Observability](criteria/observability.md)
