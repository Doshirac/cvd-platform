# Features & Requirements

## Epics Overview

| Epic | Description | Stories | Status |
|------|-------------|---------|--------|
| E1: Browse Disease Library | Discover diseases via a simple list view. | 2 | ⚠️ |
| E2: Search Diseases | Find diseases by name/keywords (full-text). | 1 | ⚠️ |
| E3: Filter by Category | Narrow results by category/risk/severity. | 1 | ⚠️ |
| E4: View Disease Card | Read a standardized disease card (description, symptoms, prevention). | 1 | ❌ |
| E5: View Research Cards | View research content on the website via read-only research cards. | 1 | ❌ |
| E6: Switch Language EN/RU | Toggle English/Russian on core pages. | 1 | ⚠️ |
| E7: View References | View sources/guidelines/datasets and per-card references. | 1 | ⚠️ |

## User Stories

### Epic 1 — Browse Disease Library

First entry point for discovery: a disease list that loads quickly and links to disease cards.

| ID | User Story | Acceptance Criteria | Priority | Status |
|----|------------|---------------------|----------|--------|
| US-001 | As a User, I want to see a list of cardiovascular diseases, so that I can quickly find conditions to read. | - List loads ≤ 2s with ≥ 25 diseases<br>- Each item links to its card<br>- Clear empty/error states | Must | ⚠️ |
| US-002 | As a User, I want to sort diseases (A–Z / Z–A), so that I can navigate faster. | - Sort applies instantly<br>- Sort persists in session | Could | ❌ |

### Epic 2 — Search Diseases

Header search input for direct lookup with a no-results state.

| ID | User Story | Acceptance Criteria | Priority | Status |
|----|------------|---------------------|----------|--------|
| US-003 | As a User, I want to search by disease name or keywords, so that I can find a specific disease. | - Results appear < 1s on typical data<br>- Highlight matches<br>- No-results state shown | Must | ⚠️ |

### Epic 3 — Filter by Category

Faceted discovery: filters that update results and can be shared via URL.

| ID | User Story | Acceptance Criteria | Priority | Status |
|----|------------|---------------------|----------|--------|
| US-004 | As a User, I want to apply filters, so that I can narrow the list to what I need. | - Filters update results instantly<br>- “Clear all” resets state<br>- URL reflects active filters (shareable) | Must | ⚠️ |

### Epic 4 — View Disease Card

Core reading page with standardized sections and references.

| ID | User Story | Acceptance Criteria | Priority | Status |
|----|------------|---------------------|----------|--------|
| US-005 | As a User, I want to open a disease card, so that I can read description, primary/secondary symptoms, and prevention. | - Sections visible (Description; Primary vs Secondary symptoms; Prevention)<br>- Loads ≤ 2s (analytics may lazy-load)<br>- Sources/references visible | Must | ❌ |

### Epic 5 — View Research Cards

Read-only research cards that summarize research content on the website.

| ID | User Story | Acceptance Criteria | Priority | Status |
|----|------------|---------------------|----------|--------|
| US-006 | As a User, I want to view research cards, so that I can quickly read research summaries on the website. | - Research cards list is available on the Research page<br>- Each card shows title + short summary<br>- Clear empty/error states | Should | ❌ |

### Epic 6 — Switch Language EN/RU

Language selection for UI labels and core content.

| ID | User Story | Acceptance Criteria | Priority | Status |
|----|------------|---------------------|----------|--------|
| US-007 | As a User, I want to switch between English and Russian, so that I can read in my preferred language. | - UI labels and content switch<br>- Choice persists across pages/sessions | Must | ⚠️ |

### Epic 7 — View References

Dedicated references view with transparent data provenance.

| ID | User Story | Acceptance Criteria | Priority | Status |
|----|------------|---------------------|----------|--------|
| US-008 | As a User, I want to see sources and datasets, so that I can verify the information. | - List shows title, publisher, link, license, last-updated<br>- Links open in a new tab<br>- Per-card source list available | Should | ⚠️ |

