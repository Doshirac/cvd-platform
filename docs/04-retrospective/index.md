# 4. Retrospective

This section reflects on the project development process, lessons learned, and future improvements.

## What Went Well ✅

### Technical Successes

- The backend architecture (controllers → services → repositories) with Prisma + PostgreSQL provided a clear structure for read-heavy endpoints and helped keep API behavior predictable.
- Docker + Docker Compose made local development reproducible (API + DB + Redis), which simplified troubleshooting and allowed the project to be run consistently across machines.
- The normalized data model with translation tables (EN/RU) and junction tables for symptoms/risk factors supported the project’s main academic goal: standardized “disease cards” with explicit primary vs secondary factors.
- Observability was set up early (Winston/Morgan on the backend and Sentry hooks), which helped reduce time spent debugging silent failures.
- Testing infrastructure exists on both sides (backend unit tests with Jest; frontend unit tests + Playwright e2e), which provides a foundation for improving reliability.

### Process Successes

- The scope was kept focused on a read-only MVP (no user accounts, no PHI/PII processing), which reduced compliance risk and kept the system design defensible for a thesis project.
- Documentation was treated as a deliverable: API reference, DB schema, criteria/ADR-style pages, and the user guide were aligned to the actual codebase instead of staying as templates.
- Incremental development worked well: backend/data model + docs were stabilized first, then the user-facing flows were documented and validated against repository reality.

### Personal Achievements

- Built and maintained an end-to-end stack (React + Vite frontend, Express + Prisma backend, PostgreSQL + Redis, Docker Compose) within a thesis timeline.
- Improved skills in data modeling and schema evolution (Prisma migrations, seed strategy, normalized entities + translations).
- Strengthened the ability to translate academic requirements into an implementable MVP (scope control, out-of-scope decisions, and criterion-based documentation).

## What Didn't Go As Planned ⚠️

| Planned | Actual Outcome | Cause | Impact |
|---------|---------------|-------|--------|
| Fully working frontend pages for the core routes (Home, Sources, Disease details, Research cards) | Frontend is partially scaffolded; some routes/pages are not fully wired and users may reach Not Found for intended navigation paths | Small amount of time and the teachers sent the requirements to the frontend after the deadline, so the frontend could not be completed | Critical |
| Standardized “Disease Card” page (description, symptoms, prevention + references) | Backend/data model support exists, but the full disease card UI flow is not finished end-to-end in the current build | Time constraints; prioritization of backend + documentation completeness for thesis delivery | High |
| Fully functional localization toggle affecting content (EN/RU) | Locale support exists in the backend and data model; the UI language switch behavior may be incomplete depending on current wiring | Limited time for implementing full i18n flow across pages and ensuring consistent API requests with `locale` | Medium |

### Challenges Encountered

1. **Late / shifting requirements for frontend delivery**
   - Problem: Frontend requirements were clarified late, after the planned deadline.
   - Impact: The UI could not be completed to the same level as the backend/data model and documentation, and some routes remain scaffolded rather than finished.
   - Resolution: Focused on stabilizing the backend, database schema, and documentation so the project remains coherent and defensible; documented the current UI limitations transparently.

2. **Keeping documentation aligned with real implementation**
   - Problem: Several documentation files started as templates and could easily drift away from the actual code behavior.
   - Impact: Risk of thesis documentation being inconsistent with the system (especially around endpoints, error responses, and “no results” responses).
   - Resolution: Re-checked controllers/OpenAPI and updated the documentation to match the implemented API responses and the current frontend wiring status.

## Technical Debt & Known Issues

| ID | Issue | Severity | Description | Potential Fix |
|----|-------|----------|-------------|---------------|
| TD-001 | Frontend routes/pages not fully wired | High | Navigation can include intended routes, but some route targets are not fully implemented yet, leading to Not Found for users. | Finish route configuration and implement missing pages; add basic smoke/e2e coverage for the primary flows. |
| TD-002 | Inconsistent instantiation / DI usage in backend | Medium | Some DI patterns are present but not consistently applied across all setup paths, which can make maintenance harder as the project grows. | Standardize one approach (DI container everywhere or explicit wiring) and remove partial patterns. |
| TD-003 | API “no results” semantics may surprise clients | Low | Some list endpoints return HTTP 200 with `{ "message": "No disease found." }` instead of an empty array; this requires special handling in the UI/client. | Standardize list responses (prefer empty arrays + metadata) or document + wrap the behavior consistently in the frontend API layer. |

### Code Quality Issues

