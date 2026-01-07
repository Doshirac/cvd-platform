# FAQ & Troubleshooting

## FAQ

### General

**Q: What is this platform for?**

A: A read-only CVD knowledge platform with disease entries (symptoms, risk factors, prevention) and source attribution. For education only.


**Q: Is this medical advice?**

A: No. Does not replace professional medical advice, diagnosis, or treatment.


**Q: What data is stored about me?**

A: None. The MVP avoids collecting PHI/PII. Only reference content and system telemetry are stored.


**Q: Which languages are supported?**

A: English (`en`) and Russian (`ru`) via the `locale` parameter.


### Access & Features

**Q: Do I need an account?**

A: No. Read-only browsing requires no login.


**Q: How do I search diseases?**

A: Use the search bar or filters (symptom/risk factor). API: `GET /api/diseases?search=...`


**Q: Why "No disease found" with HTTP 200?**

A: Query returned zero results. This is expected behavior, not an error.


**Q: What are "primary" vs "secondary" factors?**

A: Primary = core symptoms; Secondary = related factors. Supports structured filtering.


### Developer

**Q: What are the local ports?**

A: API: `localhost:4000/api` | Swagger: `localhost:4000/api-docs` | Frontend: `localhost:5173`


**Q: How do I run locally?**

A: Use Docker Compose (API + PostgreSQL + Redis) or run backend/frontend separately with `npm run dev`.


**Q: How do I reset the database?**

A: Run migrations + seed scripts. See [DB Schema](../appendices/db-schema.md).


## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Blank screen | Frontend not running | Start frontend, check devtools console |
| `ERR_CONNECTION_REFUSED` | Backend not running | Start backend, verify `localhost:4000/api/health` |
| CORS error | Origin mismatch | Match `CORS_ORIGIN` to frontend URL |
| "No disease found" | Empty DB or strict filters | Run seed; remove filters |
| Swagger not loading | Backend down | Check `localhost:4000/api/health/details` |
| DB connection error | Wrong `DATABASE_URL` | Verify Postgres container and credentials |
| Redis error | Redis not running | Check Redis container; use `redis` host in Docker |


### Error Messages

| Message | Meaning | Fix |
|---------|---------|-----|
| `No disease found` (200) | Zero results | Relax filters, verify seed |
| `Bad Request` (400) | Invalid parameters | Check types (`skip >= 0`, `1 <= take <= 100`) |
| `Resource not found` (404) | Invalid route | Verify path matches [API Reference](../appendices/api-reference.md) |
| `Internal Server Error` (500) | Backend error | Check logs |


## Getting Help

- [Documentation](../index.md) | [API Reference](../appendices/api-reference.md)
- Swagger: `http://localhost:4000/api-docs`
- Issues: https://github.com/Doshirac/cvd-platform/issues

**Bug reports should include:** steps to reproduce, expected vs actual behavior, screenshots, browser/OS info.
