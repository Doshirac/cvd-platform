export interface InfinityScrollProps<T> {
  fetchPage: (page: number) => Promise<T[]>;
  renderItem: (item: T, onRowResize: () => void, measure: () => void) => React.ReactNode;
  itemsPerPage?: number;
  itemHeight?: number;
  listHeight?: number;
  buttonLabel?: string;
}
