# Feature Walkthrough

This guide explains the core user flows of the CVD Platform.

Notes:
- Screenshot links are placeholders — you can add the image files later.
- Some routes/pages are still being wired in the current frontend router. If you don’t see a page described below, check the Not Found page and the project’s current UI status.
- Some UI interactions in this chapter are marked as “if enabled in your build”, because different project revisions may have unfinished wiring.
- [Original UI/UX Documentation](https://docs.google.com/document/d/19rmvxAH_jqToaFLBTyVxYtAc306CxIKx-DLcIrTWUuQ/edit?usp=sharing)

## Feature 1: Navigation, Theme & Language

### Overview

Use the header to navigate between the main sections of the platform and to adjust UI preferences (theme, language). This improves usability for both desktop and mobile users.

### How to Use

[Header navigation Image](../assets/screenshots/header_navigation.jpg)

**Step 1:** Use the header navigation
- Click **Home**, **Sources**, or **Research** in the top navigation.
- On mobile screens, open the menu via the burger button.

[Page Navigation Example on the mobile](../assets/images/mobile_navigation.jpg) - Here you can find the schema

[Page Navigation Example on the desktop](../assets/images/desktop_navigation.jpg) - Here you can find the schema

**Step 2:** Switch the theme (Light/Dark)
- Click the theme toggle icon in the header.
- The chosen theme is saved and restored on the next visit.

[Theme Changing Example Visualization on the mobile](../assets/images/theme_changing_mobile.jpg) - Here you can find the schema

**Step 3:** Open the language selector
- Click the globe icon in the header and choose a language option.
- Depending on the current build, the selector may be UI-only (visual selection) or may also affect content loading.

[Language Switching Example Visualization on the mobile](../assets/images/language_switching_mobile.jpg) - Here you can find the schema

**Expected Result:** You can navigate between sections, and your UI preferences (especially theme) persist.

### Tips

- If a page route isn’t available yet, you may land on a **Not Found** page even if the header contains the link.
- If the theme looks “stuck”, hard-refresh the page and ensure your browser allows localStorage.

---

## Feature 2: Browse the Disease Library (Home)

### Overview

Browse a list of cardiovascular diseases presented as standardized cards. This is the main entry point for discovery.

### How to Use

[Disease library Image](../assets/screenshots/disease_library.jpg)

**Step 1:** Open the Home page
- Use the **Home** link in the header.

**Step 2:** Review the list of diseases
- Scroll the list and open a disease that matches your interest.
- If pagination controls are present, use them to navigate through pages.

### 2.1 Disease Page Navigation (if enabled in your build)

Clicking a disease card navigates to a disease details page containing all information about the selected disease.

[Disease Page Navigation Visualization](../assets/images/disease_page_navigation.jpg) - Here you can find the schema

**Step 3:** Continue exploring
- Return to the list to compare several diseases.

**Expected Result:** A disease list is displayed with clear loading/empty states and navigation to deeper details.

---

## Feature 3: Search & Filter Diseases

### Overview

Use search and filters to quickly find diseases relevant to symptoms, risk factors, or keywords. This supports faster discovery than manual browsing.

### How to Use

[Search and filters Image](../assets/screenshots/search_and_filters.jpg)

### 3.1 Searching for a disease by name or code

Use the Search Bar to find a disease (or group of diseases) by name, medical code, symptom, or risk factor.

[Example of disease search by Search Bar Visualization](../assets/images/disease_search_search_bar.jpg) - Here you can find the schema

**Step 1:** Search by keywords
- Enter a keyword related to a disease name, symptom, risk factor, or code.
- Review the results list.

### 3.2 Filtering diseases by filters and risk factors

Use the Filter Panel to narrow the disease list by selecting symptoms/risk factors (including primary/secondary grouping where available).

[Filter panel expanded/collapsed Visualization](../assets/images/filter_panel_hide_list.jpg) - Here you can find the schema

**Step 2:** Narrow results using filters
- Apply a **Symptom** filter (by term or code) and/or a **Risk Factor** filter (by name or code).
- Adjust filters until the list matches your intent.

#### Mobile filtering flow

On mobile, filters may be located behind a filter icon.

[Open filtering panel on mobile Visualization](../assets/images/mobile_open_filter_panel.jpg) - Here you can find the schema

**Expected Result:** The results list updates and shows either matching diseases or a clear “no results” state.

### 3.3 Alphabet Filtering (if enabled in your build)

Some builds allow filtering the disease list by the first letter (A–Z). Selecting a letter filters the list to diseases starting with that letter. Selecting the same letter again (or using “clear”) resets the filter.

[Finding Diseases that start from A character Visualization](../assets/images/alphabet_filtering_a.jpg) - Here you can find the schema

If no diseases match the chosen letter (or combined filters), the UI should show a clear “no results” scenario.

[No Disease Found Visualization](../assets/images/no_disease_found.jpg) - Here you can find the schema

### 3.4 Loading more items on the list (if enabled in your build)

Some builds provide a **See more** button to load additional cards without leaving the page.

[See more button Visualization](../assets/images/see_more_button.jpg) - Here you can find the schema

Expected behavior:
- Clicking **See more** loads 5 additional cards into the list.
- The same interaction pattern may be used on the Sources and Research pages.

### Tips

- If you see a successful response but no items (for example, “No disease found.”), it usually means the filters/search are too strict or the database is not seeded.
- If you are integrating directly via API, the diseases endpoint supports `search`, `symptom`, `riskFactor`, pagination (`skip`/`take`), and locale.

---

## Feature 4: Sources & Research Cards

### Overview

View the list of sources used for attribution (datasets/organizations), and browse research-oriented, view-only “Research Cards” when available. This supports transparency and traceability.

### How to Use

**Step 1:** Open Sources
- Navigate to **Sources** from the header.
- Use search (if available) to find a specific organization.

**Step 2:** Open a source link
- Click the **View Resource** button (or source link) to open the external resource in a new tab and verify provenance.

[View Source Visualization](../assets/images/view_source.jpg) - Here you can find the schema

**Step 3:** Open Research
- Navigate to **Research** from the header.
- Browse “Research Cards” for short summaries and supporting visuals (if the page is enabled in your build).

[Research cards Visualization](../assets/images/research_cards.jpg) - Here you can find them

**Expected Result:** You can see references/sources for transparency and (optionally) read research summaries on the website.

### 4.1 Research Card Navigation (if enabled in your build)

Some builds allow opening an individual research card to view its full content.

[Research Card Opening Visualization](../assets/images/research_card_open.jpg) - Here you can find the schema

To close the opened research card and return to the list, use the cross icon or a **Close** button.

[Closing Research Card Visualization](../assets/images/research_card_close.jpg) - Here you can find the schema

## Feature 5: Back to Diseases List Feature (if enabled in your build)

Instead of using the header navigation or mobile burger menu, some builds provide a **Back to Diseases** button for quicker return to the main disease list.

[Back to Diseases List Visualization](../assets/images/back_to_diseases_list.jpg) - Here you can find the schema

## Feature 6: Scroll-to-Top Button (if enabled in your build)

### 6.1 Scrolling to the Top Feature

On long pages, a Scroll-to-Top button can be used to return to the top quickly.

[Scroll-to-Top Button Visualization](../assets/images/scroll_to_top.jpg) - Here you can find the schema

## Feature 7: Hints / Tooltip Badges (if enabled in your build)

### 7.1 Hints Text Feature

Hovering (desktop) or long-pressing (mobile, if supported) a badge with a medical code (e.g., “SOB”) can show a tooltip with the full symptom/risk name.

[Tooltip Badge Visualization](../assets/images/tooltip_badge.jpg) - Here you can find the schema

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + R` | Refresh the current page |
| `Ctrl/Cmd + L` | Focus the browser address bar |
| `Alt + ←` / `Cmd + [` | Navigate back |
| `Ctrl/Cmd + F` | Find text on the current page |
| `Esc` | Close a dropdown/menu (when applicable) |

## Feature Comparison

| Feature | MVP (Diploma scope) | Post‑MVP (Possible extensions) |
|---------|---------------------|------------------------------|
| Browse/search/filter disease library | ✅ | ✅ |
| Disease details (standardized card sections) | ⚠️ UI wiring may be in progress | ✅ |
| Sources & attribution | ✅ | ✅ (per-disease linking could be expanded) |
| Research Cards (view-only research summaries) | ⚠️ May be disabled depending on current build | ✅ (more research cards + better presentation) |
