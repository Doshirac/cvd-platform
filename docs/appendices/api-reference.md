# API Reference

## Overview

Base URL: `http://localhost:4000/api`

## Endpoints

### Check API health

#### GET /health

Verify that the API service is running.

**Request:**
```http
GET /api/health
```

**Response:**
```json
{}
```

| Status Code | Description |
|-------------|-------------|
| 204 | No Content |

---

#### GET /health/details

Get detailed health information.

**Request:**
```http
GET /api/health/details
```

**Response:**
```json

{​
  "status": "text",​
  "timestamp": "text",​
  "uptime": 1,​
  "environment": "text",​
  "system": {​
    "platform": "text",​
    "nodeVersion": "text",​
    "memory": {​
      "total": "text",​
      "free": "text",​
      "usage": "text"​
    },​
    "cpu": "text",​
    "cores": 1​
  }​
​}
```

| Status Code | Description |
|-------------|-------------|
| 200 | Success |

---

### Retrieve the diseases

#### GET /diseases

Retrieve diseases with pagination and filtering.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| skip | integer | No | Number of records to skip (default: 0, min: 0) |
| take | integer | No | Number of records to take (default: 6, min: 1, max: 100) |
| symptom | string | No | Filter by symptom (term or SNOMED code) |
| riskFactor | string | No | Filter by risk factor (name or code) |
| search | string | No | Free text search across diseases, symptoms, risk factors |
| locale | string | No | Language locale ("en" or "ru", default: "en") |

**Response (200):**

Returns either:

- an array of Disease objects (when results exist), or
- an object with a message (when no diseases are found).

**Disease object:**

| Field | Type | Description |
|-------|------|-------------|
| id | number | Disease identifier |
| code | string | ICD-10 code |
| name | string | Disease name |
| description | string | Detailed description |
| prevention | string | Prevention recommendations |
| symptoms | string[] | List of symptoms |
| risks | string[] | List of risk factors |

**Request:**
```http
GET /api/diseases?skip=0&take=6&search=coronary&locale=en
```

**Response (example):**
```json
[
  {
    "id": 1,
    "code": "CAD",
    "name": "Coronary Artery Disease",
    "description": "A condition where the coronary arteries become narrowed or blocked",
    "prevention": "Regular exercise, healthy diet, quit smoking",
    "symptoms": [
      "chest pain",
      "shortness of breath",
      "fatigue"
    ],
    "risks": [
      "smoking",
      "high cholesterol",
      "diabetes"
    ]
  }
]
```

**Response (example — no diseases found):**
```json
{
  "message": "No disease found."
}
```

| Status Code | Description |
|-------------|-------------|
| 200 | List of diseases |
| 400 | Invalid query parameters |
| 500 | Internal server error |

---

#### GET /diseases/risk-factors

Get all risk factors with codes.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| locale | string | No | Language locale ("en" or "ru", default: "en") |

**Response (200):**

Returns an array of Risk Factor objects.

**Risk Factor object:**

| Field | Type | Description |
|-------|------|-------------|
| code | string | Risk factor code |
| name | string | Risk factor name |
| definition | string | Risk factor definition |

**Request:**
```http
GET /api/diseases/risk-factors?locale=en
```

**Response (example):**
```json
[
  {
    "code": "SM",
    "name": "Smoking",
    "definition": "Tobacco use including cigarettes, cigars, and pipes"
  },
  {
    "code": "HG",
    "name": "High cholesterol",
    "definition": "Elevated levels of cholesterol in the blood"
  }
]
```

| Status Code | Description |
|-------------|-------------|
| 200 | List of risk factors |
| 500 | Internal server error |

---

#### GET /diseases/by-letter

Retrieve diseases by initial letter (locale-aware).

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| letter | string | No | Initial letter to filter by (single character) |
| skip | integer | No | Number of records to skip (default: 0) |
| take | integer | No | Number of records to take (default: 6) |
| locale | string | No | Language locale ("en" or "ru", default: "en") |

**Request:**
```http
GET /api/diseases/by-letter?letter=C&skip=0&take=6&locale=en
```

**Response (200):**

Returns either:

- an array of Disease objects (when results exist), or
- an object with a message (when no diseases are found).

**Response (example — no diseases found):**
```json
{
  "message": "No disease found."
}
```

| Status Code | Description |
|-------------|-------------|
| 200 | List of diseases |
| 400 | Invalid query parameters |
| 500 | Internal server error |

---

### Sources

#### GET /sources

Get sources with pagination and optional search.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| skip | integer | No | Number of records to skip (default: 0, min: 0) |
| take | integer | No | Number of records to take (default: 6, min: 1, max: 100) |
| search | string | No | Search by source / organization name |

**Response (200):**

Returns either:

- an array of Source DTO objects (when results exist), or
- an object with a message (when no sources are found).

**Source DTO object:**

| Field | Type | Description |
|-------|------|-------------|
| id | number | Source identifier |
| name | string | Source / organization name |
| link | string | URL to the data source |

**Request:**
```http
GET /api/sources?skip=0&take=6&search=world
```

**Response (example):**
```json
[
  {
    "id": 1,
    "name": "World Health Organization",
    "link": "https://www.who.int"
  },
  {
    "id": 2,
    "name": "American Heart Association",
    "link": "https://www.heart.org"
  }
]
```

**Response (example — no sources found):**
```json
{
  "message": "No source found."
}
```

**Response (400 example — invalid skip):**
```json
{
  "success": false,
  "message": "Parameter 'skip' must be a non-negative integer"
}
```

**Response (400 example — invalid take):**
```json
{
  "success": false,
  "message": "Parameter 'take' must be between 1 and 100"
}
```

| Status Code | Description |
|-------------|-------------|
| 200 | List of sources |
| 400 | Invalid query parameters |
| 500 | Internal server error |

## Error Responses

All errors are returned in a consistent JSON format.

**Error response format (from the global error middleware):**
```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": ["Optional validation errors"],
  "stack": "Optional stack trace (development only)"
}
```

**Status codes and default messages (from `createApiError`):**

| Status Code | Default message | When it happens |
|-------------|------------------|-----------------|
| 400 | Bad Request | Invalid query/body parameters, failed validation |
| 401 | Unauthorized | Missing/invalid authentication (if enabled for the route) |
| 403 | Forbidden | Authenticated but not allowed (if enabled for the route) |
| 404 | Not Found | Resource not found (can also be returned by the not-found middleware as `Resource not found: <url>`) |
| 405 | Method Not Allowed | HTTP method not supported for the endpoint |
| 409 | Conflict | Conflict with existing state (e.g., duplicate resource) |
| 500 | Internal Server Error | Unhandled server error |

## Swagger/OpenAPI

Full API documentation available at: `https://app.gitbook.com/invite/YJjvuHTqbLlvmjZEzQci/J36lOoZ1hCDc4L4xnq64`
