import { injectable, inject } from "inversify";
import {
  IDiseaseService,
  PaginationParams,
  DiseaseFilterParams,
  Disease,
  RiskFactorDTO,
  SymptomDTO,
} from "./disease.interfaces";
import { DiseaseRepository } from "./disease.repository";
import {
  getCachedDiseases,
  setCachedDiseases,
  getCachedDiseasesByLetter,
  setCachedDiseasesByLetter,
} from "./disease.cache";
import { types } from "../types";

@injectable()
export class DiseaseService implements IDiseaseService {
  constructor(
    @inject(types.DiseaseRepository)
    private readonly diseaseRepository: DiseaseRepository,
  ) {}

  public async findAll(params: {
    pagination: PaginationParams;
    filter: DiseaseFilterParams;
    language: string;
  }): Promise<Disease[]> {
    const { pagination, filter, language } = params;

    const cached = await getCachedDiseases(pagination, filter, language);
    if (cached) {
      return cached;
    }

    const diseases = await this.diseaseRepository.findAll({
      pagination,
      filter,
      language,
    });

    if (diseases.length) {
      await setCachedDiseases(pagination, filter, language, diseases);
    }

    return diseases;
  }

  public async findByAlphabet(params: {
    pagination: PaginationParams;
    filter: DiseaseFilterParams;
    language: string;
  }): Promise<Disease[]> {
    const { pagination, filter, language } = params;

    const letter = filter.letter ?? "";

    const cached = await getCachedDiseasesByLetter(pagination, letter, language);
    if (cached) {
      return cached;
    }

    const diseases = await this.diseaseRepository.findByAlphabet({ pagination, filter, language });

    if (diseases.length) {
      await setCachedDiseasesByLetter(pagination, letter, language, diseases);
    }

    return diseases;
  }

  public async findAllRiskFactors(language: string): Promise<RiskFactorDTO[]> {
    return this.diseaseRepository.findAllRiskFactors(language);
  }

  public async findAllSymptoms(language: string): Promise<SymptomDTO[]> {
    return this.diseaseRepository.findAllSymptoms(language);
  }
}
