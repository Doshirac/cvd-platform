# Criterion: Database Design & Data Integrity

## Architecture Decision Record

### Status

**Status:** Accepted

**Date:** 2026-01-05

### Context

The platform stores structured disease content (diseases, symptoms, risk factors, sources) with bilingual support (EN/RU) and many-to-many relationships. The schema must enforce integrity while staying easy to evolve during thesis development.

### Decision

Use PostgreSQL with Prisma and a normalized schema: core entities (`Disease`, `Symptom`, `RiskFactor`, `Source`), junction tables for M:N relationships with metadata, and translation tables keyed by `locale`.

### Alternatives Considered

| Alternative | Pros | Cons | Why Not Chosen |
|---|---|---|---|
| Single denormalized diseases table | Very fast to build | Poor integrity; harder filtering; harder bilingual support | Doesn’t scale for symptom/risk-factor queries and locale support |
| Document DB (MongoDB) | Flexible schema | Harder relational queries/integrity; translation duplication | Data is inherently relational and benefits from constraints |
| Raw SQL access | Full control | Higher maintenance; harder type safety | Prisma provides migrations and type-safe access for TS |

### Consequences

**Positive:**
- Strong referential integrity (FKs + cascades)
- Expressive filtering/search across relationships
- Locale support without duplicating core records

**Negative:**
- More tables and joins than a single-table MVP

**Neutral:**
- Translation tables can be extended to additional locales later

## Implementation Details

### Project Structure

```
backend/prisma/
├── schema.prisma            # Canonical schema
├── migrations/              # Prisma migration history
└── seed.ts                  # Seed script
```

### Key Implementation Decisions

| Decision | Rationale |
|---|---|
| Junction tables for M:N | Enables per-link metadata (priority/typicality, direction) |
| Translation tables | Locale-aware fields without duplicating base entity IDs |
| Enum types | Prevent invalid values and simplify API mapping |
| Uniques + indexes | Enforce data integrity and speed filtering |

### Code Examples

Locale enum + translation uniqueness:

```prisma
enum Locale { en ru }

model DiseaseTranslation {
  diseaseId Int
  locale Locale
  @@unique([diseaseId, locale])
}
```

M:N with metadata:

```prisma
model DiseaseSymptom {
  diseaseId Int
  symptomId Int
  priority SymptomPriority
  typicality Typicality
  @@unique([diseaseId, symptomId])
}
```

### Diagrams

- The schema is also represented in the project’s architecture/ERD diagrams under `docs/assets/diagrams/`.

## Requirements Checklist

| # | Requirement | Status | Evidence/Notes |
|---:|---|:---:|---|
| 1 | Relational DB suitable for structured content | ✅ | `docker-compose.yml` uses `postgres:16` |
| 2 | Type-safe ORM layer with migrations | ✅ | `backend/prisma/schema.prisma`, Prisma migrations |
| 3 | Supports bilingual (EN/RU) content | ✅ | Translation tables + `Locale` enum |
| 4 | Supports M:N disease↔symptom with metadata | ✅ | `DiseaseSymptom` (priority/typicality) |
| 5 | Supports M:N disease↔risk factor with direction | ✅ | `DiseaseRiskFactor` (`RiskDirection`) |
| 6 | Integrity constraints and indexes | ✅ | `@@unique`, `@@index` in schema |
| 7 | Sources stored for attribution | ✅ | `Source` model present |
| 8 | Seed process available | ✅ | `backend/prisma/seed.ts` and `npm run seed` |

## Known Limitations

| Limitation | Impact | Potential Solution |
|---|---|---|
| `Source` is not linked to diseases in schema | Harder to enforce per-disease references at DB level | Add relation table (e.g., `DiseaseSource`) if needed |
| Search requirements may need DB-level full-text indexes | Text search may be slower at scale | Add PostgreSQL `tsvector` + GIN indexes if needed |

## References

- `backend/prisma/schema.prisma`
- `backend/prisma/migrations/`
- `backend/prisma/seed.ts`
- `docker-compose.yml`
