# Feature Walkthrough

Core user flows of the CVD Platform.

> [Original UI/UX Documentation](https://docs.google.com/document/d/19rmvxAH_jqToaFLBTyVxYtAc306CxIKx-DLcIrTWUuQ/edit?usp=sharing)

---

## Feature 1: Navigation, Theme & Language

Use the header to navigate sections and adjust preferences.

**How to Use:**
1. Click **Home**, **Sources**, or **Research** (mobile: burger menu)
2. Toggle theme via the icon — persists across sessions
3. Select language via globe icon

[Header navigation](docs/assets/screenshots/header_navigation.jpg) | [Mobile nav](docs/assets/images/mobile_navigation.jpg) | [Desktop nav](docs/assets/images/desktop_navigation.jpg)

**Tip:** If theme seems stuck, hard-refresh and check localStorage.

---

## Feature 2: Disease Library (Home)

Browse cardiovascular diseases as standardized cards.

**How to Use:**
1. Open **Home** from header
2. Scroll/paginate through disease list
3. Click a card to view details (if enabled)

[Disease library](docs/assets/screenshots/disease_library.jpg) | [Navigation flow](docs/assets/images/disease_page_navigation.jpg)

---

## Feature 3: Search & Filter

Find diseases by symptoms, risk factors, or keywords.

**How to Use:**
1. Enter keywords in the search bar
2. Apply **Symptom** and/or **Risk Factor** filters
3. Use **Alphabet filter** (A–Z) if available
4. Click **See more** to load additional results

[Search/filters](docs/assets/screenshots/search_and_filters.jpg) | [Filter panel](docs/assets/images/filter_panel_hide_list.jpg) | [Mobile filters](docs/assets/images/mobile_open_filter_panel.jpg)

**API:** `GET /api/diseases?search=...&symptom=...&riskFactor=...&skip=0&take=10&locale=en`

---

## Feature 4: Sources & Research

View attribution sources and research summaries.

**How to Use:**
1. Navigate to **Sources** — click **View Resource** to open external links
2. Navigate to **Research** — browse research cards (if enabled)

[View source](docs/assets/images/view_source.jpg) | [Research cards](docs/assets/images/research_cards.jpg)

---

## Additional Features (if enabled)

| Feature | Description |
|---------|-------------|
| **Back to Diseases** | Quick return button — [Image](docs/assets/images/back_to_diseases_list.jpg) |
| **Scroll-to-Top** | Return to top on long pages — [Image](docs/assets/images/scroll_to_top.jpg) |
| **Tooltip Badges** | Hover/long-press codes for full names — [Image](docs/assets/images/tooltip_badge.jpg) |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + R` | Refresh page |
| `Ctrl/Cmd + F` | Find on page |
| `Alt + ←` | Navigate back |
| `Esc` | Close dropdown/menu |

---

## Feature Comparison

| Feature | MVP | Post-MVP |
|---------|-----|----------|
| Browse/search/filter diseases | ✅ | ✅ |
| Disease details page | ⚠️ In progress | ✅ |
| Sources & attribution | ✅ | ✅ |
| Research Cards | ⚠️ May be disabled | ✅ |
