-- EN
CREATE OR REPLACE VIEW v_disease_card_en AS
SELECT
  d.disease_id                            AS id,
  d.code,
  COALESCE(d.name, dt.name)               AS name,
  COALESCE(d.description, dt.description) AS description,
  COALESCE(d.prevention, dt.prevention)   AS prevention,
  COALESCE(sym.symptoms, '[]'::json)      AS symptoms,
  COALESCE(rsk.risks,     '[]'::json)     AS risks
FROM "diseases" d
LEFT JOIN "disease_translation" dt
  ON dt.disease_id = d.disease_id AND dt.locale = 'en'

-- symptoms
LEFT JOIN LATERAL (
  SELECT json_agg(x.obj ORDER BY x.term) AS symptoms
  FROM (
    SELECT DISTINCT ON (s."symptom_id")
      COALESCE(s.term, st.term) AS term,
      jsonb_build_object(
        'term',       COALESCE(s.term, st.term),
        'priority',   ds.priority,
        'typicality', ds.typicality
      ) AS obj
    FROM "DiseaseSymptom" ds
    JOIN "Symptom" s
      ON s."symptom_id" = ds."symptom_id"
    LEFT JOIN "symptom_translation" st
      ON st."symptom_id" = s."symptom_id" AND st.locale = 'en'
    WHERE ds."disease_id" = d.disease_id
    ORDER BY s."symptom_id", term
  ) x
) sym ON TRUE

-- risk factors
LEFT JOIN LATERAL (
  SELECT json_agg(y.obj ORDER BY y.name) AS risks
  FROM (
    SELECT DISTINCT ON (rf."risk_factor_id")
      COALESCE(rf.name, rft.name) AS name,
      jsonb_build_object(
        'code',      rf.code,
        'name',      COALESCE(rf.name, rft.name),
        'direction', drf.direction
      ) AS obj
    FROM "DiseaseRiskFactor" drf
    JOIN "RiskFactor" rf
      ON rf."risk_factor_id" = drf."risk_factor_id"
    LEFT JOIN "risk_factor_translation" rft
      ON rft."risk_factor_id" = rf."risk_factor_id" AND rft.locale = 'en'
    WHERE drf."disease_id" = d.disease_id
    ORDER BY rf."risk_factor_id", name
  ) y
) rsk ON TRUE;

-- RU
CREATE OR REPLACE VIEW v_disease_card_ru AS
SELECT
  d.disease_id                            AS id,
  d.code,
  COALESCE(dt.name, d.name)               AS name,
  COALESCE(dt.description, d.description) AS description,
  COALESCE(dt.prevention, d.prevention)   AS prevention,
  COALESCE(sym.symptoms, '[]'::json)      AS symptoms,
  COALESCE(rsk.risks,     '[]'::json)     AS risks
FROM "diseases" d
LEFT JOIN "disease_translation" dt
  ON dt.disease_id = d.disease_id AND dt.locale = 'ru'

LEFT JOIN LATERAL (
  SELECT json_agg(x.obj ORDER BY x.term) AS symptoms
  FROM (
    SELECT DISTINCT ON (s."symptom_id")
      COALESCE(st.term, s.term) AS term,
      jsonb_build_object(
        'term',       COALESCE(st.term, s.term),
        'priority',   ds.priority,
        'typicality', ds.typicality
      ) AS obj
    FROM "DiseaseSymptom" ds
    JOIN "Symptom" s
      ON s."symptom_id" = ds."symptom_id"
    LEFT JOIN "symptom_translation" st
      ON st."symptom_id" = s."symptom_id" AND st.locale = 'ru'
    WHERE ds."disease_id" = d.disease_id
    ORDER BY s."symptom_id", term
  ) x
) sym ON TRUE

LEFT JOIN LATERAL (
  SELECT json_agg(y.obj ORDER BY y.name) AS risks
  FROM (
    SELECT DISTINCT ON (rf."risk_factor_id")
      COALESCE(rft.name, rf.name) AS name,
      jsonb_build_object(
        'code',      rf.code,
        'name',      COALESCE(rft.name, rf.name),
        'direction', drf.direction
      ) AS obj
    FROM "DiseaseRiskFactor" drf
    JOIN "RiskFactor" rf
      ON rf."risk_factor_id" = drf."risk_factor_id"
    LEFT JOIN "risk_factor_translation" rft
      ON rft."risk_factor_id" = rf."risk_factor_id" AND rft.locale = 'ru'
    WHERE drf."disease_id" = d.disease_id
    ORDER BY rf."risk_factor_id", name
  ) y
) rsk ON TRUE;
