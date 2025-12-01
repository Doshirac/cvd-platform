import { PrismaClient, Prisma } from "@prisma/client";
import {
  PaginationParams,
  DiseaseFilterParams,
  Disease,
  IDiseaseRepository,
  RiskFactorDTO,
  SymptomDTO,
} from "./disease.interfaces";

export class DiseaseRepository implements IDiseaseRepository {
  private prisma = new PrismaClient();

  public async findAll(params: {
    pagination: PaginationParams;
    filter: DiseaseFilterParams;
    language: string;
  }): Promise<Disease[]> {
    const { pagination, filter, language } = params;

    const where: Prisma.DiseaseWhereInput = {};

    if (filter.symptom) {
      where.symptoms = {
        some: {
          symptom: {
            OR: [
              {
                term: {
                  equals: filter.symptom,
                  mode: "insensitive",
                },
              },
              {
                code: {
                  equals: filter.symptom,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
      };
    }

    if (filter.riskFactor) {
      where.risks = {
        some: {
          riskFactor: {
            OR: [
              {
                name: {
                  equals: filter.riskFactor,
                  mode: "insensitive",
                },
              },
              {
                code: {
                  equals: filter.riskFactor,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
      };
    }

    if (filter.search) {
      const q = filter.search;

      const orClauses: Prisma.DiseaseWhereInput[] = [
        { name: { contains: q, mode: "insensitive" } },
        { code: { contains: q, mode: "insensitive" } },
        { prevention: { contains: q, mode: "insensitive" } },
        {
          symptoms: {
            some: {
              symptom: {
                OR: [{ term: { contains: q, mode: "insensitive" } }, { code: { contains: q, mode: "insensitive" } }],
              },
            },
          },
        },
        {
          risks: {
            some: {
              riskFactor: {
                OR: [{ name: { contains: q, mode: "insensitive" } }, { code: { contains: q, mode: "insensitive" } }],
              },
            },
          },
        },
      ];

      if (language === "ru") {
        orClauses.push(
          {
            translations: {
              some: {
                locale: "ru",
                name: { contains: q, mode: "insensitive" },
              },
            },
          },
          {
            translations: {
              some: {
                locale: "ru",
                description: { contains: q, mode: "insensitive" },
              },
            },
          },
          {
            translations: {
              some: {
                locale: "ru",
                prevention: { contains: q, mode: "insensitive" },
              },
            },
          },
        );
      }

      where.AND = [{ OR: orClauses }];
    }

    const diseases = await this.prisma.disease.findMany({
      where,
      skip: pagination.skip,
      take: pagination.take,
      include: {
        symptoms: { include: { symptom: true } },
        risks: { include: { riskFactor: true } },
        translations: language === "ru" ? true : false,
      },
    });

    return diseases.map((disease) => ({
      id: disease.id,
      code: disease.code,
      name: language === "ru" && disease.translations?.[0]?.name ? disease.translations[0].name : disease.name,
      description: (language === "ru" && disease.translations?.[0]?.description) || undefined,
      prevention: (language === "ru" && disease.translations?.[0]?.prevention) || undefined,
      symptoms: disease.symptoms.map((s) => s.symptom.term),
      risks: disease.risks.map((r) => r.riskFactor.name),
    }));
  }

  public async findAllRiskFactors(language: string): Promise<RiskFactorDTO[]> {
    const factors = await this.prisma.riskFactor.findMany({
      orderBy: { name: "asc" },
      include: {
        translations: language === "ru" ? true : false,
      },
    });

    return factors.map((f) => ({
      code: f.code,
      name: language === "ru" && f.translations?.[0]?.name ? f.translations[0].name! : f.name,
      definition: (language === "ru" && f.translations?.[0]?.definition) || f.definition || null,
    }));
  }

  public async findAllSymptoms(language: string): Promise<SymptomDTO[]> {
    const symptoms = await this.prisma.symptom.findMany({
      orderBy: { term: "asc" },
      include: {
        translations: language === "ru" ? true : false,
      },
    });

    return symptoms.map((s) => ({
      code: s.code,
      term: language === "ru" && s.translations?.[0]?.term ? s.translations[0].term : s.term,
      category: s.category,
    }));
  }
}
