import { SourceService } from "../../src/source/source.service";
import { SourceRepository } from "../../src/source/source.repository";
import { SourceDTO } from "../../src/source/source.interfaces";

jest.mock("../../src/source/source.cache", () => ({
  getCachedSources: jest.fn().mockResolvedValue(null),
  setCachedSources: jest.fn().mockResolvedValue(undefined),
}));

describe("SourceService", () => {
  let repo: jest.Mocked<SourceRepository>;
  let service: SourceService;

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
    } as unknown as jest.Mocked<SourceRepository>;

    service = new SourceService(repo);
  });

  it("delegates findAll to repository with same params", async () => {
    const params = {
      pagination: { skip: 0, take: 10 },
      search: "cardio",
    };

    const sources: SourceDTO[] = [
      { id: 1, name: "WHO", link: "https://who.int" },
    ];

    repo.findAll.mockResolvedValue(sources);

    const result = await service.findAll(params);

    expect(repo.findAll).toHaveBeenCalledWith(params);
    expect(result).toEqual(sources);
  });

  it("works without search param", async () => {
    const params = {
      pagination: { skip: 10, take: 5 },
    };

    repo.findAll.mockResolvedValue([]);

    const result = await service.findAll(params);

    expect(repo.findAll).toHaveBeenCalledWith(params);
    expect(result).toEqual([]);
  });
});
