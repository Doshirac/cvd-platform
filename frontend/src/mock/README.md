# Mock Database Served From Local File

## Setup

Mock server is working with `json-server` package.
To start server run the script in the root directory `npm run start:mock`.
By default it is configured to run on port **4000**.

## Usage

Current setup consists of these endpoints:

- `/diseases` — Retrieves all diseases
- `/riskFactors` — Retrieves all risk factors
- `/symptoms` — Retrieves all symptoms
- `/sources` — Retrieves all sources

## Mock Schema

Example schemas:

**diseases.json**
```
{
  "id": 1,
  "code": "IHD",
  "name": "Ischaemic Heart Disease",
  "description": "Coronary atherosclerosis → decreased myocardial blood flow.",
  "prevention": "Stop smoking, control BP/LDL, exercise, diet.",
  "symptoms": ["S001", "S002"],
  "risks": ["R001", "R002"]
}
```

**riskFactors.json**
```
{
  "id": 1,
  "code": "R001",
  "name": "Hypertension",
  "definition": "High blood pressure increases risk of CVD."
}
```

**symptoms.json**
```
{
  "id": 1,
  "code": "S001",
  "term": "Chest pain",
  "category": "symptom"
}
```

**sources.json**
```
{
  "id": 1,
  "name": "World Health Organization",
  "link": "https://www.who.int/"
}
```
