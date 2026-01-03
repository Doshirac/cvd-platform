import { useState } from 'react';
import classNames from 'classnames';
import type { TabPanelProps } from './TabPanel.types';
import styles from './TabPanel.module.scss';

export function TabPanel({
  tabs,
  activeTab: externalActiveTab,
  onTabChange,
  className,
}: TabPanelProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(tabs[0]?.id || '');

  const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.tabsList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={classNames(styles.tabTrigger, {
              [styles.active]: activeTab === tab.id,
            })}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className={styles.tabContent}
      >
        {activeTabContent}
      </div>
    </div>
  );
}
