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
        symptoms: { 
          include: { 
            symptom: {
              include: {
                translations: language === "ru" ? { where: { locale: "ru" } } : false,
              },
            },
          },
        },
        risks: { 
          include: { 
            riskFactor: {
              include: {
                translations: language === "ru" ? { where: { locale: "ru" } } : false,
              },
            },
          },
        },
        translations: language === "ru" ? { where: { locale: "ru" } } : false,
      },
    });

    return diseases.map((disease) => ({
      id: disease.id,
      code: disease.code,
      name: language === "ru" && disease.translations?.[0]?.name ? disease.translations[0].name : disease.name,
      description: language === "ru" && disease.translations?.[0]?.description 
        ? disease.translations[0].description 
        : disease.description || undefined,
      prevention: language === "ru" && disease.translations?.[0]?.prevention 
        ? disease.translations[0].prevention 
        : disease.prevention || undefined,
      symptoms: disease.symptoms.map((s) => ({
        code: s.symptom.code,
        name: language === "ru" && (s.symptom as any).translations?.[0]?.term 
          ? (s.symptom as any).translations[0].term 
          : s.symptom.term,
        priority: s.priority,
      })),
      risks: disease.risks.map((r) => ({
        code: r.riskFactor.code,
        name: language === "ru" && (r.riskFactor as any).translations?.[0]?.name 
          ? (r.riskFactor as any).translations[0].name 
          : r.riskFactor.name,
      })),
    }));
  }

  public async findByAlphabet(params: {
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

    if (filter.letter) {
      const l = filter.letter;
      where.AND = where.AND ?? [];
      (where.AND as Prisma.DiseaseWhereInput[]).push({
        OR: [
          { name: { startsWith: l, mode: "insensitive" } },
          {
            translations: {
              some: {
                locale: language === "ru" ? "ru" : "en",
                name: { startsWith: l, mode: "insensitive" },
              },
            },
          },
        ],
      });
    }

    const diseases = await this.prisma.disease.findMany({
      where,
      skip: pagination.skip,
      take: pagination.take,
      include: {
        symptoms: { 
          include: { 
            symptom: {
              include: {
                translations: language === "ru" ? { where: { locale: "ru" } } : false,
              },
            },
          },
        },
        risks: { 
          include: { 
            riskFactor: {
              include: {
                translations: language === "ru" ? { where: { locale: "ru" } } : false,
              },
            },
          },
        },
        translations: language === "ru" ? { where: { locale: "ru" } } : false,
      },
    });

    return diseases.map((disease) => ({
      id: disease.id,
      code: disease.code,
      name: language === "ru" && disease.translations?.[0]?.name ? disease.translations[0].name : disease.name,
      description: language === "ru" && disease.translations?.[0]?.description 
        ? disease.translations[0].description 
        : disease.description || undefined,
      prevention: language === "ru" && disease.translations?.[0]?.prevention 
        ? disease.translations[0].prevention 
        : disease.prevention || undefined,
      symptoms: disease.symptoms.map((s) => ({
        code: s.symptom.code,
        name: language === "ru" && (s.symptom as any).translations?.[0]?.term 
          ? (s.symptom as any).translations[0].term 
          : s.symptom.term,
        priority: s.priority,
      })),
      risks: disease.risks.map((r) => ({
        code: r.riskFactor.code,
        name: language === "ru" && (r.riskFactor as any).translations?.[0]?.name 
          ? (r.riskFactor as any).translations[0].name 
          : r.riskFactor.name,
      })),
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
