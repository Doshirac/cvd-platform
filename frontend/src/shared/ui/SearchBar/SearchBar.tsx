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

  const isControlled = externalValue !== undefined;

  const [internalValue, setInternalValue] = useState(externalValue ?? '');
  const currentValue = isControlled ? (externalValue ?? '') : internalValue;

  useEffect(() => {
    if (isControlled) setInternalValue(externalValue ?? '');
  }, [externalValue, isControlled]);

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
    setInternalValue(v);
    debouncedEmit(v);
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
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder || t('search.placeholder', { defaultValue: t('common.search') })}
        className={styles.input}
        aria-label={t('common.search')}
      />

      {currentValue && (
        <button
          type="button"
          onClick={handleClear}
          className={styles['clear-button']}
          aria-label={t('common.clear')}
        >
          <Icon name="CLOSE" size="small" />
        </button>
      )}
    </div>
  );
}
