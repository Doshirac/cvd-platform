# Technical Implementation

Technical architecture, design decisions, and implementation details of the CVD Platform.

## Contents

- [Tech Stack](tech-stack.md)
- [Criteria Documentation](criteria/)
- [Deployment](deployment.md)

## Original Documentation

- [Backend Documentation](https://docs.google.com/document/d/1UAZhbPh1Rj8UjTQB2ZCpyM1jcoRafcPedou2hYEtP60/edit?usp=sharing)
- [Database Documentation](https://docs.google.com/document/d/1FeM152YZaFifvUPv-9Nsqit8NmtA2ZMBfu1xeoPYsN0/edit?usp=sharing)
- [Containerization Documentation](https://docs.google.com/document/d/1yJLejGVrdJQ4Gq0f72P750_r9pzv-XMS-WSrUH_jQEI/edit?usp=sharing)
- [API Documentation](https://app.gitbook.com/invite/YJjvuHTqbLlvmjZEzQci/J36lOoZ1hCDc4L4xnq64)

## Architecture

### Diagrams

- [High-Level Architecture](docs/assets/diagrams/high_level_architecture.jpg)
- [ER Diagram](docs/assets/diagrams/er_diagram.jpg)
- [Deployment Diagram](docs/assets/diagrams/deployment_architecture_diagram.jpg)

### System Components

| Component | Technology | Description |
|-----------|------------|-------------|
| Frontend | React + Vite | SPA with theming, routing, error boundaries |
| Backend | Express + Prisma | REST API with pagination, filtering, i18n |
| Database | PostgreSQL 16 | Normalized content store |
| Cache | Redis 7 | Read caching layer |
| Monitoring | Sentry | Error tracking (optional) |

### Data Flow

```
[User] → [React SPA] → [Express API] → [Redis Cache] → [PostgreSQL]
                                    └─▶ (cache miss) ──▶ [Prisma] → [DB]
```

## Key Decisions

| Decision | Rationale | Alternative |
|----------|-----------|-------------|
| React + Vite SPA | Fast iteration, simple deployment | Next.js SSR |
| Express + Prisma | Lightweight, type-safe API | Fastify, NestJS |
| Normalized schema | Data integrity, M:N, i18n | Single-table MVP |
| Redis caching | Reduces DB load | In-memory cache |
| Sentry + logs | Practical debugging | Console-only |

## Criteria Documentation

The evaluation criteria ADRs are located in [criteria/](criteria/) and include:

- [Frontend](criteria/frontend.md)
- [Backend](criteria/backend.md)
- [Database](criteria/database.md)
- [Research](criteria/research.md)
- [Deployment](criteria/deployment.md)
- [Observability](criteria/observability.md)
- [Testing](criteria/testing.md)