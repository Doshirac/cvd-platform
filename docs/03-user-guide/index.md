# User Guide

Practical guide to using the CVD Platform for browsing and local development.

## Contents

- [Features Walkthrough](features.md)
- [FAQ & Troubleshooting](faq.md)

---

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Browser | Chrome/Edge/Firefox/Safari (latest 2 versions) | Latest |
| Resolution | 1280×720 | 1920×1080 |
| Internet | Required | Stable |
| Device | Desktop or mobile | Desktop |

---

### Accessing the Application

1. Open your web browser
2. Navigate to the application URL:
	- **Production:** (if deployed) use your deployed URL
	- **Local development:** start the frontend and open `http://localhost:5173`
3. If you are running locally, ensure the API is available at `http://localhost:4000/api`

### Run locally (recommended)

1. Start the stack with Docker Compose (API + DB + Redis).
2. Seed the database.
3. Start the frontend dev server.

**Local URLs:**
- Frontend: `http://localhost:5173`
- API: `http://localhost:4000/api`
- Swagger: `http://localhost:4000/api-docs`

### First Launch Checklist

1. Verify header/navigation renders
2. Toggle theme — confirm persistence
3. Browse disease list, verify loading states

---

## Quick Start

| Task | Action |
|------|--------|
| Browse diseases | Open **Home**, scroll list |
| Search/filter | Use search bar and filters |
| Verify sources | Open **Sources**, click external links |
| Check health | `GET /api/health/details` |

---

## API Verification

Use Swagger (`/api-docs`) or call directly:

```
GET /api/health/details
GET /api/diseases?take=10&skip=0&locale=en
GET /api/diseases?search=heart&locale=en
GET /api/sources?take=10&skip=0
```

---

## User Roles

| Role | Access |
|------|--------|
| Visitor | Read-only browsing, theme/language preferences |
| Developer | Local services, DB seeding, Swagger access |
