import type { FilterPanelProps } from '@shared/ui/FilterPanel/FilterPanel.types';

export interface FilterModalProps extends FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}
