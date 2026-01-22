export interface InfinityScrollProps<T> {
  fetchPage: (page: number) => Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
  itemsPerPage?: number;
  buttonLabel?: string;
  gridColumns?: number;
}
