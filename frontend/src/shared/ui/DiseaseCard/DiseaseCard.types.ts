import type { Disease } from '@shared/api/diseases/diseases.types';

export interface DiseaseCardProps {
  disease: Disease;
  onRowResize?: () => void;
  measure?: () => void;
  className?: string;
}
