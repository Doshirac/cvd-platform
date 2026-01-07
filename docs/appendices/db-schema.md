# Database Schema

| Attribute | Value |
|-----------|-------|
| Database | PostgreSQL |
| ORM | Prisma |
| Schema | `backend/prisma/schema.prisma` |

## ER Diagram

[View Diagram](assets/diagrams/er_diagram.jpg)

## Core Tables

| Table | Purpose |
|-------|---------|
| Disease | Primary disease entities (code, name, description, prevention) |
| Symptom | Standardized symptoms/signs |
| RiskFactor | Risk and protective factors |
| DiseaseSymptom | Disease-Symptom join (priority, typicality) |
| DiseaseRiskFactor | Disease-RiskFactor join (direction) |
| Source | Data sources (name, link) |
| *_translation | Localized content (EN/RU) |

## Enums

- `Locale`: en, ru
- `SymptomCategory`: sign, symptom
- `SymptomPriority`: primary, secondary
- `Typicality`: typical, possible, rare
- `RiskDirection`: risk, protective

## Setup

```bash
cd backend
npm run migrate
npm run generate
npm run seed
```

## Full Documentation

- **Detailed Schema:** [Google Doc](https://docs.google.com/document/d/1FeM152YZaFifvUPv-9Nsqit8NmtA2ZMBfu1xeoPYsN0/edit?usp=sharing)
- **Prisma Schema:** `backend/prisma/schema.prisma`
