# Database Design & Data Integrity

Original documentation: https://docs.google.com/document/d/1FeM152YZaFifvUPv-9Nsqit8NmtA2ZMBfu1xeoPYsN0/edit?usp=sharing

## Decision

**Status:** Accepted | **Date:** 2026-01-05

PostgreSQL with Prisma ORM using normalized schema: core entities (Disease, Symptom, RiskFactor, Source), M:N junction tables with metadata, and translation tables keyed by locale.

| Alternative | Why Not Chosen |
|-------------|----------------|
| Single denormalized table | Poor integrity, hard i18n |
| MongoDB | Data is relational |
| Raw SQL | Prisma offers type safety |

## Structure

```
backend/prisma/
 schema.prisma   # Canonical schema
 migrations/     # Migration history
 seed.ts         # Seed script
```

## Requirements

| # | Requirement | Status |
|--:|-------------|:------:|
| 1 | PostgreSQL for structured content | Done |
| 2 | Type-safe ORM with migrations | Done |
| 3 | Bilingual support (EN/RU) | Done |
| 4 | M:N disease-symptom with metadata | Done |
| 5 | M:N disease-risk factor with direction | Done |
| 6 | Integrity constraints + indexes | Done |
| 7 | Sources for attribution | Done |
| 8 | Seed process | Done |

## Limitations

| Limitation | Solution |
|------------|----------|
| Source not linked to diseases | Add DiseaseSource relation |
| Full-text search may be slow | Add tsvector + GIN indexes |

## Conclusion

The Cardiovascular Disease Knowledge Base database provides a robust, normalized foundation for clinical and public-health data on cardiovascular conditions.

**Key Achievements:**
- Comprehensive entity structure (diseases, symptoms, risk factors)
- Strict referential integrity with clear indexes and constraints
- Bilingual (localized) design via translation tables and SQL views
- Automated versioning and migrations through Prisma and Git
- Extensible for future data layers (raw -> staging -> mart)

This implementation supports consistent, query-optimized, and language-aware access to cardiovascular disease data. It can be integrated into an analytical dashboard.