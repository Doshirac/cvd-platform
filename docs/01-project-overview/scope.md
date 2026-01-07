# Project Scope

## In Scope

The system includes functionality for:
- Disease library (>=25 entries) with standardized content and references
- Search and filters for discovery
- EN/RU locale support
- Sources/references page with provenance (source + last updated)
- Research summaries/cards (read-only)
- API documentation and containerized deployment

## Out of Scope

Excluded functionality:
- Medical diagnosis/treatment advice or symptom checker
- User accounts (bookmarks, comments, forums)
- Advanced BI stack or real-time dashboards
- ML risk prediction or personalized recommendations
- Native mobile apps and offline mode

## Assumptions

- Public datasets available for academic use with citation
- No PII/PHI collected or processed
- Docker-friendly hosting environment available
- Clinical consultant available for content review

## Constraints

| Category | Description |
|----------|-------------|
| Time | ~4 months (diploma schedule) |
| Resources | Single developer (FE/BE/data/content) |
| Technology | React, Node.js (Express), Python, PostgreSQL, Docker |
| Budget | Open-source tools and open data only |
| Compliance | Dataset licenses, GDPR-aware setup |
