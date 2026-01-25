import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Icon } from '@shared/ui/Icon';
import type { SearchBarProps } from './SearchBar.types';
import styles from './SearchBar.module.scss';

export function SearchBar({
  value: externalValue,
  onChange,
  placeholder,
  debounceMs = 300,
  className,
}: SearchBarProps) {
  const { t } = useTranslation();

  // Always use internal state for immediate UI response
  const [internalValue, setInternalValue] = useState(externalValue ?? '');

  // Sync with external value only when it changes from outside
  useEffect(() => {
    if (externalValue !== undefined && externalValue !== internalValue) {
      setInternalValue(externalValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValue]);

  const debouncedEmit = useMemo(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (v: string) => {
      if (!onChange) return;

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => onChange(v), debounceMs);
    };
  }, [onChange, debounceMs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setInternalValue(v); // Immediate UI update
    debouncedEmit(v);    // Debounced callback
  };

  const handleClear = () => {
    setInternalValue('');
    onChange?.('');
  };

  return (
    <div className={classNames(styles.container, className)}>
      <Icon name="SEARCH" size="small" className={styles['search-icon']} />
      <input
        type="search"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder || t('search.placeholder', { defaultValue: t('common.search') })}
        className={styles.input}
        aria-label={t('common.search')}
      />

      {internalValue && (
        <button
          type="button"
          onClick={handleClear}
          className={styles['clear-button']}
          aria-label={t('common.clear')}
        >
          <Icon name="CLOSE" size="medium" />
        </button>
      )}
    </div>
  );
}
