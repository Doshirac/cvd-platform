# 3. User Guide

This section provides instructions for end users on how to use the application.
It covers the core flows (navigation, disease browsing, search/filters, sources, and research cards where available) and basic troubleshooting.

## Contents

- [Features Walkthrough](features.md)
- [FAQ & Troubleshooting](faq.md)

## Getting Started

### System Requirements

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

### First Launch

#### Step 1: Open the application (no account required)

[Screenshot placeholder: `![App entry](../assets/images/app-entry.png)`]

1. Open the app URL in your browser.
2. You should see the main layout with a header.
3. If you land on a **Not Found** page, it may mean some routes are not enabled in the current build.

#### Step 2: Set preferences (theme and language)

[Screenshot placeholder: `![Preferences](../assets/images/preferences.png)`]

1. Use the theme toggle in the header to switch between Light/Dark.
2. Open the language selector (globe icon) and choose a language option.
3. Continue browsing; the theme preference is persisted across visits.

#### Step 3: Explore content

[Screenshot placeholder: `![Home](../assets/images/home.png)`]

After setup, you will see the main dashboard with:
- **Header navigation**: links to Home, Sources, Research (where available)
- **Content area**: the current page content (disease library, sources list, etc.)
- **Helper UI**: loading states and “no results” states when a query returns zero items

## Quick Start Guide

| Task | How To |
|------|--------|
| Browse diseases | Open **Home** and scroll the disease list |
| Search diseases | Use the search input (if present) or apply keyword search via the UI; otherwise use the API `GET /api/diseases?search=...` |
| Filter by symptom/risk factor | Apply filters in the UI (if present) or call `GET /api/diseases?symptom=...` / `riskFactor=...` |
| Verify sources | Open **Sources** and click a source link to view the original dataset/organization |
| Troubleshoot a broken page | Check [FAQ & Troubleshooting](faq.md), then confirm `/api/health` is reachable |

## User Roles

| Role | Permissions | Access Level |
|------|-------------|--------------|
| **Visitor / Reader** | Browse disease content, view sources, read research cards (if enabled), switch theme/language | Read-only |
| **Developer (local run)** | Run frontend/backend, seed DB, verify API via Swagger/OpenAPI, debug errors via logs | Full (development environment) |
| **Academic reviewer / supervisor** | Review functionality against requirements and documentation, verify reproducibility of setup | Read-only |
