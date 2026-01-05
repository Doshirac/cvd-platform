# Problem Statement & Goals

## Context

**Purpose of the document.** This document defines the scope and boundaries of the thesis project: a platform that curates a structured library of cardiovascular diseases with standardized entries for descriptions, symptoms, and prevention. It specifies the project’s objectives, architecture, data model, and the functional and non-functional requirements included in the appendix. It also describes how prevalence rates and key development indicators are computed from official statistical datasets, explicitly distinguishing primary symptoms and secondary (symptom-related) factors.

**Audience.** The document is intended for several groups and can support future expansion beyond the diploma MVP:

- **Thesis Committee** — to understand the core idea, MVP scope, and academic fit.
- **Clinicians & Medical Educators** — to assess clinical relevance, terminology standardization, and usefulness for teaching/practice.
- **Public-Health Analysts** — to review prevalence/indicator analytics, data sources, and the primary vs. secondary factor model.
- **Software Engineers (future dev team)** — to understand architecture, data model, APIs, and quality requirements.
- **Potential Investors** — to evaluate problem/solution fit, target users, scalability, and data strategy.

The platform operates in the healthcare education and public-health analytics domain, focusing on evidence-based, referenced summaries and lightweight analytics rather than clinical decision support.

## Vision Statement

Build a clear, reliable platform with standardized cards for cardiovascular diseases (description, symptoms, prevention) and basic statistics such as prevalence and key indicators from trusted data sources. The platform helps clinicians, educators, and public-health analysts distinguish primary symptoms from secondary factors, and it is designed to be extendable beyond the diploma scope.

## Problem Statement

**Who:** Clinicians, medical educators, public-health analysts, and readers who need structured, referenced CVD information and basic analytics.

**What:** Cardiovascular disease information is fragmented, inconsistently structured, and often lacks analytical context (prevalence/indicator breakdowns) and clear separation of primary symptoms vs. secondary (symptom-related) factors.

**Why:** Clinicians and educators spend time reconciling disparate sources; analysts lack a unified, transparent view of prevalence and indicators; and readers struggle to interpret symptoms vs. risk/prevention factors. This leads to slower information retrieval, unclear prevention guidance, and missed insights.

### Pain Points

| # | Pain Point | Severity | Current Workaround |
|---|------------|----------|-------------------|
| 1 | Information is scattered across many sources and not standardized (terminology, structure, completeness). | High | Manual search in guidelines/articles; personal notes; ad-hoc comparisons. |
| 2 | Primary symptoms vs. secondary factors (risk/prevention-related) are often mixed, making interpretation and teaching harder. | High | Rewriting content into personal templates; discussing with colleagues; cross-checking multiple sources. |
| 3 | Lack of a single place to read curated research summaries and supporting context linked to transparent sources. | Medium | Searching publications manually; bookmarking links; assembling summaries in notes. |
| 4 | Unclear data provenance (source, last updated, licensing) reduces trust and reusability. | Medium | Checking dataset websites and PDFs manually; storing links outside the workflow. |
| 5 | Hard to quickly find relevant diseases and compare them without strong search/filters. | Medium | Browser search; bookmark lists; manual scanning. |

## Business Goals

| Goal | Description | Success Indicator |
|------|-------------|-------------------|
| Evidence-Based Accessibility | Provide a single, reliable library of cardiovascular diseases with standardized cards (description, symptoms, prevention, references). | ≥ 25 published CVD cards with references and consistent structure. |
| Clinical & Educational Value | Support quick reference for clinicians and structured teaching materials for medical educators. | Positive feedback from review sessions/usability checks; consistent terminology and disclaimers present. |
| Public-Health Insight | Provide research-oriented context and supporting materials in a structured, readable format. | Research page available with read-only research cards (title + short summary) and clear source links. |
| Actionable Prevention | Translate information into practical prevention guidance tied to primary symptoms vs. secondary factors. | Disease cards include prevention guidance and clearly separated primary/secondary sections. |
| Trust & Compliance | Ensure data lineage, versioning, and GDPR-aware handling of any user data. | Each indicator shows source + last updated; no PII/PHI stored; license/citation compliance documented. |
| Scalable, Maintainable Platform | Build an API-first, containerized system that can be extended beyond the diploma MVP. | Dockerized stack; API documented via OpenAPI; modular FE/BE; reproducible migrations/seed. |

## Objectives & Metrics

| Objective | Metric | Current Value | Target Value | Timeline |
|-----------|--------|---------------|--------------|----------|
| Localization | % core pages available in EN + RU | N/A (new) | 100% core pages in EN (default) and RU | By end of month 3 |
| Disease Library coverage | # published standardized CVD cards | N/A (new) | ≥ 25 cards | By end of month 4 |
| Search & Filters | Search available + core filters implemented | N/A (new) | Full-text search + filters by category/risk/severity | By end of month 3 |
| Research Cards | # research cards published | N/A (new) | Research page with view-only research cards (title + short summary) | By end of month 4 |
| Data basis | # official datasets integrated | N/A (new) | ≥ 2 datasets; each indicator has source + last updated | By end of month 3 |
| UX/UI | Responsive layout + theme toggle implemented | N/A (new) | Works on desktop/tablet/phone + Dark/Light toggle | By end of month 3 |
| API & DB readiness | Core endpoints available + DB schema finalized | N/A (new) | Express API + PostgreSQL schema (Prisma) + migrations/seed runnable | By end of month 2 |
| API documentation | OpenAPI available + examples for core endpoints | N/A (new) | Swagger/OpenAPI page available; examples documented | By end of month 2 |
| Performance | p95 API response time on core endpoints | N/A (new) | p95 < 300 ms (local/prod-like) | By end of month 4 |
| References | References page published | N/A (new) | References page reachable from navigation | By end of month 3 |

## Success Criteria

### Must Have

- [ ] Content Coverage — ≥ 25 CVD cards published (description, primary/secondary symptoms, prevention, references).
- [ ] Localization — UI available in English (default) and Russian on all core pages.
- [ ] Search & Filters — Users can find diseases via full-text search and filter by category/risk/severity.
- [ ] Research Cards — Research content can be viewed on the website via read-only research cards.
- [ ] Data Sources — ≥ 2 official datasets integrated; each indicator shows source and last updated.
- [ ] Performance — p95 API response time < 300 ms on core endpoints (local/prod-like).
- [ ] Responsive UI — Works correctly on desktop, tablet, phone; basic Dark/Light theme toggle.
- [ ] API Documentation — OpenAPI page available; all core endpoints documented with examples.
- [ ] References Page — Dedicated page listing sources/guidelines/datasets published and reachable from navigation.

### Nice to Have

- [ ] Reliability — Automated daily backups verified by a successful restore test.
- [ ] Accessibility & Clarity — No critical accessibility blockers on core flows; glossary and disclaimer present.

## Non-Goals

What this project explicitly does NOT aim to achieve:

- Medical diagnosis/treatment advice, triage, or symptom checker.
- User accounts for readers (bookmarks, comments, forums).
- Advanced BI stack (e.g., Power BI/Fabric) or real-time streaming dashboards.
- ML risk prediction or personalised recommendations.
- Native mobile apps (iOS/Android) and offline mode.
- Paid/proprietary datasets or manual data entry from paywalled sources.
