export interface Source {
  id: number;
  name: string;
  link: string;
}

export interface SourcesState {
  items: Source[];
  loading: boolean;
  error: string | null;
  skip?: number;
  take?: number;
  search?: string;
}
