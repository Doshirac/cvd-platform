export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabPanelProps {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}
