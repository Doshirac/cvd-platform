# Criterion: Research Pipeline & Analytics Artifacts

## Architecture Decision Record

### Status

**Status:** Accepted

**Date:** 2026-01-05

### Context

The thesis requires research-backed insights and visualizations sourced from public datasets (e.g., UCI/WHO/Eurostat/CDC), but the product scope explicitly avoids real-time BI stacks and complex analytics infrastructure. The research pipeline should be reproducible, easy to review, and able to generate static artifacts (e.g., figures/SVG) suitable for embedding in a web UI.

Key forces:
- Reproducibility and transparency of analysis
- Minimal runtime complexity (no BI servers)
- Dataset licensing/attribution and “last updated” traceability
- Ability to export graphics for the frontend

### Decision

Use a Python-based analysis/ETL workflow located in the repository:
- Store datasets under `analysis/datasets/`
- Store analysis scripts/notebook exports under `analysis/code_solution/`
- Generate plots and findings using standard scientific Python tooling (pandas/numpy/matplotlib)
- Treat outputs as static artifacts (e.g., SVG/PNG) to be served by the frontend or API

### Alternatives Considered

| Alternative | Pros | Cons | Why Not Chosen |
|---|---|---|---|
| Power BI / Fabric | Fast dashboards; rich visuals | Vendor lock-in; licensing; extra deployment complexity | Out of scope for MVP; thesis requires open, reproducible pipeline |
| Live charting only in frontend | No separate pipeline | Hard to ensure scientific reproducibility; heavier client runtime | Research should be verifiable and dataset-driven |
| Full data warehouse + scheduled jobs | Scalable | Too heavy for MVP and single-developer timeline | Not justified for read-only library scope |

### Consequences

**Positive:**
- Analysis is reviewable in-repo
- Low operational burden (no analytics server)
- Output artifacts are cacheable and easy to ship

**Negative:**
- Visuals are mostly static (limited interactivity)

**Neutral:**
- Pipeline can later be formalized (Makefile, pinned env) if needed

## Implementation Details

### Project Structure

```
analysis/
├── datasets/                 # Raw CSV datasets
│   ├── heart_disease_uci.csv
│   └── ...
└── code_solution/            # Notebook/script exports
    ├── heart_disease_uci.py
    └── ...
```

### Key Implementation Decisions

| Decision | Rationale |
|---|---|
| Keep analysis code separate from backend runtime | Avoids coupling API uptime to research tooling |
| Use common Python data stack | Widely understood and reproducible for academic review |
| Export figures for the website | Aligns with “view-only research cards” and static assets approach |

### Code Examples

Loading a dataset and producing a basic plot:

```py
# analysis/code_solution/heart_disease_uci.py
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('heart_disease_uci.csv')
df['target'] = (df['num'] > 0).astype(int)

df['target'].value_counts().plot(kind='bar')
plt.title('Target Distribution: Heart Disease (UCI)')
plt.show()
```

### Diagrams

- Research artifacts are intended to be embedded as static SVG/PNG in the frontend.

## Requirements Checklist

| # | Requirement | Status | Evidence/Notes |
|---:|---|:---:|---|
| 1 | Research code is in-repo and reviewable | ✅ | `analysis/code_solution/*` |
| 2 | Datasets stored locally for reproducibility | ✅ | `analysis/datasets/*` |
| 3 | Uses standard Python data tooling | ✅ | Imports of pandas/numpy/matplotlib/scipy in scripts |
| 4 | Produces visual outputs suitable for embedding | ⚠️ | Plots are generated; dedicated export step to SVG/PNG should be standardized |
| 5 | Clear separation from production runtime | ✅ | Analysis code is isolated under `analysis/` |
| 6 | “Research cards” consumable by the web UI | ⚠️ | FE route constant exists; UI integration is not mounted yet |

## Known Limitations

| Limitation | Impact | Potential Solution |
|---|---|---|
| Python dependencies are not pinned in a requirements file | Reproducibility depends on the local environment | Add `analysis/requirements.txt` and document how to run |
| No standardized artifact output folder | Harder to automate embedding into frontend | Create a `analysis/outputs/` convention and export figures there |
| Research route not active in router | Users cannot view research cards yet | Implement `ResearchPage` and mount it in the router |

## References

- `analysis/code_solution/heart_disease_uci.py`
- `analysis/datasets/`
- `docs/01-project-overview/scope.md` (Research Cards: view-only)
