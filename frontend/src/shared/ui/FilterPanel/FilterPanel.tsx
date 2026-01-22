import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@shared/ui/Button';
import classNames from 'classnames';
import type { FilterPanelProps } from './FilterPanel.types';
import styles from './FilterPanel.module.scss';

export function FilterPanel({
  filterGroups,
  selectedValues,
  onFilterChange,
  onReset,
  className,
}: FilterPanelProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(filterGroups.map((group) => [group.id, true]))
  );

  const handleToggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleCheckboxChange = (groupId: string, code: string) => {
    const currentValues = selectedValues[groupId] || [];
    const newValues = currentValues.includes(code)
      ? currentValues.filter((v) => v !== code)
      : [...currentValues, code];
    
    onFilterChange(groupId, newValues);
  };

  const hasActiveFilters = Object.values(selectedValues).some(
    (values) => values.length > 0
  );

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filters</h3>
        {onReset && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onReset}
            disabled={!hasActiveFilters}
            className={styles['reset-button']}
          >
            Reset
          </Button>
        )}
      </div>

      <div className={styles.groups}>
        {filterGroups.map((group) => (
          <div key={group.id} className={styles.group}>
            <button
              className={styles['group-trigger']}
              onClick={() => handleToggleGroup(group.id)}
              aria-expanded={openGroups[group.id]}
            >
              <span className={styles['group-label']}>{group.label}</span>
              <ChevronDown
                className={classNames(styles.chevron, {
                  [styles['chevron-open']]: openGroups[group.id],
                })}
              />
            </button>

            {openGroups[group.id] && (
              <div className={styles['group-content']}>
                {group.options.map((option) => {
                  const isChecked = (selectedValues[group.id] || []).includes(option.code);
                  const checkboxId = `filter-${group.id}-${option.code}`;
                  
                  return (
                    <div key={option.code} className={styles['checkbox-item']}>
                      <input
                        type="checkbox"
                        id={checkboxId}
                        className={styles.checkbox}
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(group.id, option.code)}
                      />
                      <label
                        htmlFor={checkboxId}
                        className={styles['checkbox-label']}
                      >
                        {option.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
