export interface Source {
  id: number;
  name: string;
  link: string;
  description?: string;
  organization?: string;
}

export interface SourcesState {
  items: Source[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}
