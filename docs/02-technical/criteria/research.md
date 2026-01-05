# Criterion: Research Pipeline & Analytics Artifacts

## Architecture Decision Record

### Status

**Status:** Accepted

**Date:** 2026-01-05

### Context

The thesis requires dataset-based insights, but the product scope avoids real-time BI and heavy analytics infrastructure. The pipeline must be reproducible and reviewable.

### Decision

Keep research/ETL in Python under `analysis/` with datasets committed for reproducibility. Generate plots/findings as static artifacts (SVG/PNG) intended to be embedded in the web UI.

### Alternatives Considered

| Alternative | Pros | Cons | Why Not Chosen |
|---|---|---|---|
| Power BI/Fabric | Rich dashboards | Vendor + deployment overhead | Out of scope for MVP |
| Frontend-only charts | No separate pipeline | Hard reproducibility | Analysis must be verifiable |
| Warehouse + scheduled jobs | Scales well | Too heavy | Not needed for read-only library |

### Consequences

**Positive:** transparent, in-repo workflow; low runtime complexity.

**Negative:** visuals are mostly static.

**Neutral:** pipeline can be formalized later (pinned env + standardized export).

## Implementation Details

### Key Implementation Decisions

- Separate research code from API runtime.
- Prefer deterministic exports over live analytics services.

### Project Structure

```
analysis/
    datasets/
    code_solution/
```

## Requirements Checklist

| # | Requirement | Status | Evidence/Notes |
|---:|---|:---:|---|
| 1 | Research code in repo | ✅ | `analysis/code_solution/*` |
| 2 | Datasets included | ✅ | `analysis/datasets/*` |
| 3 | Standard Python toolchain | ✅ | pandas/numpy/matplotlib usage |
| 4 | Exportable artifacts | ⚠️ | Plots exist; export convention can be standardized |
| 5 | Not coupled to runtime | ✅ | No API dependency on Python pipeline |

## Known Limitations

| Limitation | Impact | Potential Solution |
|---|---|---|
| Dependencies not pinned | Repro varies by machine | Add an `analysis/requirements.txt` |
| No single outputs folder | Harder embedding | Standardize `analysis/outputs/` exports |
