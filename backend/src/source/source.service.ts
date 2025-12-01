import { injectable, inject } from "inversify";
import { ISourceService, SourceDTO, SourcePaginationParams } from "./source.interfaces";
import { getCachedSources, setCachedSources } from "./source.cache";
import { SourceRepository } from "./source.repository";
import { types } from "../types";

@injectable()
export class SourceService implements ISourceService {
  constructor(
    @inject(types.SourceRepository)
    private readonly sourceRepository: SourceRepository,
  ) {}

  public async findAll(params: { pagination: SourcePaginationParams; search?: string }): Promise<SourceDTO[]> {
    const { pagination, search } = params;

    const cached = await getCachedSources(pagination, search);
    if (cached) {
      return cached;
    }

    const sources = await this.sourceRepository.findAll({ pagination, search });

    if (sources.length) {
      await setCachedSources(pagination, search, sources);
    }

    return sources;
  }
}
