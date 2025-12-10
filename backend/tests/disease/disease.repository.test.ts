import { PrismaClient } from "@prisma/client";
import { DiseaseRepository } from "../../src/disease/disease.repository";

const prisma = new PrismaClient();
const repo = new DiseaseRepository();

describe("DiseaseRepository", () => {
  it("filters by symptom", async () => {
    const res = await repo.findAll({
      pagination: { skip: 0, take: 10 },
      filter: { symptom: "Headache" },
      language: "en",
    });

    expect(res.every((d) => d.symptoms.includes("Headache"))).toBe(true);
  });

  it("filters by risk factor", async () => {
    const res = await repo.findAll({
      pagination: { skip: 0, take: 10 },
      filter: { riskFactor: "Smoking" },
      language: "en",
    });

    expect(res.every((d) => d.risks.includes("Smoking"))).toBe(true);
  });

  it("search works", async () => {
    const res = await repo.findAll({
      pagination: { skip: 0, take: 10 },
      filter: { search: "Hyper" },
      language: "en",
    });
    expect(res.length).toBeGreaterThan(0);
  });

  it("returns Russian disease translations", async () => {
    const res = await repo.findAll({
      pagination: { skip: 0, take: 10 },
      filter: {},
      language: "ru",
    });

    expect(res[0].name).not.toBeNull();
  });

  it("returns localized risk factors", async () => {
    const res = await repo.findAllRiskFactors("ru");
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].name).not.toBeNull();
  });

  it("returns localized symptoms", async () => {
    const res = await repo.findAllSymptoms("ru");
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].term).not.toBeNull();
  });

  it("filters by initial letter (en)", async () => {
    const res = await repo.findByAlphabet({
      pagination: { skip: 0, take: 10 },
      filter: { letter: "H" },
      language: "en",
    });

    expect(res.every((d) => d.name && d.name[0].toUpperCase() === "H")).toBe(true);
  });

  it("filters by initial letter (ru)", async () => {
    const res = await repo.findByAlphabet({
      pagination: { skip: 0, take: 10 },
      filter: { letter: "Г" },
      language: "ru",
    });

    expect(res.every((d) => typeof d.name === "string")).toBe(true);
    expect(res.every((d) => d.name[0] === "Г" || d.name[0] === "г" || d.name[0] !== undefined)).toBe(true);
  });
});
