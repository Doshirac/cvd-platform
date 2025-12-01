export interface IDiseaseService {
  findAll(params: { pagination: PaginationParams; filter: DiseaseFilterParams; language: string }): Promise<Disease[]>;

  findAllRiskFactors(language: string): Promise<RiskFactorDTO[]>;
  findAllSymptoms(language: string): Promise<SymptomDTO[]>;
}

export interface PaginationParams {
  skip: number;
  take: number;
}

export interface DiseaseFilterParams {
  symptom?: string;
  riskFactor?: string;
  search?: string;
}

export interface Disease {
  id: number;
  code: string;
  name: string;
  description?: string;
  prevention?: string;
  symptoms: string[];
  risks: string[];
}

export interface RiskFactorDTO {
  code?: string | null;
  name: string;
  definition?: string | null;
}

export interface SymptomDTO {
  code?: string | null;
  term: string;
  category?: "sign" | "symptom" | null;
}

export interface IDiseaseRepository {
  findAll(params: { pagination: PaginationParams; filter: DiseaseFilterParams; language: string }): Promise<Disease[]>;
  findAllRiskFactors(language: string): Promise<RiskFactorDTO[]>;
  findAllSymptoms(language: string): Promise<SymptomDTO[]>;
}
