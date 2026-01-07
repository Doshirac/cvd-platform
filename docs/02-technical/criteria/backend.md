# Backend Architecture & API Delivery

Original documentation: https://docs.google.com/document/d/1UAZhbPh1Rj8UjTQB2ZCpyM1jcoRafcPedou2hYEtP60/edit?usp=sharing

## Decision

**Status:** Accepted | **Date:** 2026-01-05

TypeScript backend on Node.js + Express with layered architecture (controllers -> services -> repositories), Prisma ORM, Redis caching, centralized error handling, and OpenAPI docs.

| Alternative | Why Not Chosen |
|-------------|----------------|
| Fastify | Express fits existing tooling |
| NestJS | Too much overhead for MVP |
| FastAPI | Would require two-stack split |

## Project Structure

```
backend/src/
 app/          # Express composition
 routes/       # /health, /diseases, /sources
 disease/      # Domain module (controller/service/repo/cache)
 source/       # Domain module
 config/       # Env, swagger, Sentry
 middlewares/  # notFound + error
 errors/       # ApiError factory
 cache/        # Redis client
 utils/        # Logger + request logger
```

## Requirements

| # | Requirement | Status |
|--:|-------------|:------:|
| 1 | Express middleware + routes | Done |
| 2 | REST endpoints (diseases/sources/health) | Done |
| 3 | Pagination/filtering/search | Done |
| 4 | Locale-aware responses (en/ru) | Done |
| 5 | OpenAPI documentation | Done |
| 6 | Centralized error middleware | Done |
| 7 | Redis cache | Done |
| 8 | Consistent DI | Done |

## Limitations

| Limitation | Solution |
|------------|----------|
| DI inconsistently applied | Move to container bindings |
| Inconsistent empty response shapes | Return consistent envelope |

## Conclusion

The CVD Platform Backend delivers a production-ready, modular API for cardiovascular disease data with a focus on reliability, observability, and developer experience.

**Key Achievements:**
- Modular monolith architecture with clear domain boundaries (disease, source, cache, monitoring) and dependency injection
- Full containerization via Docker with multi-stage builds, health checks, resource limits, and graceful shutdown
- Comprehensive observability: structured JSON logging, Sentry error tracking, health endpoints, and centralized error handling
- High test coverage (87%+ lines) with Jest, enforced code quality via ESLint/Prettier/Husky pre-commit hooks
- Bilingual support through Prisma translation tables, Redis caching for performance, and OpenAPI/Swagger documentation

This implementation provides query-optimized, language-aware access to cardiovascular disease data and is ready for integration with frontend applications, analytics dashboards, and future microservices expansion.