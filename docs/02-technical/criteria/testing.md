# Testing & Quality Assurance

## Decision

**Status:** Accepted | **Date:** 2026-01-05

Jest for unit tests (backend + frontend) focused on error handling/config/utilities. Playwright for E2E smoke coverage.

| Alternative | Why Not Chosen |
|-------------|----------------|
| No tests | Regressions likely |
| Only E2E | Too slow/brittle |
| Only unit | Miss integration issues |

## Structure

```
backend/tests/
frontend/tests/
```

## Requirements

| # | Requirement | Status |
|--:|-------------|:------:|
| 1 | Backend unit tests | Done |
| 2 | Frontend unit test setup | Done |
| 3 | E2E test harness | Done |

## Limitations

| Limitation | Solution |
|------------|----------|
| Limited user story coverage | Add tests as routes complete |

## Conclusion

[Testing Coverage](assets/screenshots/testing_coverage_BE.jpg)

As of the latest run, the project achieves **94.02% line coverage** and **93.65% statement coverage** across all source files.

**Key Coverage Highlights:**
- **Controllers:** 92.3% statement coverage (base controller fully covered on a line level, with partial branch and function coverage due to conditional flows)
- **Disease module:** 90.22% statement coverage (controller well covered; repository and service layers partially covered with several uncovered edge and error-handling paths)
- **Source module:** 97.95% statement coverage (comprehensive controller, repository, and service coverage with minimal uncovered service logic)
- **Config & Constants:** 100% coverage for `types.ts`, `configService.ts`, `keys.ts`, and `messages.ts`
