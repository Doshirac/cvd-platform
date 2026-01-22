export interface Research {
  id: number;
  title: string;
  description: string;
  category: 'analysis' | 'visualization' | 'prediction' | 'dataset';
  methodology?: string;
  findings?: string[];
  tools?: string[];
  dataset?: string;
  accuracy?: number;
  samples?: number;
  features?: number;
  imageUrl?: string;
  date: string;
}

export interface ResearchCardProps {
  research: Research;
  onViewDetails?: (research: Research) => void;
  className?: string;
}

export interface ResearchModalProps {
  research: Research | null;
  isOpen: boolean;
  onClose: () => void;
}
