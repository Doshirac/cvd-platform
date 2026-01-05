# 3. User Guide

This chapter is a practical guide to using the CVD Platform as an end user (read-only browsing) and as a reviewer running it locally.

## Contents

- [Features Walkthrough](features.md)
- [FAQ & Troubleshooting](faq.md)

## Getting Started

### System requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| **Browser** | Chrome / Edge / Firefox / Safari (latest 2 major versions) | Latest version |
| **Screen Resolution** | 1280×720 | 1920×1080 or higher |
| **Internet** | Required for external source links and API-backed content | Stable connection |
| **Device** | Desktop or mobile (responsive UI) | Desktop for most comfortable reading |

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

Expected local URLs:

- Frontend: `http://localhost:5173`
- API: `http://localhost:4000/api`
- Swagger: `http://localhost:4000/api-docs`

### First launch checklist

1. Open the app URL and verify the header/navigation renders.
2. Toggle theme (light/dark) and confirm it persists on refresh.
3. Browse the disease list, open at least one disease entry, and verify loading/empty states are understandable.

## Quick start (most common tasks)

- Browse diseases: open **Home** and scroll the list.
- Search/filter: use the page controls (if present). If testing the API directly, use `GET /api/diseases` with `search`, `symptom`, `riskFactor`, `skip`, `take`, `locale`.
- Verify sources: open **Sources** and follow the external resource link.
- Check system health: `GET /api/health` (liveness) and `GET /api/health/details` (details).

If the UI shows “Not Found” for a linked page, treat it as an implementation gap in the current build and continue testing via available pages or the Swagger UI.

## Verifying via API (optional)

If you need to validate functionality without relying on the UI wiring, use Swagger (`/api-docs`) or call the endpoints directly:

- Health: `GET /api/health/details`
- Diseases list: `GET /api/diseases?take=10&skip=0&locale=en`
- Search: `GET /api/diseases?search=heart&locale=en`
- Sources: `GET /api/sources?take=10&skip=0`

## Roles

- Visitor/Reader: read-only browsing, theme/language preference.
- Developer/Reviewer: runs services locally, seeds DB, verifies endpoints via Swagger (`http://localhost:4000/api-docs`).
