# Frontend Architecture & UX Delivery

## Decision

**Status:** Accepted | **Date:** 2026-01-05

React + TypeScript SPA using Vite. React Router for navigation, Redux Toolkit for shared data flow, Error Boundary + Sentry for crash handling, SCSS modules for theming.

| Alternative | Why Not Chosen |
|-------------|----------------|
| Next.js (SSR/ISR) | Extra complexity for read-only library |
| No global store | Harder cross-page caching |
| UI framework (MUI) | Already using SCSS modules |

## Project Structure

```
frontend/src/
 app/
    App.tsx              # BrowserRouter + providers
    layouts/MainLayout/  # Header + Outlet shell
    providers/           # ErrorBoundary, Router, StoreProvider
 pages/                   # Route pages (Error/NotFound implemented)
 shared/
    api/                 # API client + slices/thunks
    context/             # Theme context
    hooks/               # useTheme and helpers
    ui/                  # Shared UI components
 assets/
```

## Requirements

| # | Requirement | Status |
|--:|-------------|:------:|
| 1 | SPA entrypoint and routing | Partially |
| 2 | Centralized layout shell | Done |
| 3 | Shared store for API data | Done |
| 4 | Error handling | Partially |
| 5 | Theme context | Done |
| 6 | Main library pages wired | Not started |
| 7 | Research cards route | Not started |

## Limitations

| Limitation | Solution |
|------------|----------|
| Core pages not mounted | Implement MainPage, SourcePage, DiseasePage |
| SPA SEO limited | Add sitemap/meta tags |

## Conclusion

The CVD Platform Frontend delivers a modern, maintainable React SPA for browsing cardiovascular disease content with strong developer experience and UX foundations.

**Key Achievements:**
- React 19 + TypeScript + Vite stack with fast HMR and optimized builds
- Redux Toolkit for centralized state management with RTK Query scaffold for API data
- 13+ reusable UI components (Header, Button, Input, Loader, ThemeToggle, LanguageSwitcher, etc.)
- Dark/Light theming via SCSS modules and ThemeContext
- Error Boundary + Sentry integration for crash handling and monitoring
- Playwright E2E tests (error-page, not-found-page, theme-toggle) and Jest unit test setup
- Storybook for component documentation and visual testing
- Code quality enforced via ESLint, Prettier, Stylelint, and Husky pre-commit hooks

This implementation provides a scalable foundation for disease library UI with theming, i18n readiness, and comprehensive error handling.