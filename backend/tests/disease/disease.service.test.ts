import { DiseaseService } from "../../src/disease/disease.service";
import { DiseaseRepository } from "../../src/disease/disease.repository";

jest.mock("../../src/disease/disease.cache", () => ({
  getCachedDiseases: jest.fn().mockResolvedValue(null),
  setCachedDiseases: jest.fn().mockResolvedValue(undefined),
  getCachedDiseasesByLetter: jest.fn().mockResolvedValue(null),
  setCachedDiseasesByLetter: jest.fn().mockResolvedValue(undefined),
}));

describe("DiseaseService", () => {
  let repo: jest.Mocked<DiseaseRepository>;
  let service: DiseaseService;

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findAllSymptoms: jest.fn(),
      findAllRiskFactors: jest.fn(),
    } as unknown as jest.Mocked<DiseaseRepository>;

    service = new DiseaseService(repo);
  });

  it("delegates findAll to repository", async () => {
    repo.findAll.mockResolvedValue([]);

    await service.findAll({
      pagination: { skip: 0, take: 6 },
      filter: {},
      language: "en",
    });

    expect(repo.findAll).toHaveBeenCalledTimes(1);
  });

  it("delegates findByAlphabet to repository", async () => {
    repo.findAll.mockResolvedValue([]);
    repo.findByAlphabet = jest.fn();
    repo.findByAlphabet.mockResolvedValue([]);

    await service.findByAlphabet({ pagination: { skip: 0, take: 6 }, filter: { letter: "A" }, language: "en" });

    expect(repo.findByAlphabet).toHaveBeenCalledTimes(1);
  });

  it("returns cached data for findByAlphabet when cache is present", async () => {
    const cached = [{ id: 1, code: "I10", name: "Hypertension", symptoms: [], risks: [] }];
    // @ts-ignore
    const cacheModule = require("../../src/disease/disease.cache");
    cacheModule.getCachedDiseasesByLetter.mockResolvedValue(cached);

    // @ts-ignore
    repo.findByAlphabet = jest.fn();

    const res = await service.findByAlphabet({ pagination: { skip: 0, take: 6 }, filter: { letter: "H" }, language: "en" });

    expect(res).toBe(cached);
    // @ts-ignore
    expect(repo.findByAlphabet).not.toHaveBeenCalled();
  });

  it("getAlphabetLetters delegates to repository", async () => {
    // alphabet listing removed
  });

  it("findAllSymptoms delegates correctly with language", async () => {
    repo.findAllSymptoms.mockResolvedValue([]);

    await service.findAllSymptoms("ru");

    expect(repo.findAllSymptoms).toHaveBeenCalledWith("ru");
  });

  it("findAllRiskFactors delegates correctly with language", async () => {
    repo.findAllRiskFactors.mockResolvedValue([]);

    await service.findAllRiskFactors("en");

    expect(repo.findAllRiskFactors).toHaveBeenCalledWith("en");
  });
});
