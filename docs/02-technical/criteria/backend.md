# Criterion: Backend Architecture & API Delivery

## Architecture Decision Record

### Status

**Status:** Accepted

**Date:** 2026-01-05

### Context

The platform needs a simple, reliable REST API for a read-heavy disease library (pagination, filtering, search) with bilingual content (EN/RU). The backend must be maintainable for a single-developer project and easy to run locally in Docker.

### Decision

Implement a TypeScript backend on Node.js with Express using a layered structure (controllers → services → repositories), Prisma for DB access, optional Redis caching, centralized error handling, and OpenAPI docs generated from JSDoc.

### Alternatives Considered

| Alternative | Pros | Cons | Why Not Chosen |
|---|---|---|---|
| Fastify | High performance; schema-first | Refactor cost | Express already fits the project tooling and patterns |
| NestJS | Strong structure; DI patterns | More framework overhead | MVP benefits from lighter architecture |
| FastAPI (Python) | Great for APIs; fits analytics language | Two-stack FE/BE split | Backend already implemented in TS and integrates with FE tooling |

### Consequences

**Positive:** predictable request lifecycle, documented endpoints, reproducible local stack.

**Negative:** DI (Inversify) is not consistently applied across all modules.

**Neutral:** Redis caching can be expanded only for hot paths.

## Implementation Details

### Key Implementation Decisions

- Middleware pipeline: JSON → CORS → routes → notFound → error middleware.
- Explicit domain modules (`disease`, `source`) with services and repositories.
- OpenAPI generated close to route/controller definitions.
- Redis cache as an optimization layer (safe fallback to DB on miss).

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
