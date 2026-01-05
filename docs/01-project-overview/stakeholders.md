# Stakeholders & Users

## Stakeholders Analysis

| Stakeholder | Responsibility | Expertise & Task Understanding | Influence | Engagement Strategy |
|-------------|----------------|-------------------------------|----------|---------------------|
| Product Owner & Engineer | Deliver the product: FE/BE, DB, ETL/analytics, documentation | Full-stack, basic clinical/data literacy | High | Weekly plan, task tracker, milestone demos |
| Academic Supervisor / Committee | Methodology, compliance with requirements, evaluation | Research methodology, thesis requirements | High | Reports and demos at control checkpoints |
| Clinical Consultant | Review CVD cards, terminology, disclaimer | Cardiology / public health | High (for content) | 2–3 review sessions + asynchronous edits |
| End Users (clinicians, educators, analysts, readers) | Use the library and analytics, provide feedback | High domain expertise / varied technical level | Medium | Short usability tests, on-site feedback form |
| Data Source Owners (WHO/EU/national) | Dataset access, licensing, citation | Data stewardship | Medium | License compliance, “References” page, “last updated” note |

## Target Audience

| Persona | Description | Key Needs |
|---------|-------------|-----------|
| Clinician / Medical student | Clinicians, residents, interns, and medical students looking for structured, referenced CVD information with clear symptom/risk-factor separation. | Fast lookup; consistent terminology; references/disclaimer; bilingual UI. |
| Educator / Researcher | University educators and academic researchers using the platform for teaching materials, examples, and evidence-linked summaries. | Reliable citations; exportable/quotable summaries; analytics snapshots for lectures; easy navigation. |
| Analyst / Public health reader | Data analysts and public health readers exploring prevalence/indicators and lightweight breakdowns by age/sex/region. | Simple analytics visuals; source transparency (dataset + last updated); filtering and search; no PII/PHI. |

## User Personas

### Persona 1: Dr. Elena S.

| Attribute | Details |
|-----------|---------|
| **Role** | Cardiologist / clinical educator |
| **Age** | 35–45 |
| **Tech Savviness** | Medium |
| **Goals** | Quickly validate terminology and symptom/risk-factor grouping; use referenced summaries for teaching/consultation notes. |
| **Frustrations** | Unstructured web sources; inconsistent naming; unclear separation between symptoms vs risk factors; missing citations. |
| **Scenario** | During lecture prep or case discussion, searches a disease card, reviews primary/secondary symptoms and prevention, and checks references for credibility. |

### Persona 2: Alex K.

| Attribute | Details |
|-----------|---------|
| **Role** | Data analyst (public health / BI) |
| **Age** | 22–35 |
| **Tech Savviness** | High |
| **Goals** | Explore simple prevalence/indicator patterns and per-disease breakdowns; verify dataset provenance and update date. |
| **Frustrations** | Data without provenance; outdated datasets; hard-to-reproduce visuals; unclear definitions across sources. |
| **Scenario** | Uses search and filters to find a disease, checks the embedded charts, then navigates to the references page to confirm dataset and “last updated” information. |

## Stakeholder Map

Stakeholders grouped by influence and interest in the project.

### High Influence / High Interest

- Product Owner & Engineer: delivery and quality of the full platform.
- Academic Supervisor / Committee: methodology compliance and evaluation.
- Clinical Consultant: medical accuracy of CVD content and disclaimers.

### High Influence / Low Interest

- Data Source Owners (WHO/EU/national): license compliance, citation, and correct source representation.

### Low Influence / High Interest

- End Users (clinicians, educators, analysts, readers): usability, trust in content, and usefulness of search/filters and analytics.

### Low Influence / Low Interest

- General public readers (non-professional): occasional browsing and informational use, without direct influence on scope.
