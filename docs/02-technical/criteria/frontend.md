# Criterion: Frontend Architecture & UX Delivery

## Architecture Decision Record

### Status

**Status:** Accepted

**Date:** 2026-01-05

### Context

The project needs a responsive UI to browse/read disease content with search/filters and EN/RU support. The frontend should be fast to iterate and testable in a single-developer timeline.

### Decision

Build a React + TypeScript SPA using Vite. Use React Router for navigation, Redux Toolkit for shared data flow, an Error Boundary + Sentry for crash handling, and SCSS modules for themeable styling.

### Alternatives Considered

| Alternative | Pros | Cons | Why Not Chosen |
|---|---|---|---|
| Next.js (SSR/ISR) | Better SEO defaults; SSR capabilities | More framework complexity; additional server concerns | MVP is a read-focused library where SSR is not required; faster iteration preferred |
| No global store (local state only) | Less boilerplate for small apps | Harder cross-page caching and shared data | Shared data (diseases/sources/risk factors/symptoms) benefits from a predictable state layer |
| UI framework (e.g., MUI) | Faster component assembly | Design constraints, heavier runtime | Project already uses SCSS modules and shared UI components |

### Consequences

**Positive:**
- Fast dev experience and builds via Vite
- Predictable state/data flow via Redux Toolkit
- Centralized error capture (Sentry + Error Boundary)
- Testability (Jest/RTL + Playwright; Storybook)

**Negative:**
- SPA navigation requires explicit handling for SEO basics
- Global store adds some complexity for small pages

**Neutral:**
- Some routes/pages are scaffolded but not fully wired yet (see checklist)

## Implementation Details

### Project Structure

```
frontend/src/
├── app/
│   ├── App.tsx                        # BrowserRouter + providers
│   ├── layouts/MainLayout/            # Header + <Outlet /> shell
│   └── providers/
│       ├── ErrorBoundary/             # React Error Boundary
│       ├── Router/                    # Route config + lazy pages
│       └── StoreProvider/             # Redux store provider
├── pages/                             # Route-level pages (Error/NotFound implemented)
├── shared/
│   ├── api/                           # API client + slices/thunks
│   ├── context/                       # Theme context
│   ├── hooks/                         # useTheme and helpers
│   └── ui/                            # Shared UI components (Header, Loader, etc.)
└── assets/                            # SVG assets
```

### Key Implementation Decisions

| Decision | Rationale |
|---|---|
| BrowserRouter-based SPA | Simple routing for a content library |
| Lazy-loading for route pages | Reduce initial bundle; faster first paint |
| Global layout (MainLayout) | Consistent header + content; shared data prefetch |
| Redux Toolkit store | Shared async data fetching and caching across views |
| Sentry + ErrorBoundary | Centralized error capture and user-friendly fallback |

### Code Examples

Provider composition (routing + error boundary + store):

```tsx
// frontend/src/app/App.tsx
<BrowserRouter>
  <ErrorBoundary>
    <StoreProvider>
      <Router />
    </StoreProvider>
  </ErrorBoundary>
</BrowserRouter>
```

Redux store assembly (RTK + RTK Query middleware):

```ts
// frontend/src/app/providers/StoreProvider/config/store.ts
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  diseases: diseasesReducer,
  sources: sourcesReducer,
});
```

### Diagrams

- High-level deployment/service interaction is documented in the technical deployment chapter.

## Requirements Checklist

| # | Requirement | Status | Evidence/Notes |
|---:|---|:---:|---|
| 1 | SPA entrypoint and routing foundation | ✅ | `frontend/src/app/App.tsx`, `frontend/src/app/providers/Router/ui/Router.tsx` |
| 2 | Centralized layout shell | ✅ | `frontend/src/app/layouts/MainLayout/MainLayout.tsx` |
| 3 | Shared store for API data | ✅ | `frontend/src/app/providers/StoreProvider/config/store.ts` |
| 4 | Error handling (user + monitoring) | ✅ | `frontend/src/app/providers/ErrorBoundary/ui/ErrorBoundary.tsx`, `frontend/src/main.tsx` |
| 5 | Theme context available | ✅ | `frontend/src/shared/hooks/useTheme.ts` |
| 6 | Main library pages (Main/Sources/Disease) wired to router | ⚠️ | Routes exist but are currently commented in `Router.tsx` |
| 7 | Research cards/gallery route implemented | ❌ | Route constant exists (`/research`), but no page is mounted in router |
| 8 | Automated testing for critical flows | ✅ | Jest + Playwright configured; tests present under `frontend/tests/e2e/` and `frontend/src/**/__tests__` |

## Known Limitations

| Limitation | Impact | Potential Solution |
|---|---|---|
| Core content pages not mounted in router | Most user stories remain inaccessible in UI | Uncomment/implement `MainPage`, `SourcePage`, `DiseasePage` and add `ResearchPage` |
| SPA SEO is limited by default | Discoverability may be reduced | Add sitemap/meta tags, and consider SSR only if needed |

## References

- `frontend/package.json`
- `frontend/src/app/App.tsx`
- `frontend/src/app/providers/Router/ui/Router.tsx`
- `frontend/src/app/providers/StoreProvider/config/store.ts`
- `frontend/src/main.tsx`
