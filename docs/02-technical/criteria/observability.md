# Observability (Logging + Error Monitoring)

## Decision

**Status:** Accepted | **Date:** 2026-01-05

Sentry for error monitoring (frontend + backend). Winston for backend logs, Morgan for HTTP request logs. Frontend Error Boundary for crash handling.

| Alternative | Why Not Chosen |
|-------------|----------------|
| Full APM suite | Cost + setup overhead |
| Console-only logs | No aggregation/structure |
| No client monitoring | Silent UI failures |

## Structure

```
frontend/src/main.tsx                    # Sentry init
frontend/src/app/providers/ErrorBoundary/
backend/src/config/instrument.js         # Sentry init
backend/src/utils/logger.ts              # Winston
backend/src/utils/requestLogger.ts       # Morgan
backend/src/middlewares/errorMiddleware.ts
```

## Requirements

| # | Requirement | Status |
|--:|-------------|:------:|
| 1 | Frontend crash fallback | Partially |
| 2 | Frontend error reporting | Partially |
| 3 | Backend error reporting | Done |
| 4 | Backend structured logs | Done |

## Limitations

| Limitation | Solution |
|------------|----------|
| Sentry may capture extra context | Disable default PII collection |
| Monitoring disabled if DSN missing | Require DSN for staging/prod |

## Conclusion

The observability implementation provides comprehensive monitoring and debugging capabilities for both frontend and backend systems.

**Structured Logging:**
- Winston logger with configurable log levels (LOG_LEVEL env variable)
- JSON-formatted logs to stdout/stderr for Docker compatibility
- Log entries include: level, message, timestamp, service identifier, context fields
- Morgan HTTP request logging (method, path, status, response time)
- Docker json-file driver integration for centralized logging (Loki, ELK compatible)

**Error Tracking:**
- Sentry (@sentry/node, @sentry/react) for real-time exception monitoring
- Automatic capture of unhandled exceptions and promise rejections
- Manual Sentry.captureException() calls in catch blocks for context-rich reports
- Performance monitoring for transaction tracking and bottleneck identification
- Optional via SENTRY_DSN environment variable
- Debug endpoint (/api/debug-sentry) for integration testing

**Global Error Handling:**
- Centralized Express error middleware catches all controller/service errors
- Automatic logging with full context (message, stack, path, method)
- Automatic Sentry reporting without manual catch blocks
- Structured JSON responses (success: false, message, errors[], stack in dev)
- Custom ApiError class for semantic HTTP status codes
- 404 Not Found middleware for undefined routes

This implementation enables faster debugging, clearer demo reliability, and comprehensive error visibility across the full stack.