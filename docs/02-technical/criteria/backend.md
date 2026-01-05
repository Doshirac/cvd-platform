# Criterion: Backend Architecture & API Delivery

## Architecture Decision Record

### Status

**Status:** Accepted

**Date:** 2026-01-05

### Context

The system requires a reliable REST API to serve a read-heavy disease library with pagination, filtering, and bilingual content (EN/RU). It must be maintainable for a single-developer project, support clear error responses, and be easy to run locally in a containerized environment.

Key forces:
- Clean separation of controller/service/repository responsibilities
- Predictable error handling and observability
- OpenAPI documentation for thesis-grade API description
- Ability to scale read performance (caching)

### Decision

Implement a TypeScript backend on Node.js with Express, using:
- Layered architecture (controllers → services → repositories)
- Prisma client for database access
- Redis for caching (via ioredis)
- OpenAPI generation via JSDoc annotations (`express-jsdoc-swagger`)
- Sentry + Winston + Morgan for error tracking and logging

### Alternatives Considered

| Alternative | Pros | Cons | Why Not Chosen |
|---|---|---|---|
| Fastify | Fast; schema-first patterns | Refactor cost; different middleware ecosystem | Express already integrated with Swagger tooling and middleware patterns |
| NestJS | Strong structure, DI, decorators | More framework overhead and conventions | MVP benefits from lighter structure and incremental layering |
| Python API (FastAPI) | Fits analytics language | Two stacks for FE/BE would shift complexity; existing TS codebase | API already implemented in Node/TS and aligns with FE tooling |

### Consequences

**Positive:**
- Clear API boundaries with documented endpoints
- Stable error response mechanism and middleware pipeline
- Local reproducibility through Docker (API + DB + Redis)

**Negative:**
- Some DI patterns are present (Inversify) but not consistently applied across all instantiation paths

**Neutral:**
- Cache layer can be incrementally expanded based on endpoint hot paths

## Implementation Details

### Project Structure

```
backend/src/
├── app/                      # Express app composition
├── routes/                   # Route mounting (/health, /diseases, /sources)
├── disease/                  # Disease domain module (controller/service/repo/cache)
├── source/                   # Source domain module
├── config/                   # env config keys, swagger, Sentry instrumentation
├── middlewares/              # notFound + error middleware
├── errors/                   # ApiError + createApiError factory
├── cache/                    # Redis client
└── utils/                    # Winston logger + Morgan request logger

backend/prisma/
├── schema.prisma
├── migrations/
└── seed.ts
```

### Key Implementation Decisions

| Decision | Rationale |
|---|---|
| Express middleware pipeline (`json`, `cors`, routes, notFound, error) | Standard, predictable request lifecycle |
| Controller/service/repository split | Keeps business logic testable and separate from transport |
| OpenAPI via JSDoc (`express-jsdoc-swagger`) | Co-locates endpoint docs with implementation |
| Redis client with env-configured host/port | Enables docker-compose and local dev parity |
| Graceful shutdown handlers | Avoids abrupt disconnects and resource leaks |

### Code Examples

Routes and module mounting:

```ts
// backend/src/routes/index.ts
router.use('/health', healthController.router);
router.use('/diseases', diseaseController.router);
router.use('/sources', sourceController.router);
```

Error handling via typed API errors:

```ts
// backend/src/disease/disease.controller.ts
if (isNaN(skipValue) || skipValue < 0) {
  throw createApiError.badRequest(msg.SKIP_PARAM_INCORRECT);
}
```

### Diagrams

- Container/service wiring is described in `docs/02-technical/deployment.md`.

## Requirements Checklist

| # | Requirement | Status | Evidence/Notes |
|---:|---|:---:|---|
| 1 | Express application setup with middleware + routes | ✅ | `backend/src/app/app.ts` |
| 2 | REST endpoints for diseases/sources + health | ✅ | `backend/src/routes/index.ts`, `backend/src/disease/disease.controller.ts`, `backend/src/source/source.controller.ts` |
| 3 | Pagination/filtering/search for diseases | ✅ | `backend/src/disease/disease.controller.ts` and service/repo layer |
| 4 | Locale-aware responses (en/ru) | ✅ | `locale` query handling in disease controller/service; DB has translation tables |
| 5 | OpenAPI documentation available | ✅ | JSDoc annotations + `backend/src/config/swagger.ts` |
| 6 | Centralized error middleware | ✅ | `backend/src/middlewares/errorMiddleware.ts`, `backend/src/errors/createApiError.ts` |
| 7 | Redis cache client wired | ✅ | `backend/src/cache/redisClient.ts` |
| 8 | Dependency Injection consistently used | ⚠️ | Inversify container exists (`backend/src/container.ts`) but some objects are instantiated manually (routes module) |

## Known Limitations

| Limitation | Impact | Potential Solution |
|---|---|---|
| DI is not consistently applied | Harder to swap implementations for testing | Move instantiation into container bindings and resolve controllers/services from DI |
| Some “no results” cases return 200 + message | Clients must handle two shapes (array vs message) | Consider returning empty arrays with metadata, or a consistent envelope |

## References

- `backend/package.json`
- `backend/src/app/app.ts`
- `backend/src/routes/index.ts`
- `backend/src/disease/disease.controller.ts`
- `backend/src/cache/redisClient.ts`
- `backend/src/config/instrument.js`
