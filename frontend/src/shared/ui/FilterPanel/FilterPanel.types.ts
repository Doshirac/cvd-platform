export interface FilterOption {
  code: string;
  label: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface FilterPanelProps {
  filterGroups: FilterGroup[];
  selectedValues: Record<string, string[]>;
  onFilterChange: (groupId: string, values: string[]) => void;
  onReset?: () => void;
  className?: string;
}
