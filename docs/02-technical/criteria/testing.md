# Criterion: Testing & Quality Assurance

## Architecture Decision Record

### Status

**Status:** Accepted

**Date:** 2026-01-05

### Context

The project needs basic automated tests to reduce regressions while iterating quickly across a full-stack codebase (frontend + backend). Tests must be lightweight and runnable locally.

### Decision

Use Jest for unit tests in both backend and frontend, with focused tests around error handling/config/utilities. Use Playwright for end-to-end smoke coverage in the frontend where applicable.

### Alternatives Considered

| Alternative | Pros | Cons | Why Not Chosen |
|---|---|---|---|
| No tests | Fastest to write features | Regressions likely | Not suitable for thesis-quality delivery |
| Only E2E tests | Real user flows | Slower, brittle | Too heavy for quick iteration |
| Only unit tests | Fast, stable | Miss integration issues | Add E2E later for key flows |

### Consequences

**Positive:** faster refactors, confidence in core helpers.

**Negative:** some UI routes are not fully wired, limiting E2E value.

**Neutral:** test coverage can be expanded when routes stabilize.

## Implementation Details

### Key Implementation Decisions

- Keep unit tests small and deterministic (no external network calls).
- Prefer testing error factories/config parsing and domain services.

### Project Structure

```
backend/tests/
frontend/tests/
```

## Requirements Checklist

| # | Requirement | Status | Evidence/Notes |
|---:|---|:---:|---|
| 1 | Backend unit tests exist | ✅ | `backend/tests/*` |
| 2 | Frontend unit test setup exists | ✅ | Jest/RTL config + setup |
| 3 | E2E test harness exists | ✅ | Playwright config + tests folder |
| 4 | CI-friendly commands available | ⚠️ | Depends on project scripts |

## Known Limitations

| Limitation | Impact | Potential Solution |
|---|---|---|
| Limited coverage of user stories | Regressions possible in unwired routes | Add tests as routes/features are completed |
