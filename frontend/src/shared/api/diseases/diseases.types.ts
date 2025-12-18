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

export interface Disease {
  id: number;
  code: string;
  name: string;
  description: string;
  prevention: string;
  symptoms: string[];
  risks: string[];
}

export interface DiseasesState {
  items: Disease[];
  loading: boolean;
  error: string | null;
  skip?: number;
  take?: number;
  symptom?: string;
  riskFactor?: string;
  search?: string;
  locale?: string;
  symptomList: Symptom[]; // Added to match diseasesSlice
  riskFactors: RiskFactor[]; // Added to match diseasesSlice
}
