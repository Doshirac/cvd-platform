# CVD Platform - Project Instructions

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Backend API Reference](#backend-api-reference)
6. [Frontend Structure](#frontend-structure)
7. [State Management](#state-management)
8. [Styling Guide](#styling-guide)
9. [Development Workflow](#development-workflow)

---

## 🎯 Project Overview

**CVD Platform** is a comprehensive cardiovascular disease knowledge platform designed to provide medical professionals and users with searchable, filterable access to disease information, symptoms, risk factors, and trusted medical sources.

### Key Features
- **Disease Catalog**: Browse and search cardiovascular diseases with detailed information
- **Filter System**: Filter by symptoms and risk factors
- **Alphabetical Navigation**: Quick access to diseases by first letter
- **Multi-language Support**: English and Russian localization
- **Dark/Light Theme**: User-configurable theme switching
- **Medical Sources**: Curated list of trusted medical organizations
- **Research Data**: Access to cardiovascular research information

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CVD Platform                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────┐    ┌──────────────────────────────────┐   │
│  │       Frontend (React)   │    │         Backend (Express)        │   │
│  │                          │    │                                  │   │
│  │  ┌────────────────────┐  │    │  ┌────────────────────────────┐ │   │
│  │  │   Redux Store      │  │    │  │       REST API             │ │   │
│  │  │   - diseases       │◄─┼────┼──┤   /api/diseases            │ │   │
│  │  │   - sources        │  │    │  │   /api/diseases/symptoms   │ │   │
│  │  │   - api (RTK)      │  │    │  │   /api/diseases/risk-factors│ │  │
│  │  └────────────────────┘  │    │  │   /api/sources             │ │   │
│  │                          │    │  │   /api/health              │ │   │
│  │  ┌────────────────────┐  │    │  └────────────────────────────┘ │   │
│  │  │   Pages            │  │    │                                  │   │
│  │  │   - MainPage       │  │    │  ┌────────────────────────────┐ │   │
│  │  │   - SourcesPage    │  │    │  │     Prisma ORM             │ │   │
│  │  │   - DiseasePage    │  │    │  │   - PostgreSQL             │ │   │
│  │  │   - ResearchPage   │  │    │  └──────────┬─────────────────┘ │   │
│  │  └────────────────────┘  │    │             │                    │   │
│  │                          │    │  ┌──────────▼─────────────────┐ │   │
│  │  ┌────────────────────┐  │    │  │     Redis Cache            │ │   │
│  │  │   Shared UI        │  │    │  └────────────────────────────┘ │   │
│  │  │   - DiseaseCard    │  │    │                                  │   │
│  │  │   - SourceCard     │  │    └──────────────────────────────────┘   │
│  │  │   - SearchBar      │  │                                            │
│  │  │   - FilterPanel    │  │                                            │
│  │  │   - Header         │  │                                            │
│  │  │   - etc.           │  │                                            │
│  │  └────────────────────┘  │                                            │
│  └──────────────────────────┘                                            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js 20 | Runtime environment |
| Express 5 | Web framework |
| TypeScript | Type safety |
| Prisma | ORM for PostgreSQL |
| Redis (ioredis) | Caching layer |
| Winston | Logging |
| Sentry | Error monitoring |
| Jest | Testing |
| SWC | Build tool |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI library |
| TypeScript | Type safety |
| Redux Toolkit | State management |
| RTK Query | API caching |
| React Router | Routing |
| Vite | Build tool |
| SCSS Modules | Styling |
| i18next | Internationalization |
| Vitest | Testing |
| Playwright | E2E testing |
| Storybook | Component documentation |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 16 (via Docker)
- Redis 7 (via Docker)

### Installation

#### 1. Clone and Setup
```bash
# Clone repository
cd cvd-platform

# Install dependencies
cd backend && npm install
cd ../frontend && npm install
```

#### 2. Environment Configuration

**Backend (.env)**
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5431/cvd_db"

# Redis
REDIS_URL="redis://localhost:6379"

# Server
PORT=4000
NODE_ENV=development

# Sentry (optional)
SENTRY_DSN=""
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:4000/api
```

#### 3. Start with Docker Compose
```bash
# From root directory
docker-compose up -d
```

#### 4. Database Setup
```bash
cd backend
npm run migrate    # Run migrations
npm run generate   # Generate Prisma client
npm run seed       # Seed database
```

#### 5. Start Development Servers
```bash
# Backend (from backend/)
npm run dev

# Frontend (from frontend/)
npm run dev
```

---

## 📡 Backend API Reference

### Base URL
```
http://localhost:4000/api
```

### Endpoints

#### Diseases

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/diseases` | Get diseases with filtering | `skip`, `take`, `symptom`, `riskFactor`, `search`, `locale` |
| GET | `/diseases/symptoms` | Get all symptoms | `locale` |
| GET | `/diseases/risk-factors` | Get all risk factors | `locale` |
| GET | `/diseases/by-letter` | Get diseases by letter | `letter`, `skip`, `take`, `locale` |

#### Sources

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/sources` | Get sources with pagination | `skip`, `take`, `search` |

#### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Simple health check (204) |
| GET | `/health/details` | Detailed health info |

### Response Schemas

#### Disease
```typescript
interface Disease {
  id: number;
  code: string;
  name: string;
  description: string;
  prevention: string;
  symptoms: string[];
  risks: string[];
}
```

#### Symptom
```typescript
interface Symptom {
  code: string;
  term: string;
  category: string;
}
```

#### RiskFactor
```typescript
interface RiskFactor {
  code: string;
  name: string;
  definition: string;
}
```

#### Source
```typescript
interface Source {
  id: number;
  name: string;
  link: string;
}
```

---

## 📁 Frontend Structure

```
frontend/src/
├── app/                          # App configuration
│   ├── providers/                # React providers
│   │   ├── StoreProvider/       # Redux store setup
│   │   ├── Router/              # React Router config
│   │   └── ErrorBoundary/       # Error handling
│   └── styles/                  # Global SCSS
│       ├── _variables.scss      # Design tokens
│       ├── _mixins.scss         # SCSS mixins
│       ├── _reset.scss          # CSS reset
│       └── _common-styles.scss  # Base styles
│
├── pages/                        # Page components
│   ├── MainPage/                # Disease catalog
│   ├── DiseasePage/             # Disease details
│   ├── SourcesPage/             # Sources list
│   ├── ResearchPage/            # Research data
│   └── ErrorPage/               # Error display
│
├── shared/                       # Shared resources
│   ├── api/                     # API layer
│   │   ├── config/              # Axios config
│   │   ├── diseases/            # Disease API
│   │   └── sources/             # Sources API
│   ├── ui/                      # UI components
│   │   ├── Button/
│   │   ├── DiseaseCard/
│   │   ├── SourceCard/
│   │   ├── SearchBar/
│   │   ├── FilterPanel/
│   │   ├── Header/
│   │   └── ...
│   ├── hooks/                   # Custom hooks
│   ├── utils/                   # Utilities
│   └── i18n/                    # Translations
│
└── mock/                         # Mock data for testing
```

---

## 🗃️ State Management

### Store Configuration

The app uses Redux Toolkit with the following structure:

```typescript
// store.ts
const rootReducer = combineReducers({
  api: api.reducer,        // RTK Query API slice
  diseases: diseasesReducer,  // Diseases state
  sources: sourcesReducer,    // Sources state
});
```

### Slices

#### Diseases Slice
```typescript
interface DiseasesState {
  items: Disease[];
  symptomList: Symptom[];
  riskFactors: RiskFactor[];
  loading: boolean;
  error: string | null;
}
```

**Actions (Thunks):**
- `fetchDiseases(params)` - Fetch diseases with filters
- `fetchSymptoms()` - Fetch all symptoms
- `fetchRiskFactors()` - Fetch all risk factors

**Selectors:**
- `selectDiseases` - Get all diseases
- `selectSymptoms` - Get all symptoms
- `selectRiskFactors` - Get all risk factors

#### Sources Slice
```typescript
interface SourcesState {
  items: Source[];
  loading: boolean;
  error: string | null;
}
```

**Actions (Thunks):**
- `fetchSources(params)` - Fetch sources with search

**Selectors:**
- `selectSources` - Get all sources

### Usage Example

```tsx
import { useSelector, useDispatch } from 'react-redux';
import { selectDiseases } from '@shared/api/diseases/diseasesSlice';
import { fetchDiseases } from '@shared/api/diseases/diseasesThunks';
import type { RootState, AppDispatch } from '@app/providers/StoreProvider/config/store';

function MyComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const diseases = useSelector(selectDiseases);
  const loading = useSelector((state: RootState) => state.diseases.loading);

  useEffect(() => {
    dispatch(fetchDiseases({ locale: 'en' }));
  }, [dispatch]);

  return (/* ... */);
}
```

---

## 🎨 Styling Guide

### SCSS Architecture

The project uses SCSS Modules with a structured approach:

```
styles/
├── _variables.scss    # Design tokens (colors, fonts, spacing)
├── _mixins.scss       # Reusable SCSS mixins
├── _reset.scss        # CSS reset
├── _common-styles.scss # Global styles
└── index.scss         # Main entry
```

### Design Tokens (_variables.scss)

#### Colors - Light Theme
```scss
$light-bg: #f7f9fc;
$light-text: #1c1f25;
$light-primary: #2a4e8a;
$light-card-bg: #fff;
$light-border: #e1e5eb;
$light-muted-text: #4d5665;
```

#### Colors - Dark Theme
```scss
$dark-bg: #0f1419;
$dark-text: #f7f9fc;
$dark-primary: #3f6cbc;
$dark-card-bg: #1c1f25;
$dark-border: #2a2f38;
$dark-muted-text: #9ca3af;
```

#### Typography
```scss
$font-sans: 'Inter', system-ui, sans-serif;
$fs-sm: 0.875rem;
$fs-md: 1rem;
$fs-lg: 1.125rem;
$fw-regular: 400;
$fw-medium: 500;
$fw-semibold: 600;
```

#### Spacing & Radius
```scss
$radius-sm: 0.25rem;
$radius-md: 0.375rem;
$radius-lg: 0.625rem;
$radius-xl: 0.875rem;
```

#### Breakpoints
```scss
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
```

### Mixins (_mixins.scss)

```scss
// Flexbox helper
@mixin flex($direction, $justify, $align, $wrap: nowrap) {
  display: flex;
  flex-flow: $direction $wrap;
  justify-content: $justify;
  align-items: $align;
}

// Typography helper
@mixin typography($family, $size, $weight) {
  font-family: $family;
  font-size: $size;
  font-weight: $weight;
}

// Focus ring
@mixin focus-ring($border, $ring) {
  outline: none;
  box-shadow: 0 0 0 0.063rem $border, 0 0 0 0.25rem $ring;
}

// Responsive breakpoints
@mixin responsive($breakpoint) {
  @if $breakpoint == xs { @media (max-width: $breakpoint-sm) { @content; } }
  @else if $breakpoint == sm { @media (min-width: $breakpoint-sm) and (max-width: $breakpoint-md) { @content; } }
  @else if $breakpoint == md { @media (min-width: $breakpoint-md) and (max-width: $breakpoint-lg) { @content; } }
  @else if $breakpoint == lg { @media (min-width: $breakpoint-lg) and (max-width: $breakpoint-xl) { @content; } }
  @else if $breakpoint == xl { @media (min-width: $breakpoint-xl) { @content; } }
}
```

### Component Styling Pattern

```scss
// Component.module.scss
@use '@styles/variables' as *;
@use '@styles/mixins' as *;

.component {
  @include flex(column, flex-start, stretch);
  // Base styles using variables
  padding: 1rem;
  border-radius: $radius-lg;
}

// Light theme overrides
:global(html.theme-light) {
  .component {
    background: $light-card-bg;
    color: $light-text;
    border: 0.063rem solid $light-border;
  }
}

// Dark theme overrides
:global(html.theme-dark) {
  .component {
    background: $dark-card-bg;
    color: $dark-text;
    border: 0.063rem solid $dark-border;
  }
}
```

---

## 👨‍💻 Development Workflow

### Available Scripts

#### Backend
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Run production build
npm run test        # Run tests
npm run lint        # Run ESLint
npm run migrate     # Run database migrations
npm run seed        # Seed database
```

#### Frontend
```bash
npm run dev         # Start Vite dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run test        # Run Vitest
npm run test:e2e    # Run Playwright tests
npm run lint        # Run ESLint
npm run storybook   # Start Storybook
```

### Code Quality

- **ESLint** - TypeScript linting
- **Prettier** - Code formatting
- **Husky** - Pre-commit hooks
- **lint-staged** - Run linters on staged files

### Testing Strategy

- **Unit Tests**: Vitest/Jest for components and functions
- **Integration Tests**: Test API interactions
- **E2E Tests**: Playwright for full user flows
- **Component Tests**: Storybook for visual testing

---

## 📝 Contributing

1. Create feature branch from `main`
2. Follow existing code patterns
3. Write tests for new features
4. Run linting before committing
5. Submit PR with clear description

---

## 📄 License

MIT License - see LICENSE file for details.
