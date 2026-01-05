# Project Scope

## In Scope ✅

| Feature | Description | Priority |
|---------|-------------|----------|
| Disease Library (≥25 CVD cards) | Disease cards with description, primary/secondary symptoms, prevention, and references. | Must |
| Localization | UI available in English (default) and Russian. | Must |
| Search & Filters | Full-text search; filters by category (type, risk factors, severity). | Must |
| Research Cards (view-only) | Research content can be viewed on the website via read-only research cards (title + short summary). | Should |
| Data Integration | Ingest ≥2 official datasets; show source and last updated. | Must |
| References Center | Dedicated page with sources/guidelines/datasets. | Should |
| Platform | React FE, Node.js (Express) API, Python analytics, PostgreSQL, Docker, Swagger docs of the BE core endpoints. | Must |
| UX/UI | Responsive (desktop/tablet/phone), Dark/Light theme. | Should |
| Ops | Basic monitoring/logs; SEO basics (e.g., sitemap, meta/OG). | Could |

## Out of Scope ❌

| Feature | Reason | When Possible |
|---------|--------|---------------|
| Medical diagnosis/treatment advice, triage, or symptom checker | Medical decision-making is not the goal of the academic platform and would add clinical/compliance risk. | Future phase / Never |
| User accounts for readers (bookmarks, comments, forums) | Requires identity, moderation, and data protection that exceeds the MVP scope. | Future phase |
| Advanced BI stack (Power BI/Fabric), real-time streaming dashboards | Adds complexity and infrastructure cost; not required for thesis MVP goals. | Future phase |
| ML risk prediction or personalised recommendations | Requires model development, validation, and additional governance. | Future phase |
| Native mobile apps (iOS/Android) and offline mode | Requires separate platform build and maintenance; not needed for MVP. | Future phase |
| Paid/proprietary datasets or manual data entry from paywalled sources | Conflicts with budget constraint and licensing limitations. | Never |

## Assumptions

| # | Assumption | Impact if Wrong | Probability |
|---|------------|-----------------|-------------|
| 1 | Data availability & licensing: official datasets are publicly accessible and permit academic use with citation. | Data ingestion scope would be reduced; alternative datasets/sources required. | Medium |
| 2 | Stability of APIs/files: data formats won’t change materially during the build. | Additional work to adapt ETL/parsing; schedule risk. | Medium |
| 3 | No personal/medical data (PII/PHI) is collected or processed. | Scope and compliance requirements increase significantly. | High |
| 4 | Hosting & tooling: a standard web stack environment is available (Docker-friendly). | Deployment effort increases; environment-specific workarounds needed. | Medium |
| 5 | Review access: a clinical consultant can provide limited content review. | Reduced content quality assurance; higher risk of inaccuracies. | Low |
| 6 | Time allocation: consistent individual effort over the project window. | Deliverables may be reduced or postponed. | Medium |

## Constraints

Limitations that affect the project:

| Constraint Type | Description | Mitigation |
|-----------------|-------------|------------|
| **Time** | Timeline: ~4 months total. | Prioritize MVP features; timebox analytics and content expansion. |
| **Resources** | Team: single developer covering FE/BE/data/content. | Use proven libraries/frameworks; keep architecture simple and testable. |
| **Technology** | Technology stack fixed: React, Node.js (Express), Python, PostgreSQL, Docker. | Stick to stack defaults; avoid experimental tooling or unnecessary rewrites. |
| **Budget** | No paid tools/datasets; rely on open-source and open data. | Use official open datasets; avoid paid APIs and subscriptions. |
| **External/Compliance** | Respect dataset licenses; GDPR-aware cookie/analytics setup if tracking is added. | Keep tracking optional/minimal; document licenses and citations. |
| **Academic** | Deliverables must meet thesis format and review milestones. | Maintain documentation as part of development; schedule review checkpoints. |

## Dependencies

| Dependency | Type | Owner | Status | Why it matters | Management |
|---|---|---|:---:|---|---|
| Official datasets (WHO/EU/national) | External | WHO/Eurostat/CDC/national sources | ✅ | Indicators and evidence inputs | Track sources & licenses; mirror sample data; record “last updated”. |
| Python ETL toolchain (pandas, etc.) | Technical | Python ecosystem | ✅ | Cleaning/aggregation and SVG export | Pin versions; keep a small test dataset; document script entry points. |
| PostgreSQL | External | PostgreSQL community | ✅ | Persistent disease content storage | Provision dev DB; migrations; backup via Docker volume. |
| Node.js + Express | Technical | Node/Express maintainers | ✅ | API delivery for the frontend | Lock Node version; keep OpenAPI contract in sync with controllers. |
| React + Vite | Technical | Meta / Vite community | ✅ | UI rendering, navigation, build pipeline | Pin dependencies; basic E2E smoke; accessibility checks on key views. |
| React Router | Technical | React Router maintainers | ✅ | Client-side routing | Keep route constants centralized; smoke test navigation paths. |
| Redux Toolkit + React Redux | Technical | Redux maintainers | ✅ | Shared client state (data fetching/cache) | Keep slices/thunks scoped by feature; test reducers/thunks; avoid unnecessary global state. |
| Axios | Technical | Axios maintainers | ✅ | HTTP client for REST API calls | Centralize base URL/interceptors; handle timeouts and errors consistently. |
| Sentry (frontend) | External | Sentry | ✅ | Error tracking and performance monitoring | Optional via `SENTRY_DSN`; disable in dev if not configured. |
| Prisma (ORM) + @prisma/client | Technical | Prisma | ✅ | Type-safe DB access and schema migrations | Version pinning; run `generate` after schema changes; keep migrations in repo. |
| Redis (via ioredis) | External | Redis community | ✅ | Cache for read-heavy endpoints | TTL-based caching; define key conventions; provide safe fallback to DB on cache miss. |
| OpenAPI docs (express-jsdoc-swagger) | Technical | Library maintainers | ✅ | API contract documentation | Keep docs close to code; verify `/api-docs` after changes. |
| Inversify (DI) | Technical | Library maintainers | ✅ | Backend dependency injection | Keep container bindings consistent; avoid circular dependencies. |
| Logging (winston, morgan) | Technical | Library maintainers | ✅ | Operational visibility and debugging | Use `LOG_LEVEL`; structured logs; reduce verbosity in production. |
| Testing (Jest, Supertest, Playwright) | Technical | OSS maintainers | ✅ | Regression protection across FE/BE | Run focused unit tests; keep one E2E smoke path for critical pages. |
| Docker runtime (local/dev) + Docker Compose | External | Docker | ✅ | Reproducible environment | One `docker-compose.yml`; healthchecks; basic resource limits. |
| SVG asset hosting (repo) | Technical | Project repo | ✅ | Serving analytics images deterministically | Folder convention; cache headers; fallback UI if asset missing. |
| Academic timeline (committee dates) | Organizational | University/committee | — | Milestone gates for delivery | Backward plan from defense; buffer weeks; freeze scope near deadlines. |
| Browser support | External | Browser vendors | — | Reader accessibility | Define baseline (e.g., last 2 Chrome/Edge/Firefox + iOS/Android); test key pages. |
