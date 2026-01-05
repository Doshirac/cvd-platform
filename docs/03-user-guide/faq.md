# FAQ & Troubleshooting

## FAQ

**What is this platform for?**

It is a read-only CVD knowledge platform: diseases are presented as standardized entries (symptoms, risk factors, prevention guidance) with attribution to sources. It is intended for education and exploration.

**Is it medical advice?**

No. It does not replace professional medical advice, diagnosis, or treatment.

---

**Q: What data does the platform store about me?**

A: In the MVP, the platform is designed to avoid collecting personal health information (PHI) and personally identifiable information (PII). It focuses on read-only reference content (diseases, symptoms, risk factors, sources) and system telemetry (logs/metrics) for reliability.

---

**Q: What content can I expect to see?**

A: You can expect disease reference entries with structured symptom/risk-factor lists and prevention text. You may also see “Research Cards” (view-only research summaries) depending on the current UI wiring.

---

**Q: Which languages are supported?**

A: The backend data model supports English and Russian locales (`en`, `ru`). If the UI exposes a language switch, it will typically map to the backend `locale` parameter; otherwise developers can still request a locale through the API.

---

### Account & Access

**Q: Do I need an account to use the platform?**

A: Not for the current MVP read-only scope. There is no login/registration requirement for browsing content.

---

**Q: Why can’t I access the application or some pages?**

A: If you are running locally, the most common causes are that the backend/API is not running, the frontend dev server is not running, or the intended routes are not fully wired in the current build. Verify the services are up and check that the frontend points to the correct API base URL.

---

### Features

**Q: How do I search diseases?**

A: The API supports free-text search (via a `search` query parameter) and filtering (e.g., by symptom or risk factor). In the UI, this is typically exposed as a search input and/or filters; if you are integrating directly, call the diseases endpoint with the relevant query parameters.

---

**Q: Why do I sometimes get “No disease found.” but the request is successful?**

A: Some list endpoints intentionally return HTTP `200` with a JSON `{ "message": "No disease found." }` (or `{ "message": "No source found." }`) when a query returns no results. This is a “no-results” response, not an error.

---

**Q: What are “primary” vs “secondary” factors?**

A: The project’s data model separates core/primary symptoms from secondary symptom-related factors to keep disease cards readable and to support more structured filtering and analysis.

---

**Q: Where does the content come from?**

A: The platform stores and displays a list of official or curated sources (organizations/datasets) and links out to them. In the backend, these appear as “Sources” with a name and a URL.

---

**Q (Developer): What endpoints are available?**

A: The backend exposes read-only endpoints under `/api`, including health checks, diseases, symptoms, risk factors, and sources. See the API reference at [appendices/api-reference.md](../appendices/api-reference.md) and Swagger at `http://localhost:4000/api-docs` when running locally.

---

**Q (Developer): What ports does the local setup use?**

A: Common defaults are:

- Backend API: `http://localhost:4000/api`
- Swagger UI: `http://localhost:4000/api-docs`
- Frontend dev server (Vite): typically `http://localhost:5173`

Your local `.env` / Docker Compose configuration is the source of truth.

---

**Q (Developer): How do I run everything locally?**

A: The project supports Docker Compose for a full local environment (API + PostgreSQL + Redis). Alternatively, you can run backend and frontend separately with `npm run dev` in each package.

---

**Q (Developer): How do I reset/reseed the database?**

A: From the backend folder you can run migrations and seeding scripts (see [appendices/db-schema.md](../appendices/db-schema.md)). If your dataset changes a lot during development, prefer a reset workflow to ensure schema + seed data are consistent.

---

## Troubleshooting

### Common Issues

| Problem | Possible Cause | Solution |
|---------|---------------|----------|
| Page won’t load / blank screen | Frontend dev server not running; JS error; wrong base URL | Start frontend, open browser devtools console, confirm API base URL is correct and reachable |
| API requests fail with `ERR_CONNECTION_REFUSED` | Backend not running or wrong port | Start backend (or Docker Compose); confirm `http://localhost:4000/api/health` responds |
| Browser shows CORS error | `CORS_ORIGIN` / `CLIENT_URL` mismatch | Ensure backend CORS origin matches the frontend URL (e.g., `http://localhost:5173`) |
| “No disease found.” even though data should exist | Empty DB; seed not applied; filters too strict | Run migrations + seed; retry with no filters (remove `search`, `symptom`, `riskFactor`, `letter`) |
| Swagger (`/api-docs`) not loading | Backend down; reverse proxy misconfigured | Confirm backend is running and try `http://localhost:4000/api/health/details` |
| DB errors on startup (Prisma connection) | `DATABASE_URL` wrong; DB container not healthy | Verify Postgres container health, then check `DATABASE_URL` format and credentials |
| Redis connection errors | Redis container not running; wrong host in Docker | In Docker Compose, Redis host is typically `redis`; outside Docker it is often `localhost` |

### Error Messages

| Error Code/Message | Meaning | How to Fix |
|-------------------|---------|------------|
| `{ "message": "No disease found." }` (HTTP 200) | Query returned zero results (not an error) | Relax filters/search, confirm DB is seeded |
| `{ "success": false, "message": "Bad Request", ... }` (HTTP 400) | Invalid query/body parameters | Check parameter types/ranges (e.g., `skip >= 0`, `1 <= take <= 100`) |
| `{ "success": false, "message": "Resource not found: ..." }` (HTTP 404) | Route does not exist | Confirm the path starts with `/api/...` and matches the API reference |
| `{ "success": false, "message": "Internal Server Error" }` (HTTP 500) | Unhandled backend error | Check backend logs; in development you may see a stack trace in the response |

### Browser-Specific Issues

| Browser | Known Issue | Workaround |
|---------|-------------|------------|
| Chrome | Aggressive caching during local dev | Hard refresh (`Ctrl+F5`) and disable cache in devtools while debugging |
| Firefox | CORS errors are sometimes shown differently | Check the Network tab for the actual failing request and response headers |
| Safari | Mixed-content restrictions when frontend is `https` and API is `http` | Use consistent schemes locally (usually both `http`) |
| Edge | Same behavior as Chrome (Chromium) | Apply the same cache + devtools steps as Chrome |

## Getting Help

### Self-Service Resources

- [Documentation](../index.md)
- [API Reference](../appendices/api-reference.md)
- Swagger/OpenAPI: `http://localhost:4000/api-docs` (when running locally)
- Repository: https://github.com/Doshirac/cvd-platform

### Contact Support

| Channel | Response Time | Best For |
|---------|--------------|----------|
| GitHub Issues | Best-effort | Bug reports, feature requests, documentation problems |

### Reporting Bugs

When reporting a bug, please include:

1. **Steps to reproduce** - What actions lead to the issue?
2. **Expected behavior** - What should happen?
3. **Actual behavior** - What actually happens?
4. **Screenshots** - If applicable
5. **Browser/Device info** - Browser name, version, OS

Submit bug reports at: [Issue tracker URL or email]

Suggested issue tracker:
- https://github.com/Doshirac/cvd-platform/issues
