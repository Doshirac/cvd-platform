# Criterion: Observability (Logging + Error Monitoring)

## Architecture Decision Record

### Status

**Status:** Accepted

**Date:** 2026-01-05

### Context

The platform needs basic operational visibility suitable for an MVP and thesis demonstration:
- Detect and diagnose runtime errors in frontend and backend
- Provide request-level logging for API debugging
- Keep the setup lightweight (no heavy APM stack)

### Decision

Implement observability with:
- Sentry for error tracking (frontend + backend)
- Winston for structured application logs (backend)
- Morgan for HTTP request logging (backend)
- A client-side Error Boundary to render a fallback UI and report errors

### Alternatives Considered

| Alternative | Pros | Cons | Why Not Chosen |
|---|---|---|---|
| Full APM suite (Datadog/New Relic) | Deep visibility | Cost, setup complexity | MVP scope and budget constraints |
| Console logs only | Minimal setup | Poor diagnostics and no aggregation | Hard to debug production-like failures |
| No client monitoring | Simpler | Silent UI failures | Poor user experience and no visibility into client errors |

### Consequences

**Positive:**
- Unified error capture via Sentry on both sides
- Structured logs and request traces for backend debugging

**Negative:**
- Sentry config must be handled carefully to avoid leaking sensitive data

**Neutral:**
- Sampling rates can be tuned later for cost/performance

## Implementation Details

### Project Structure

```
frontend/src/
├── main.tsx                                   # Sentry init (frontend)
└── app/providers/ErrorBoundary/               # Error boundary

backend/src/
├── config/instrument.js                       # Sentry init (backend)
├── utils/logger.ts                            # Winston logger
└── utils/requestLogger.ts                     # Morgan request logging
```

### Key Implementation Decisions

| Decision | Rationale |
|---|---|
| Sentry initialization on startup | Captures exceptions early and consistently |
| Error boundary fallback UI | Prevents blank screens for UI crashes |
| Morgan request logs (skip health checks) | Useful diagnostics without noisy endpoints |
| JSON logs in non-dev environments | Easier ingestion/processing |

### Code Examples

Backend Sentry init:

```js
// backend/src/config/instrument.js
Sentry.init({
  dsn: configService.get(keys.SENTRY_DSN),
  environment: configService.get(keys.NODE_ENV) || 'development',
});
```

Backend request logging:

```ts
// backend/src/utils/requestLogger.ts
app.use(morgan(format, { stream: logStream, skip: (req) => req.url === '/health' }));
```

Frontend error capture:

```tsx
// frontend/src/app/providers/ErrorBoundary/ui/ErrorBoundary.tsx
componentDidCatch(error, errorInfo) {
  Sentry.captureException(`ErrorBoundary caught an error: ${error} ${errorInfo}`);
}
```

## Requirements Checklist

| # | Requirement | Status | Evidence/Notes |
|---:|---|:---:|---|
| 1 | Frontend error monitoring | ✅ | `frontend/src/main.tsx` (Sentry init) |
| 2 | Frontend crash fallback UI | ✅ | `frontend/src/app/providers/ErrorBoundary/ui/ErrorBoundary.tsx` |
| 3 | Backend error monitoring | ✅ | `backend/src/config/instrument.js` and Sentry Express error handler in `backend/src/app/app.ts` |
| 4 | Backend structured logging | ✅ | `backend/src/utils/logger.ts` (Winston) |
| 5 | Backend request logging | ✅ | `backend/src/utils/requestLogger.ts` (Morgan) |
| 6 | Configurable log level | ✅ | `LOG_LEVEL` via config service |

## Known Limitations

| Limitation | Impact | Potential Solution |
|---|---|---|
| Frontend Sentry config uses `sendDefaultPii: true` | Risk of sending unintended data | Set `sendDefaultPii` to false unless explicitly required |
| Sentry is optional via env var | Missing monitoring if DSN not set | Document required env for staging/prod |

## References

- `frontend/src/main.tsx`
- `frontend/src/app/providers/ErrorBoundary/ui/ErrorBoundary.tsx`
- `backend/src/config/instrument.js`
- `backend/src/utils/logger.ts`
- `backend/src/utils/requestLogger.ts`
- `.env.example` (SENTRY_DSN, LOG_LEVEL, NODE_ENV)
