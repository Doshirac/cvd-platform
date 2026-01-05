# Database Schema

## Overview

| Attribute | Value |
|-----------|-------|
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Schema source** | backend/prisma/schema.prisma |
| **Documentation link** | https://docs.google.com/document/d/1FeM152YZaFifvUPv-9Nsqit8NmtA2ZMBfu1xeoPYsN0/edit?usp=sharing |

## Entity Relationship Diagram

[Diagram](assets/diagrams/er_diagram.jpg) - Here you can find the diagram


## Enums

These enums are defined in the database (PostgreSQL enum types) and used by multiple tables.

| Enum | Values | Used in |
|------|--------|---------|
| Locale | `en`, `ru` | `disease_translation`, `symptom_translation`, `risk_factor_translation` |
| SymptomCategory | `sign`, `symptom` | `Symptom.category` |
| SymptomPriority | `primary`, `secondary` | `DiseaseSymptom.priority` |
| Typicality | `typical`, `possible`, `rare` | `DiseaseSymptom.typicality` |
| RiskDirection | `risk`, `protective` | `DiseaseRiskFactor.direction` |

## Tables

### Disease

Stores the primary disease entities.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| disease_id | SERIAL | PK | Internal identifier |
| code | VARCHAR(10) | UNIQUE, NOT NULL | Disease code (documented as ICD-10 in API schema) |
| name | TEXT | NOT NULL | Disease name (default locale) |
| description | TEXT | NULLABLE | Disease description |
| prevention | TEXT | NULLABLE | Prevention recommendations |

**Relations:**
- 1:N to DiseaseSymptom
- 1:N to DiseaseRiskFactor
- 1:N to DiseaseTranslation

---

### Symptom

Stores standardized symptoms/signs.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| symptom_id | SERIAL | PK | Internal identifier |
| code | VARCHAR(10) | UNIQUE, NULLABLE | Optional code (used in API docs as “SNOMED code”) |
| term | TEXT | UNIQUE, NOT NULL | Canonical symptom term (default locale) |
| category | SymptomCategory | NULLABLE | `sign` or `symptom` |

**Relations:**
- 1:N to DiseaseSymptom
- 1:N to SymptomTranslation

---

### RiskFactor

Stores standardized risk factors and protective factors.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| risk_factor_id | SERIAL | PK | Internal identifier |
| code | VARCHAR(10) | UNIQUE, NULLABLE | Optional code |
| name | TEXT | NOT NULL | Risk factor name (default locale) |
| definition | TEXT | NULLABLE | Definition/description |

**Relations:**
- 1:N to DiseaseRiskFactor
- 1:N to RiskFactorTranslation

---

### DiseaseSymptom

Join table connecting diseases and symptoms, with extra attributes for clinical interpretation.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| disease_symptom_id | SERIAL | PK | Internal identifier |
| disease_id | INTEGER | FK → Disease(disease_id), NOT NULL, ON DELETE CASCADE | Disease reference |
| symptom_id | INTEGER | FK → Symptom(symptom_id), NOT NULL, ON DELETE CASCADE | Symptom reference |
| priority | SymptomPriority | NOT NULL | `primary` or `secondary` |
| typicality | Typicality | NOT NULL, DEFAULT `typical` | `typical`, `possible`, or `rare` |

**Constraints / Indexes:**
- UNIQUE(disease_id, symptom_id)
- INDEX(disease_id) name: `idx_disease_symptoms_d`
- INDEX(symptom_id) name: `idx_disease_symptoms_s`

---

### DiseaseRiskFactor

Join table connecting diseases and risk factors, with direction (risk vs protective).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| disease_risk_factor_id | SERIAL | PK | Internal identifier |
| disease_id | INTEGER | FK → Disease(disease_id), NOT NULL, ON DELETE CASCADE | Disease reference |
| risk_factor_id | INTEGER | FK → RiskFactor(risk_factor_id), NOT NULL, ON DELETE CASCADE | Risk factor reference |
| direction | RiskDirection | NOT NULL, DEFAULT `risk` | `risk` or `protective` |

**Constraints / Indexes:**
- UNIQUE(disease_id, risk_factor_id)
- INDEX(disease_id) name: `idx_disease_risk_d`
- INDEX(risk_factor_id) name: `idx_disease_risk_rf`

---

### Source

Stores dataset / organization sources.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| source_id | SERIAL | PK | Internal identifier |
| name | TEXT | UNIQUE, NOT NULL | Organization/source name |
| link | TEXT | UNIQUE, NOT NULL | Source URL |

---

### disease_translation

Localized fields for Disease per locale.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PK | Internal identifier |
| disease_id | INTEGER | FK → Disease(disease_id), NOT NULL, ON DELETE CASCADE | Disease reference |
| locale | Locale | NOT NULL | `en` or `ru` |
| name | TEXT | NULLABLE | Localized disease name |
| description | TEXT | NULLABLE | Localized description |
| prevention | TEXT | NULLABLE | Localized prevention |

**Constraints:**
- UNIQUE(disease_id, locale)

---

### symptom_translation

Localized fields for Symptom per locale.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PK | Internal identifier |
| symptom_id | INTEGER | FK → Symptom(symptom_id), NOT NULL, ON DELETE CASCADE | Symptom reference |
| locale | Locale | NOT NULL | `en` or `ru` |
| term | TEXT | NOT NULL | Localized term |

**Constraints:**
- UNIQUE(symptom_id, locale)

---

### risk_factor_translation

Localized fields for RiskFactor per locale.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PK | Internal identifier |
| risk_factor_id | INTEGER | FK → RiskFactor(risk_factor_id), NOT NULL, ON DELETE CASCADE | Risk factor reference |
| locale | Locale | NOT NULL | `en` or `ru` |
| name | TEXT | NULLABLE | Localized name |
| definition | TEXT | NULLABLE | Localized definition |

**Constraints:**
- UNIQUE(risk_factor_id, locale)

## Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Disease → DiseaseSymptom | One-to-Many | A disease has many symptom links (with priority/typicality) |
| Symptom → DiseaseSymptom | One-to-Many | A symptom can be linked to many diseases |
| Disease → DiseaseRiskFactor | One-to-Many | A disease has many risk-factor links (with direction) |
| RiskFactor → DiseaseRiskFactor | One-to-Many | A risk factor can be linked to many diseases |
| Disease → disease_translation | One-to-Many | Localized disease fields per locale |
| Symptom → symptom_translation | One-to-Many | Localized symptom term per locale |
| RiskFactor → risk_factor_translation | One-to-Many | Localized risk factor fields per locale |

## Migrations

Migrations are stored in `backend/prisma/migrations/`.

| Version | Folder | Description |
|---------|--------|-------------|
| 001 | 20251125210618_diseasesdb | Initial schema: diseases, symptoms, risk factors, join tables, translations, sources, and enums |

## Seeding

Run migrations and seed data from the backend folder:

```bash
# from backend/
npm run migrate
npm run generate
npm run seed
```

Notes:
- `npm run seed` runs `ts-node prisma/seed.ts`.
- The seed script populates diseases, symptoms, risk factors, and sources (see `backend/prisma/seeder/`).
