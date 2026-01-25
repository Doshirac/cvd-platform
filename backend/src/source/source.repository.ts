import { PrismaClient, Prisma } from "@prisma/client";
import { SourceDTO, SourcePaginationParams } from "./source.interfaces";

export class SourceRepository {
  private prisma = new PrismaClient();

  public async findAll(params: { pagination: SourcePaginationParams; search?: string }): Promise<SourceDTO[]> {
    const { pagination, search } = params;

    const where: Prisma.SourceWhereInput = {};

    if (search) {
      const q = search;
      where.OR = [{ name: { contains: q, mode: "insensitive" } }];
    }

    const sources = await this.prisma.source.findMany({
      where,
      skip: pagination.skip,
      take: pagination.take,
      orderBy: { name: "asc" },
    });

    return sources.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description ?? undefined,
      organization: s.organization ?? undefined,
      link: s.link,
    }));
  }
}
