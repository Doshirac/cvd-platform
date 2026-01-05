# Problem Statement & Goals

## Context

This thesis project is a read-only CVD knowledge platform for education and public-health exploration. It focuses on evidence-linked summaries and lightweight dataset-driven indicators (not diagnosis or clinical decision support).

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

- Provide ≥25 standardized disease cards with references.
- Make discovery fast (search + filters) and bilingual (EN/RU).
- Publish a references area with dataset provenance (source + last updated).
- Keep the system reproducible and maintainable (Docker, migrations/seed, OpenAPI).
- No PII/PHI processing.

## Objectives (MVP Targets)

- Content: ≥25 disease cards.
- Data: ≥2 official datasets integrated with provenance.
- UX: search + filters + EN/RU toggle on core pages.
- API: documented core endpoints via OpenAPI.

## Non-Goals

- No diagnosis/treatment advice or symptom checker.
- No user accounts.
- No real-time BI stack or ML prediction.
- No native apps/offline mode.
