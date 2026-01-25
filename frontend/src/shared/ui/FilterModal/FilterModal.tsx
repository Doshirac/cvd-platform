import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { FilterPanel } from '@shared/ui/FilterPanel';
import type { FilterModalProps } from './FilterModal.types';
import styles from './FilterModal.module.scss';

export function FilterModal({
  isOpen,
  onClose,
  title = 'Apply Filters',
  subtitle = 'Try adjusting your search or filters',
  filterGroups,
  selectedValues,
  onFilterChange,
  onReset,
}: FilterModalProps) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles['header-content']}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          <button
            className={styles['close-button']}
            onClick={onClose}
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <FilterPanel
            filterGroups={filterGroups}
            selectedValues={selectedValues}
            onFilterChange={onFilterChange}
            onReset={onReset}
            className={styles.panel}
          />
        </div>
      </div>
    </div>
  );
}
