import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectSources } from '@shared/api/sources/sourcesSlice';
import type { RootState } from '@app/providers/StoreProvider/config/store';
import type { Source } from '@shared/api/sources/sources.types';
import { InfinityScroll } from '@shared/ui/InfinityScroll';
import { SearchBar } from '@shared/ui/SearchBar';
import { SourceCard } from '@shared/ui/SourceCard';
import { Loader } from '@shared/ui/Loader';
import { ResourceNotFound } from '@shared/ui/ResourceNotFound';
import styles from './SourcesPage.module.scss';

const itemsPerPage = 10;

export function SourcesPage() {
  const { t } = useTranslation();
  
  const sources = useSelector(selectSources);
  const loading = useSelector((state: RootState) => state.sources.loading);
  const error = useSelector((state: RootState) => state.sources.error);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredSources = useMemo(() => {
    if (!searchQuery) return sources;
    
    const query = searchQuery.toLowerCase();
    return sources.filter((s) =>
      s.name.toLowerCase().includes(query) ||
      s.link.toLowerCase().includes(query)
    );
  }, [sources, searchQuery]);

  const fetchPage = useCallback(
    async (page: number): Promise<Source[]> => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredSources.slice(startIndex, endIndex);
    },
    [filteredSources]
  );

  const renderSource = useCallback(
    (source: Source) => <SourceCard source={source} />,
    []
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  if (loading && sources.length === 0) {
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  }

  if (error && sources.length === 0) {
    return (
      <div className={styles.error}>
        <ResourceNotFound
          title={t('common.error')}
          message={error}
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles['hero-icon']}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        </div>
        <h1 className={styles.title}>{t('sourcesPage.title')}</h1>
        <p className={styles.subtitle}>{t('sourcesPage.subtitle')}</p>
      </header>

      {/* Search */}
      <section className={styles.controls}>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={t('sourcesPage.searchPlaceholder')}
          className={styles.search}
        />
      </section>

      {/* Results Count */}
      {filteredSources.length > 0 && (
        <div className={styles.count}>
          <span className={styles['count-label']}>{t('sourcesPage.showing')}</span>{' '}
          <span className={styles['count-value']}>{filteredSources.length}</span>{' '}
          <span className={styles['count-label']}>
            {filteredSources.length === 1 ? t('sourcesPage.sourceFound') : t('sourcesPage.sourcesFound')}
          </span>
        </div>
      )}

      {/* Source Cards */}
      <section className={styles.content}>
        {filteredSources.length === 0 ? (
          <div className={styles['no-results']}>
            <ResourceNotFound
              title={t('sourcesPage.noSourcesFound')}
              message=""
            />
          </div>
        ) : (
          <InfinityScroll
            fetchPage={fetchPage}
            renderItem={renderSource}
            itemsPerPage={itemsPerPage}
            buttonLabel={t('common.loadMore')}
          />
        )}
      </section>
    </div>
  );
}
