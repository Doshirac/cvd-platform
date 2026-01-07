# API Reference

**Base URL:** `http://localhost:4000/api`

## Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check (204) |
| GET | `/health/details` | Detailed health info |
| GET | `/diseases` | List diseases (paginated, filterable) |
| GET | `/diseases/risk-factors` | List all risk factors |
| GET | `/diseases/by-letter` | Filter diseases by initial letter |
| GET | `/sources` | List data sources (paginated) |

## Common Parameters

- `skip` / `take` — pagination (default: 0 / 6)
- `locale` — `"en"` or `"ru"` (default: `"en"`)
- `search` — free-text search

## Response Format

**Success:** Array of objects or `{ "message": "No [resource] found." }`

**Error:**
```json
{ "success": false, "message": "...", "errors": [] }
```

| Code | Meaning |
|------|---------|
| 200 | OK |
| 204 | No Content |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Server Error |

## Full Documentation

- **OpenAPI/Swagger:** [GitBook](https://app.gitbook.com/invite/YJjvuHTqbLlvmjZEzQci/J36lOoZ1hCDc4L4xnq64)
- **OpenAPI JSON:** `backend/openapi.json`
