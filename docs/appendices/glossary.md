# Glossary

| Term | Definition |
|------|------------|
| Cardiovascular Disease (CVD) | A class of diseases affecting the heart and blood vessels (used as the core content domain of the platform). |
| Disease card | A standardized, structured entry for a disease (name, description, symptoms, prevention, and references/analytics when available). |
| Symptom | A patient-reported or clinician-observed manifestation linked to a disease (stored as `Symptom` and related via `DiseaseSymptom`). |
| Risk factor | A factor associated with increased probability of developing a disease (stored as `RiskFactor` and related via `DiseaseRiskFactor`). |
| Protective factor | A factor associated with reduced probability of developing a disease (modeled as `RiskDirection = protective`). |
| Primary symptom | A key/core symptom for a disease in this project’s data model (modeled as `SymptomPriority = primary`). |
| Secondary symptom / factor | A non-core or supporting symptom/factor linked to a disease (modeled as `SymptomPriority = secondary`). |
| Typicality | How common/representative a symptom is for a disease in this project’s model (`typical`, `possible`, `rare`). |
| Prevalence | The proportion of a population with a condition at a given time; used for dataset-driven analytics and comparisons. |
| Localization / Locale | Supporting multiple languages in UI/content; this project uses `en` and `ru` locales. |
| MVP | Minimum Viable Product; the smallest scope that delivers core value for the diploma project. |
| In-scope / Out-of-scope | Features explicitly included vs excluded from the diploma MVP to keep expectations clear. |

## Acronyms

| Acronym | Full Form | Description |
|---------|-----------|-------------|
| API | Application Programming Interface | Backend endpoints exposed under `/api` (e.g., diseases, risk factors, sources). |
| OpenAPI | OpenAPI Specification | Machine-readable API contract (Swagger) generated for the backend. |
| Swagger | Swagger UI / OpenAPI docs | Interactive documentation for the API (commonly served at `/api-docs`). |
| UI | User Interface | The visible web interface (React frontend). |
| UX | User Experience | How users interact with and perceive the product’s usability. |
| CVD | Cardiovascular Disease | Domain abbreviation used across docs and code. |
| ICD-10 | International Classification of Diseases, 10th Revision | Standard disease coding system; disease `code` is documented as ICD-10 in API schema. |
| SNOMED CT | Systematized Nomenclature of Medicine—Clinical Terms | Clinical terminology system; symptom `code` is documented as SNOMED code in API schema (project stores short codes). |
| ETL | Extract, Transform, Load | Data processing pipeline for cleaning/aggregating datasets before use in analytics/storage. |
| DB | Database | PostgreSQL used for persistence. |
| ORM | Object-Relational Mapping | Prisma is used as the ORM to access PostgreSQL. |
| i18n | Internationalization | Framework/process to support multiple languages (EN/RU in this project). |
| JWT | JSON Web Token | Token format typically used for auth; mentioned in architecture notes as a possible mechanism. |
| GDPR | General Data Protection Regulation | EU privacy regulation; project is designed to avoid collecting PII/PHI in the MVP. |
| PII | Personally Identifiable Information | Personal data that can identify a person (not intended to be collected/processed). |
| PHI | Protected Health Information | Health data linked to an identifiable person (not intended to be collected/processed). |
| p95 | 95th percentile | Performance metric (e.g., p95 API response time). |
| LCP | Largest Contentful Paint | Frontend performance metric for perceived load speed. |
| SVG | Scalable Vector Graphics | Format used for deterministic, cacheable chart embeds (analytics outputs). |
| WHO | World Health Organization | Example of an official data source; also seeded as a `Source`. |
| CDC | Centers for Disease Control and Prevention | Example of an official data source; CDC WONDER is seeded as a `Source`. |
| EU | European Union | Context for GDPR and for sources like Eurostat. |
| NFR | Non-Functional Requirement | Quality attribute requirement (e.g., performance, security, availability). |
| FR | Functional Requirement | Behavior/capability the system must provide (e.g., search, filters, browse cards). |
| KPI | Key Performance Indicator | Metric used to evaluate goals/success (e.g., response time targets). |
| SEO | Search Engine Optimization | Techniques to improve discoverability (e.g., sitemap/meta tags). |
| BI | Business Intelligence | Analytics/reporting tooling category (not part of the MVP BI stack). |
| CSV | Comma-Separated Values | Common dataset file format used by analysis/ETL scripts. |

## Domain-Specific Terms

### Clinical & Epidemiology

| Term | Definition |
|------|------------|
| Prevention | Practical guidance intended to reduce disease risk or complications (stored as `Disease.prevention`, can be localized). |
| Sign | An objective clinical finding (modeled in DB as `SymptomCategory = sign`). |
| Symptom (category) | A subjective experience reported by a patient (modeled in DB as `SymptomCategory = symptom`). |
| Risk direction | Indicates whether a factor increases risk or is protective (`RiskDirection = risk | protective`). |
| Data source | An organization/dataset provider referenced by the platform (stored as `Source` with `name` and `link`). |
| Evidence-based reference | Content intended to be traceable to reputable sources (e.g., official datasets, clinical guidelines). |
| Disclaimer (medical) | Statement that the platform provides informational content and is not medical advice/diagnosis. |
| Primary vs secondary factors | The project’s modeling choice to separate core symptoms from additional symptom-related factors for clarity and analysis. |

### Data & Platform Engineering

| Term | Definition |
|------|------------|
| Pagination | Returning results in pages to control payload size; backend uses `skip` (offset) and `take` (limit). |
| Filter | Narrowing results using query parameters (e.g., `symptom`, `riskFactor`, `search`, `letter`). |
| Full-text search (project) | Free-text query over diseases/symptoms/risk factors via the `search` query parameter. |
| Cache | Temporary storage to speed up repeated reads; backend uses Redis (`ioredis`). |
| CORS | Cross-Origin Resource Sharing | Browser security mechanism; backend config controls which frontend origins may call the API. |
| Express | Express.js | Node.js web framework used to implement the REST API. |
| Vite | Vite | Frontend build tool/dev server used for the React application. |
| DI (Inversify) | Dependency Injection | Pattern/library used in the backend to wire controllers/services via a container. |
| E2E tests | End-to-End tests | Browser-level tests (Playwright) validating user flows. |
| Unit tests | Unit tests | Jest tests that validate isolated backend/frontend logic. |
| Storybook | Storybook | Component development/documentation environment for the frontend UI. |
| Migration | Versioned DB change managed by Prisma (`prisma migrate dev`) and stored in `backend/prisma/migrations/`. |
| Seeding | Loading initial/test data into the DB; backend uses `npm run seed` (TypeScript seed entrypoint). |
| Prisma Client | Generated TypeScript client used to query the DB in repositories/services. |
| Docker Compose | Tooling to orchestrate multi-container local environments (API + PostgreSQL + Redis). |
| Observability | Ability to understand system behavior via logs/metrics/traces; backend integrates logging and Sentry. |