- Frontend feature pages and router wiring need consolidation (ensure each header link maps to an implemented route and consistent layout state).
- Improve end-to-end coverage for primary user flows (browse diseases → open disease card → view sources), so regressions are caught early.
- Reduce duplication between built JS output (build folder) and TypeScript sources when referencing code in documentation and ensure a single source of truth during development.

## Future Improvements (Backlog)

If there was more time, these features/improvements would be prioritized:

### High Priority

1. **Finish core frontend flows (MVP completeness)**
   - Description: Implement and wire the main routes (Home, Sources, Disease details, Research cards) to the real backend endpoints; ensure consistent loading/empty/error states.
   - Value: Delivers the end-user experience described in the thesis and removes current Not Found gaps.
   - Effort: Medium–High

2. **Implement robust localization behavior end-to-end**
   - Description: Ensure the language switch reliably controls `locale` in API requests and updates visible content across pages.
   - Value: Meets the bilingual requirement and improves usability for the target audience.
   - Effort: Medium

### Medium Priority

3. **Standardize API response contracts and client handling**
   - Description: Make list endpoints return consistent shapes (arrays + optional pagination metadata) and normalize behavior in the frontend API client.
   - Value: Simplifies UI integration and reduces edge-case bugs.

4. **Strengthen testing for user-facing behavior**
   - Description: Add Playwright coverage for “happy path” navigation and empty-state flows; expand backend integration tests for filtering/search.
   - Value: Prevents regressions and improves confidence during final thesis demos.

### Nice to Have

5. Add basic SEO-friendly SPA metadata (title/description per route) and a sitemap for improved discoverability.
6. Improve caching strategy (TTL tuning and invalidation plan) for read-heavy endpoints.
7. Formalize the analysis pipeline (pinned Python env, repeatable scripts, artifact export conventions).

## Lessons Learned

### Technical Lessons

| Lesson | Context | Application |
|--------|---------|-------------|
| A normalized schema pays off even for MVPs | Symptoms/risk factors and bilingual content quickly become complex without structure | Start with a clean relational model and add only required entities/relations, but avoid over-denormalization early. |
| Standardized error/empty-state contracts matter | Clients must handle “no results” and error responses consistently | Treat response shapes as part of the product contract; validate with docs and tests. |
| Reproducible environments reduce project risk | Docker Compose allowed fast setup and fewer “works on my machine” issues | Containerize early and document the environment variables and health checks. |

### Process Lessons

| Lesson | Context | Application |
|--------|---------|-------------|
| Requirements need a freeze point | Late frontend requirements significantly reduced UI completeness | Agree on an MVP requirement freeze date and re-scope explicitly when changes arrive late. |
| Documentation is easier when written alongside implementation | Template docs drift quickly if not updated continuously | Keep docs close to code changes and validate against controllers/OpenAPI and UI behavior. |

### What Would Be Done Differently

| Area | Current Approach | What Would Change | Why |
|------|-----------------|-------------------|-----|
| Planning | Backend + docs stabilized first; UI completed later | Set explicit milestones for “end-to-end MVP demo” earlier (even if the UI is minimal) | Prevents a situation where backend is strong but UI lags due to late work. |
| Technology | SPA + REST + Prisma + Docker | Keep the stack, but enforce one wiring approach (DI vs explicit composition) | Reduces maintenance overhead and avoids partial architectural patterns. |
| Process | Some requirements clarified late | Add a formal requirements sign-off checkpoint with stakeholders | Reduces last-minute changes and scope creep. |
| Scope | Ambitious feature list early | Cut more aggressively to “core reading flows” first, then extras | Improves the probability of a complete user experience within a fixed academic deadline. |

## Personal Growth

### Skills Developed

| Skill | Before Project | After Project |
|-------|---------------|---------------|
| Full-stack system delivery (FE/BE/DB) | Intermediate | Advanced (clearer layering, better integration discipline) |
| Database modeling + migrations (Prisma/PostgreSQL) | Beginner–Intermediate | Advanced (normalized schema, migrations, seeding strategy) |
| Testing + quality practices (Jest/Playwright/Storybook) | Beginner | Intermediate (foundation in place; clear next steps for coverage) |

### Key Takeaways

1. A coherent MVP requires an end-to-end “happy path” early, not only strong backend pieces.
2. Data modeling decisions (translations, junction tables, enums) strongly determine how maintainable the product becomes.
3. Clear contracts (API responses, empty/error states, and documented limitations) reduce confusion and make thesis evaluation easier.

---

*Retrospective completed: 2026-01-05*
