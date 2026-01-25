import {
  FileQuestion,
  FileText,
  Home,
  Filter,
  Search,
  Heart,
  Activity,
  Stethoscope,
  Syringe,
  Pill,
  Thermometer,
  HeartPulse,
  Cross,
  AlertCircle,
  ChevronDown,
  Moon,
  Sun,
  Globe,
  ExternalLink,
  Building2,
  BookOpen,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleIcon,
  Minus,
  MoreHorizontalIcon,
  GripVerticalIcon,
  PanelLeftIcon,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  X,
  Check,
  Menu,
} from 'lucide-react';

export const iconMap = {
  // Navigation
  HOME: Home,
  MENU: Menu,
  PANEL_LEFT: PanelLeftIcon,

  // Arrows / chevrons
  ARROW_LEFT: ArrowLeft,
  ARROW_RIGHT: ArrowRight,
  ARROW_UP: ArrowUp,
  ARROW_DOWN: ArrowDown,
  CHEVRON_LEFT: ChevronLeftIcon,
  CHEVRON_RIGHT: ChevronRightIcon,
  CHEVRON_DOWN: ChevronDown,

  // Actions
  SEARCH: Search,
  FILTER: Filter,
  MORE_ICON: MoreHorizontalIcon,
  CLOSE: X,
  CHECK: Check,
  MINUS: Minus,

  // Status / info
  INFO: AlertCircle,
  QUESTION: FileQuestion,
  FILE_TEXT: FileText,
  EXTERNAL_LINK: ExternalLink,
  GLOBE: Globe,
  BOOK_OPEN: BookOpen,

  // Health / domain-specific
  HEART: Heart,
  HEART_PULSE: HeartPulse,
  ACTIVITY: Activity,
  STETHOSCOPE: Stethoscope,
  SYRINGE: Syringe,
  PILL: Pill,
  THERMOMETER: Thermometer,
  CROSS: Cross,

  // UI / misc
  BUILDING: Building2,
  GRIP_VERTICAL: GripVerticalIcon,
  CIRCLE: CircleIcon,

  // Theme
  SUN: Sun,
  MOON: Moon,
} as const;

export type IconName = keyof typeof iconMap;

export const iconSizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export type IconSize = (typeof iconSizes)[keyof typeof iconSizes];

export const iconColors = {
  PRIMARY: 'primary',
  MUTED: 'muted',
  SUCCESS: 'success',
  DANGER: 'danger',
  WHITE: 'white',
  INHERIT: 'inherit',
} as const;

export type IconColor = (typeof iconColors)[keyof typeof iconColors];
