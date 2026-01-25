export interface ResearchHypothesis {
  hypothesis: string;
  hypothesisRu: string;
  why?: string;
  whyRu?: string;
  result: string;
  resultRu: string;
}

export interface ResearchDataset {
  file: string;
  samples: number | string;
  features: number;
  target?: string;
  targetRu?: string;
}

export interface CorrelationMatrix {
  columns: string[];
  data: number[][];
}

export interface TopCorrelation {
  feature: string;
  r: number;
}

export interface ResearchCorrelation {
  numericMatrix?: CorrelationMatrix;
  encodedMatrix?: CorrelationMatrix;
  matrix?: CorrelationMatrix;
  topWithTarget?: TopCorrelation[];
  note?: string;
  noteRu?: string;
  encodingNote?: string;
  encodingNoteRu?: string;
}

export interface ResearchReferenceTo {
  baseResearchId: number;
  baseResearchId2?: number;
}

export interface Research {
  id: number;
  title: string;
  titleRu?: string;
  description: string;
  descriptionRu?: string;
  category: 'analysis' | 'visualization' | 'prediction' | 'dataset';
  why?: {
    en: string;
    ru: string;
  };
  methodology?: string;
  methodologyRu?: string;
  findings?: string[];
  findingsRu?: string[];
  tools?: string[];
  statisticalMethods?: string[];
  dataset?: ResearchDataset;
  analyzedFeatures?: string[];
  analyzedFeaturesRu?: string[];
  hypotheses?: ResearchHypothesis[];
  conclusions?: string[];
  conclusionsRu?: string[];
  outcomes?: {
    en: string[];
    ru: string[];
  };
  correlation?: ResearchCorrelation;
  referenceTo?: ResearchReferenceTo;
  colabLink?: string;
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
