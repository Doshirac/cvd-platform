export interface RiskFactor {
  code: string;
  name: string;
  definition: string;
}

export interface Symptom {
  code: string;
  term: string;
  category: string;
}

export interface DiseaseSymptomDTO {
  code: string | null;
  name: string;
  priority: 'primary' | 'secondary';
}

export interface DiseaseRiskDTO {
  code: string | null;
  name: string;
}

export interface Disease {
  id: number;
  code: string;
  name: string;
  description: string;
  prevention: string;
  symptoms: DiseaseSymptomDTO[];
  risks: DiseaseRiskDTO[];
}

export interface DiseasesState {
  items: Disease[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  symptomList: Symptom[];
  riskFactors: RiskFactor[];
}
