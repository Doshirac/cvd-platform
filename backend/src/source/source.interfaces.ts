export interface ISourceService {
  findAll(params: { pagination: SourcePaginationParams; search?: string }): Promise<SourceDTO[]>;
}

export interface SourcePaginationParams {
  skip: number;
  take: number;
}

export interface SourceDTO {
  id: number;
  name: string;
  description?: string;
  organization?: string;
  link: string;
}
