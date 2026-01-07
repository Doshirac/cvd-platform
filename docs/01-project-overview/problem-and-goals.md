# Problem Statement & Goals

## Context

Read-only CVD knowledge platform for education and public-health exploration. Focuses on evidence-linked summaries and dataset-driven indicators (not diagnosis or clinical decision support).

## Vision Statement

Build a clear, reliable platform with standardized cards for cardiovascular diseases (description, symptoms, prevention) and basic statistics such as prevalence and key indicators from trusted data sources. The platform helps clinicians, educators, and public-health analysts distinguish primary symptoms from secondary factors, and it is designed to be extendable beyond the diploma scope.

## Problem Statement

**Who:**  
Clinicians, medical educators, public-health analysts, and readers needing structured CVD information.

**What:**  
CVD information is fragmented, inconsistently structured, and lacks clear separation of primary symptoms vs. secondary factors.

**Why:**  
Users spend time reconciling disparate sources, leading to slower information retrieval and unclear prevention guidance.

## Business Goals

| Goal | Description | KPI |
|------|-------------|-----|
| Content Coverage | Standardized disease cards with references | ≥25 cards |
| Data Transparency | Dataset provenance (source + last updated) | ≥2 datasets |
| Discoverability | Fast search and filters, bilingual UI | EN/RU support |
| Maintainability | Reproducible system | Docker, OpenAPI |
| Privacy | No personal data processing | No PII/PHI |

## Objectives (MVP Targets)

- Content: ≥25 disease cards
- Data: ≥2 official datasets with provenance
- UX: Search + filters + EN/RU toggle
- API: OpenAPI documentation

## Non-Goals

The project does **not** aim to:
- Provide diagnosis/treatment advice or symptom checker
- Implement user accounts
- Build real-time BI stack or ML prediction
- Develop native apps/offline mode

### Pain Points

| # | Pain Point | Severity | Current Workaround |
|---|------------|----------|-------------------|
| 1 | Information is scattered across many sources and not standardized (terminology, structure, completeness). | High | Manual search in guidelines/articles; personal notes; ad-hoc comparisons. |
| 2 | Primary symptoms vs. secondary factors (risk/prevention-related) are often mixed, making interpretation and teaching harder. | High | Rewriting content into personal templates; discussing with colleagues; cross-checking multiple sources. |
| 3 | Lack of a single place to read curated research summaries and supporting context linked to transparent sources. | Medium | Searching publications manually; bookmarking links; assembling summaries in notes. |
| 4 | Unclear data provenance (source, last updated, licensing) reduces trust and reusability. | Medium | Checking dataset websites and PDFs manually; storing links outside the workflow. |
| 5 | Hard to quickly find relevant diseases and compare them without strong search/filters. | Medium | Browser search; bookmark lists; manual scanning. |
