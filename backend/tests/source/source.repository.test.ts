import { PrismaClient } from "@prisma/client";
import { SourceRepository } from "../../src/source/source.repository";

jest.mock("@prisma/client", () => {
  const mPrisma = {
    source: {
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

describe("SourceRepository", () => {
  let repo: SourceRepository;
  let prismaMock: jest.Mocked<PrismaClient> & {
    source: { findMany: jest.Mock };
  };

  beforeEach(() => {
    repo = new SourceRepository();
    prismaMock = (new (PrismaClient as any)() as unknown) as typeof prismaMock;
    prismaMock.source.findMany.mockReset();
  });

  it("returns paginated sources without search", async () => {
    prismaMock.source.findMany.mockResolvedValue([
      { id: 1, name: "WHO", link: "https://who.int" },
    ]);

    const result = await repo.findAll({
      pagination: { skip: 0, take: 10 },
    });

    expect(prismaMock.source.findMany).toHaveBeenCalledWith({
      where: {},
      skip: 0,
      take: 10,
      orderBy: { name: "asc" },
    });

    expect(result).toEqual([
      { id: 1, name: "WHO", link: "https://who.int" },
    ]);
  });

  it("applies search filter", async () => {
    prismaMock.source.findMany.mockResolvedValue([]);

    await repo.findAll({
      pagination: { skip: 5, take: 5 },
      search: "cardio",
    });

    expect(prismaMock.source.findMany).toHaveBeenCalledWith({
      where: {
        OR: [{ name: { contains: "cardio", mode: "insensitive" } }],
      },
      skip: 5,
      take: 5,
      orderBy: { name: "asc" },
    });
  });
});
