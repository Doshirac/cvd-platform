import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { selectSources } from '@shared/api/sources/sourcesSlice';
import { fetchSources } from '@shared/api/sources/sourcesThunks';
import type { RootState, AppDispatch } from '@app/providers/StoreProvider/config/store';
import type { Source } from '@shared/api/sources/sources.types';
import { InfinityScroll } from '@shared/ui/InfinityScroll';
import { SearchBar } from '@shared/ui/SearchBar';
import { SourceCard } from '@shared/ui/SourceCard';
import { Icon } from '@shared/ui/Icon';
import { Loader } from '@shared/ui/Loader';
import { ResourceNotFound } from '@shared/ui/ResourceNotFound';
import styles from './SourcesPage.module.scss';

const itemsPerPage = 6;

export function SourcesPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  
  const sources = useSelector(selectSources);
  const loading = useSelector((state: RootState) => state.sources.loading);
  const error = useSelector((state: RootState) => state.sources.error);

  const [searchQuery, setSearchQuery] = useState('');
  
  // Track if initial data was loaded
  const isInitialMount = useRef(true);

  // Fetch data when search changes (SearchBar already has debounce)
  useEffect(() => {
    // Skip initial mount to avoid duplicate fetch
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (searchQuery) {
      dispatch(fetchSources({ search: searchQuery, take: 100 }));
    } else {
      dispatch(fetchSources({ take: 100 }));
    }
  }, [searchQuery, dispatch]);

  const fetchPage = useCallback(
    async (page: number): Promise<Source[]> => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return sources.slice(startIndex, endIndex);
    },
    [sources]
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

  // Only show error page when there's a real error (not just empty results)
  // and the error is not a 404/empty result type error
  const isRealError = error && !error.toLowerCase().includes('not found') && !error.toLowerCase().includes('no sources');
  
  if (isRealError && sources.length === 0) {
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
          <Icon name="BOOK_OPEN" size="large"/>
        </div>
        <h1 className={styles.title}>{t('sourcesPage.title')}</h1>
        <p className={styles.subtitle}>{t('sourcesPage.subtitle')}</p>
      </header>

      {/* Search */}
      <section className={styles.controls}>
        <div className={styles['search-row']}>
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t('sourcesPage.searchPlaceholder')}
            className={styles.search}
          />
        </div>
      </section>

      {/* Results Count */}
      {sources.length > 0 && (
        <div className={styles.count}>
          <span className={styles['count-label']}>{t('sourcesPage.showing')}</span>{' '}
          <span className={styles['count-value']}>{sources.length}</span>{' '}
          <span className={styles['count-label']}>
            {sources.length === 1 ? t('sourcesPage.sourceFound') : t('sourcesPage.sourcesFound')}
          </span>
        </div>
      )}

      {/* Source Cards */}
      <section className={styles.content}>
        {sources.length === 0 ? (
          <div className={styles['no-results']}>
            <ResourceNotFound
              title={t('sourcesPage.noSourcesFound')}
              message={t('sourcesPage.noSourcesFoundMessage')}
            />
          </div>
        ) : (
          <InfinityScroll
            fetchPage={fetchPage}
            renderItem={renderSource}
            itemsPerPage={itemsPerPage}
            gridColumns={320}
            buttonLabel={t('common.seeMore')}
            endMessage={t('common.noMoreItems')}
          />
        )}
      </section>
    </div>
  );
}
