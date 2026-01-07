# Research Pipeline & Analytics Artifacts

## Decision

**Status:** Accepted | **Date:** 2026-01-05

Python ETL under analysis/ with datasets committed for reproducibility. Generate static artifacts (SVG/PNG) for web UI embedding.

| Alternative | Why Not Chosen |
|-------------|----------------|
| Power BI/Fabric | Vendor lock-in, deployment overhead |
| Frontend-only charts | Hard reproducibility |
| Warehouse + jobs | Too heavy for read-only library |

## Structure

```
analysis/
 datasets/                    # Source CSV files
    heart_attack_prediction_dataset.csv
    heart_disease_uci.csv
    heart_disease.csv
    heart_statlog_cleveland_hungary_final.csv
 code_solution/               # Analysis scripts
     heart_attack_prediction_dataset.py
     heart_disease_research2.py
     heart_disease_uci.py
     heart_statlog_cleveland_hungary_final.py
```

## Data Sources

### Original Datasets (Kaggle)

| Dataset | Source Link |
|---------|-------------|
| Heart Statlog Cleveland Hungary | https://www.kaggle.com/code/zohaib123/heart-disease-prediction-research-work/notebook?select=heart_statlog_cleveland_hungary_final.csv |
| Heart Disease UCI | https://www.kaggle.com/code/zohaib123/heart-disease-prediction-research-work/notebook?select=heart_disease_uci.csv |
| Heart Disease | https://www.kaggle.com/code/zohaib123/heart-disease-prediction-research-work/notebook?select=heart_disease.csv |
| Heart Attack Prediction | https://www.kaggle.com/code/zohaib123/heart-disease-prediction-research-work/notebook?select=heart_attack_prediction_dataset.csv |

### Interactive Analysis Scripts (Google Colab)

| Analysis | Colab Link |
|----------|------------|
| Heart Statlog Cleveland Hungary | https://colab.research.google.com/drive/139hZHDxAnGv8CS3GV-HY6hkr-P7dzg8B?usp=sharing |
| Heart Disease Research | https://colab.research.google.com/drive/1WnrHF8mhSjNdPGSoEicCKynz6lCvEZTG?usp=sharing |
| Heart Attack Prediction | https://colab.research.google.com/drive/1Cvhrqh39Pa_IFBUay20E6-SD9hs5Uuk9?usp=sharing |
| Heart Disease UCI | https://colab.research.google.com/drive/1_cl0Nq0X2drrn6Esprw4-jaOzT1m7Qjd?usp=sharing |

## Analysis Methodology

### Fields Analyzed

**Clinical Indicators:**
- Age, Sex, Chest Pain Type, Resting Blood Pressure
- Serum Cholesterol, Fasting Blood Sugar, Resting ECG
- Maximum Heart Rate, Exercise-Induced Angina
- ST Depression (Oldpeak), ST Slope
- Number of Major Vessels, Thalassemia

**Lifestyle Factors:**
- Smoking Status, Obesity, Alcohol Consumption
- Exercise Hours Per Week, Physical Activity Days
- Diet (Healthy/Average/Unhealthy), Sedentary Hours
- Sleep Hours Per Day, Stress Level (1-10)

**Medical History:**
- Diabetes, Family History of Heart Disease
- Previous Heart Problems, Medication Use
- BMI, Triglyceride Levels

**Demographic Data:**
- Country, Continent, Hemisphere, Income Level

### Statistical Methods Applied

| Method | Purpose |
|--------|---------|
| Descriptive Statistics | Mean, median, std, min/max for all numeric features |
| Data Quality Checks | Missing values analysis, duplicate detection, validity checks |
| Target Distribution | Class balance assessment (disease vs. no disease) |
| Univariate Analysis | Histograms for numeric features, value counts for categorical |
| Bivariate Analysis | Grouped statistics by target (mean/median/std) |
| Welch's t-test | Compare numeric feature means between disease groups |
| Cohen's d | Effect size calculation for practical significance |
| Chi-square Test | Association between categorical features and target |
| Correlation Analysis | Pearson correlation matrix, correlation with target variable |

### Analysis Workflow

1. **Data Loading & Overview** - Load CSV, inspect shape, columns, data types
2. **Data Quality Checks** - Missing values per column, duplicate rows, value range validation
3. **Target Distribution** - Class balance, disease prevalence rate
4. **Univariate Analysis** - Distribution of each feature independently
5. **Bivariate Analysis (Numeric)** - Compare feature distributions by disease status
6. **Bivariate Analysis (Categorical)** - Disease rates within each category
7. **Statistical Testing** - t-tests for numeric, chi-square for categorical features
8. **Correlation Analysis** - Feature correlations and relationship with target
9. **Visualization** - Histograms, box plots, bar charts, correlation heatmaps

### Key Findings

**Statistically Significant Predictors (p < 0.05):**
- ST Depression (Oldpeak): Higher in heart disease patients
- Maximum Heart Rate: Lower in heart disease patients
- Age: Higher in heart disease patients
- Chest Pain Type: Asymptomatic patients have highest disease rate
- Exercise-Induced Angina: Strong association with heart disease
- ST Slope: Flat/downsloping segments indicate higher disease prevalence

## Requirements

| # | Requirement | Status |
|--:|-------------|:------:|
| 1 | Research code in repo | Done |
| 2 | Datasets included | Done |
| 3 | Standard Python toolchain | Done |
| 4 | Exportable artifacts | Done |
| 5 | Not coupled to runtime | Done |

## Limitations

| Limitation | Solution |
|------------|----------|
| Dependencies not pinned | Add analysis/requirements.txt |
| No single outputs folder | Standardize analysis/outputs/ |

## Conclusion

The research pipeline provides a comprehensive cardiovascular disease analysis framework with four distinct dataset analyses covering global health indicators and clinical predictors.

**Key Achievements:**
- **4 datasets analyzed** covering 20,000+ patient records from multiple sources (Cleveland, Hungarian, Swiss, Statlog)
- **Standardized analysis workflow**: data quality checks, target distribution, univariate/bivariate analysis, statistical testing
- **Key clinical features examined**: age, cholesterol, blood pressure, heart rate, chest pain type, exercise angina, ST depression
- **Statistical methods**: Chi-square tests, Mann-Whitney U tests, correlation analysis, effect size calculations
- **Visualization outputs**: histograms, box plots, correlation heatmaps, bar charts for categorical distributions
- **Google Colab integration**: scripts linked to interactive notebooks for reproducibility

**Datasets Summary:**
| Dataset | Records | Features | Target Variable |
|---------|---------|----------|-----------------|
| Heart Attack Prediction | 8,763 | 26 | Heart Attack Risk (binary) |
| Heart Disease Research | 10,000 | 20 | Heart Disease Status (Yes/No) |
| Heart Disease UCI | ~920 | 14 | Multi-class heart disease |
| Statlog Combined | 1,190 | 11 | Heart disease (binary) |

This implementation supports evidence-based insights for the CVD knowledge base with transparent, reproducible analysis.