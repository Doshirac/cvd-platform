# Features & Requirements

## Core Features (Epics)

| Epic ID | Feature | Description | Priority |
|---------|---------|-------------|----------|
| E1 | Browse Disease Library | Discover diseases via list view | Must |
| E2 | Search Diseases | Find diseases by name/keywords | Must |
| E3 | Filter by Category | Narrow results by category/risk/severity | Must |
| E4 | View Disease Card | Read standardized disease card | Must |
| E5 | View Research Cards | Read-only research summaries | Should |
| E6 | Switch Language EN/RU | Toggle English/Russian | Must |
| E7 | View References | View sources/datasets with provenance | Should |

## Functional Requirements - User Stories

### User Story 1 - Browse Disease Library

**As a** User  
**I want** to see a list of cardiovascular diseases  
**So that** I can quickly find conditions to read.

**Acceptance Criteria:**
- List loads <=2s with >=25 diseases
- Each item links to its card
- Clear empty/error states

### User Story 2 - Search Diseases

**As a** User  
**I want** to search by disease name or keywords  
**So that** I can find a specific disease.

**Acceptance Criteria:**
- Results appear <1s
- Matches are highlighted
- No-results state shown

### User Story 3 - Filter by Category

**As a** User  
**I want** to apply filters  
**So that** I can narrow the list to what I need.

**Acceptance Criteria:**
- Filters update results instantly
- "Clear all" resets state
- URL reflects active filters (shareable)

### User Story 4 - View Disease Card

**As a** User  
**I want** to open a disease card  
**So that** I can read description, symptoms, and prevention.

**Acceptance Criteria:**
- Sections visible: Description, Primary/Secondary symptoms, Prevention
- Loads <=2s
- Sources/references visible

### User Story 5 - Switch Language

**As a** User  
**I want** to switch between English and Russian  
**So that** I can read in my preferred language.

**Acceptance Criteria:**
- UI labels and content switch
- Choice persists across sessions

## Use Case Diagram

[View Diagram](docs/assets/diagrams/use_case_diagram.jpg)

## Non-Functional Requirements

- **Performance:** LCP <2.5s; API p95 <300ms; 25-50 concurrent users
- **Security:** HTTPS, rate limiting, input validation, no PII/PHI
- **Accessibility:** Keyboard navigation, ARIA labels, medical disclaimer
- **Scalability:** Stateless API, cached assets
- **Usability:** Responsive UI, Dark/Light theme, EN/RU localization
- **Reliability:** Daily backups, <=60min recovery target
- **Compatibility:** Chrome/Firefox/Safari (latest 2 versions), iOS 16+/Android 11+
- **Deployment:** Docker Compose, OpenAPI documentation

## Compliance

- **GDPR:** No PII/PHI; Privacy Notice required
- **Medical Disclaimer:** Informational only, not medical advice
- **Data Licensing:** Respect open-data licenses (WHO/EU/national)
- **Terms of Use:** No warranty, liability limitations
