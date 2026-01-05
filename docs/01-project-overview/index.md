# 1. Project Overview

This section covers the business context, goals, and requirements for the project.

## Contents

- [Original Documentation](https://docs.google.com/document/d/16HgcMeCpzlgXRnMC0qnYaDRJgjW5C23t4mRRlL0OgsI/edit?usp=sharing)
- [Problem Statement & Goals](problem-and-goals.md)
- [Stakeholders & Users](stakeholders.md)
- [Scope](scope.md)
- [Features](features.md)

## Executive Summary

This thesis project delivers a web platform that consolidates fragmented cardiovascular disease (CVD) information into a standardized, referenced disease library with clear separation of primary symptoms and secondary (risk/prevention-related) factors. It is intended for clinicians, medical educators, public-health analysts, and informed readers who need fast access to structured content and transparent sources without any personal data processing. The platform combines a React frontend with a Node.js (Express) API and PostgreSQL (Prisma) database, and supports bilingual UI (EN/RU), full-text search, filtering, and a dedicated references area. The expected outcome is an MVP with ≥25 published CVD cards, ≥2 official datasets integrated with source/last-updated provenance, and OpenAPI documentation for core backend endpoints.

## Key Highlights

| Aspect | Description |
|--------|-------------|
| **Problem** | CVD knowledge is fragmented, inconsistently structured, and often lacks clear symptom vs. factor separation and source transparency. |
| **Solution** | A standardized, referenced CVD library with search/filters, bilingual UI, and a references/research area built on an API-first architecture. |
| **Target Users** | Clinicians & medical students, medical educators/researchers, public-health analysts, and informed readers. |
| **Key Features** | Disease library (≥25 cards), EN/RU localization, full-text search + filters, references page with provenance (source + last updated), view-only research cards. |
| **Tech Stack** | React + Vite (frontend), Node.js + Express + OpenAPI (backend), PostgreSQL + Prisma (DB), Docker Compose, Python analytics tooling (ETL/analysis scripts). |