### MoSCoW Summary

- **Must Have:** EP1 (US-001), EP2 (US-003), EP3 (US-004), EP4 (US-005), EP6 (US-007)
- **Should Have:** EP5 (US-006), EP7 (US-008)
- **Could Have:** EP1 (US-002)
- **Won’t Have (MVP):** user accounts, comments, ML risk scores, real-time dashboards, native apps

## Use Case Diagram

[Diagram](assets/diagrams/use_case_diagram.jpg) - Here you can find the diagram

## Non-Functional Requirements

### Performance

| Requirement | Target | Measurement Method |
|-------------|--------|-------------------|
| Page load time | Main pages LCP < 2.5 s on typical 4G devices | Lighthouse (mobile throttling), WebPageTest (optional) |
| API response time | Core API p95 < 300 ms on core endpoints (local/prod-like) | k6 / autocannon against `/diseases` and `/sources` |
| Concurrent users | Stable behavior under typical MVP load (e.g., 25–50 concurrent) | Load test script + error-rate monitoring |

### Security

- **HTTPS** in production environments.
- **Basic rate limiting** on public endpoints to mitigate abuse.
- **Security & Privacy:** no PII/PHI stored; platform is read-only.
- **Input validation** on API query parameters; safe error responses.
- **Secrets/config** provided via environment variables (env-based configuration).

### Accessibility

- Target: no critical accessibility blockers on core flows.
- Keyboard navigation for primary interactions; visible focus states.
- Clear labels/ARIA for interactive controls (search, filters, toggles).
- Glossary and medical disclaimer available for clarity.

### Scalability

- Stateless API suitable for horizontal scaling.
- Cached assets (e.g., pre-rendered SVG charts) for efficient delivery.

### Usability & Localization

- UI available in **English (default)** and **Russian** on all core pages.
- Responsive UI: works correctly on desktop, tablet, and phone.
- Basic **Dark/Light theme toggle**.

### Data Quality

- Each indicator shows **source** and **last updated**.
- Data lineage is maintained via the References page and dataset attribution.

### Observability

- Structured logs and simple metrics (latency, error rate).
- Container health checks to support basic monitoring.

### Docs & Deployment

- OpenAPI/Swagger documentation available for core endpoints.
- Docker Compose setup for local/prod-like environment.
- Environment-based configuration.

### Reliability

| Metric | Target |
|--------|--------|
| Uptime | Best-effort for MVP (non-critical system) |
| Recovery time | Restore service from backup in ≤ 60 minutes (target) |
| Data backup | Automated daily backups; verified by a successful restore test |

### Compatibility

| Platform/Browser | Minimum Version |
|------------------|-----------------|
| Chrome | Latest 2 major versions |
| Firefox | Latest 2 major versions |
| Safari | Latest 2 major versions |
| Mobile | iOS 16+ / Android 11+ |

## Regulatory/Compliance Needs

- **GDPR (EU):** No PII/PHI processed (read-only library). Publish a Privacy Notice stating data minimization; if analytics/cookies are added, use explicit consent and provide opt-out.
- **ePrivacy / Cookie Rules:** Show a cookie banner only if using non-essential cookies (e.g., analytics). Store consent choices.
- **Medical Disclaimer:** Clear statement that content is informational, not medical advice, not for diagnosis or treatment; advise consulting a physician.
- **Medical Device Regulation (EU MDR):** Not applicable (no diagnostics/triage/personal recommendations). Include an MDR non-applicability note.
- **Data Licensing & Attribution:** Respect open-data licenses (WHO/EU/national). Display source + license + last updated on indicators and in the References page.
- **Copyright / Content Use:** Ensure rights to text, images, SVG charts; attribute third-party materials per license; avoid logos/marks without permission.
- **Terms of Use:** Publish concise Terms covering permitted use, no warranty, and liability limitations.
- **Open-Source Compliance:** Track dependencies and their licenses; include notices as required.
