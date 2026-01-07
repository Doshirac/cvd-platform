# Retrospective

This section reflects on the development of the **CVD Platform**, summarizing results, limitations, and lessons learned.

## Project Status Overview

The project reached a **functional MVP state** with:

- **Working backend** with layered architecture (controllers → services → repositories)
- **Normalized data model** with bilingual support (EN/RU) and junction tables for symptoms/risk factors
- **Docker Compose** setup for reproducible local development (API + PostgreSQL + Redis)
- **Testing infrastructure** on both ends (Jest for backend, Playwright for e2e)
- **Frontend partially scaffolded** — some routes incomplete due to late requirements

## What Went Well

### Technical Successes

- Layered backend architecture with Prisma + PostgreSQL provided predictable API behavior
- Docker Compose enabled consistent cross-machine development
- Normalized schema (translations, junction tables) supported bilingual "disease cards"
- Early observability setup (Winston/Morgan, Sentry) reduced debugging time
- Testing foundation exists for future reliability improvements

### Process Successes

- Read-only MVP scope reduced compliance risk (no user accounts, no PHI/PII)
- Documentation treated as deliverable, aligned to actual codebase
- Incremental development: backend/data model stabilized before UI work

### Personal Achievements

- Built full-stack system (React + Vite, Express + Prisma, PostgreSQL + Redis, Docker)
- Improved data modeling skills (migrations, seeding, normalized entities)
- Strengthened ability to translate academic requirements into implementable MVP

## What Didn't Go as Planned

| Planned | Actual Outcome | Cause | Impact |
|---------|----------------|-------|--------|
| Fully working frontend pages | Partially scaffolded; some routes show Not Found | Late frontend requirements from teachers | Critical |
| Complete Disease Card UI | Backend ready, UI not finished end-to-end | Time constraints; prioritized backend + docs | High |
| Full EN/RU localization toggle | Backend supports locale; UI switch incomplete | Limited time for i18n flow | Medium |

### Key Challenges

1. **Late Frontend Requirements** — Requirements clarified after deadline; focused on stabilizing backend and documentation instead
2. **Documentation Drift** — Templates easily diverged from implementation; resolved by re-checking controllers/OpenAPI

## Technical Debt & Known Limitations

| ID | Issue | Severity | Potential Fix |
|----|-------|----------|---------------|
| TD-001 | Frontend routes not fully wired | High | Complete route config; add e2e coverage |
| TD-002 | Inconsistent DI patterns in backend | Medium | Standardize to one approach |
| TD-003 | API returns message instead of empty array | Low | Return empty arrays + metadata |

## Future Development Directions

### High Priority

1. **Complete frontend flows** — Wire main routes to real endpoints with proper loading/error states
2. **Robust localization** — Ensure language switch controls `locale` in all API requests

### Medium Priority

3. **Standardize API contracts** — Consistent response shapes for list endpoints
4. **Expand test coverage** — Playwright for happy paths; backend integration tests

### Nice to Have

5. SEO metadata and sitemap
6. Cache TTL tuning and invalidation strategy
7. Formalize Python analysis pipeline

## Lessons Learned

### Technical

| Lesson | Application |
|--------|-------------|
| Normalized schema pays off even for MVPs | Start with clean relational model; avoid over-denormalization |
| Standardized error/empty-state contracts matter | Treat response shapes as product contract |
| Reproducible environments reduce risk | Containerize early; document env vars |

### Process

| Lesson | Application |
|--------|-------------|
| Requirements need a freeze point | Agree on MVP requirement freeze date |
| Documentation alongside implementation | Keep docs close to code changes |

### What Would Be Done Differently

| Area | Change | Why |
|------|--------|-----|
| Planning | Set "end-to-end MVP demo" milestones earlier | Prevents UI lagging behind backend |
| Technology | Enforce single DI approach | Reduces maintenance overhead |
| Process | Formal requirements sign-off checkpoint | Reduces late changes and scope creep |
| Scope | Cut to "core reading flows" first | Higher probability of complete UX |

## Skills Developed

| Skill | Before | After |
|-------|--------|-------|
| Full-stack delivery (FE/BE/DB) | Intermediate | Advanced |
| Database modeling (Prisma/PostgreSQL) | Beginner–Intermediate | Advanced |
| Testing (Jest/Playwright/Storybook) | Beginner | Intermediate |

## Key Takeaways

1. A coherent MVP requires an end-to-end "happy path" early
2. Data modeling decisions strongly determine maintainability
3. Clear contracts reduce confusion and ease thesis evaluation

---

*Retrospective completed: 2026-01-05*
