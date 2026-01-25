import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { selectDiseases, selectSymptoms, selectRiskFactors } from '@shared/api/diseases/diseasesSlice';
import { fetchDiseases } from '@shared/api/diseases/diseasesThunks';
import type { RootState, AppDispatch } from '@app/providers/StoreProvider/config/store';
import type { Disease } from '@shared/api/diseases/diseases.types';
import { SearchBar } from '@shared/ui/SearchBar';
import { FilterPanel } from '@shared/ui/FilterPanel';
import { FilterModal } from '@shared/ui/FilterModal'
import { AlphabetPanel } from '@shared/ui/AlphabetPanel';
import { DiseaseCard } from '@shared/ui/DiseaseCard';
import { InfinityScroll } from '@shared/ui/InfinityScroll';
import { Loader } from '@shared/ui/Loader';
import { Icon } from '@shared/ui/Icon';
import { ResourceNotFound } from '@shared/ui/ResourceNotFound';
import { useBreakpoint, mobileBreakpoint } from '@shared/hooks';
import styles from './MainPage.module.scss';

const itemsPerPage = 6;

export function MainPage() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === mobileBreakpoint;
  
  const diseases = useSelector(selectDiseases);
  const symptoms = useSelector(selectSymptoms);
  const riskFactors = useSelector(selectRiskFactors);
  const loading = useSelector((state: RootState) => state.diseases.loading);
  const error = useSelector((state: RootState) => state.diseases.error);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({});
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const filterGroups = useMemo(() => [
    {
      id: 'symptom',
      label: t('mainPage.filterBySymptom'),
      options: symptoms.map((s) => ({ code: s.code, label: s.term })),
    },
    {
      id: 'riskFactor',
      label: t('mainPage.filterByRiskFactor'),
      options: riskFactors.map((rf) => ({ code: rf.code, label: rf.name })),
    },
  ], [t, symptoms, riskFactors]);

  // Track if initial data was loaded
  const isInitialMount = useRef(true);
  // Track previous language to detect language changes
  const prevLanguageRef = useRef(i18n.language);

  // Fetch data when search/filters change (SearchBar already has debounce)
  useEffect(() => {
    // Skip initial mount to avoid duplicate fetch (MainLayout handles initial load)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Skip if only language changed (MainLayout handles language changes)
    if (prevLanguageRef.current !== i18n.language) {
      prevLanguageRef.current = i18n.language;
      return;
    }

    const params: Record<string, string | number> = {
      locale: i18n.language,
      take: 100, // Load all data for client-side pagination
    };

    if (searchQuery) {
      params.search = searchQuery;
    }

    if (filterValues.symptom && filterValues.symptom.length > 0) {
      params.symptom = filterValues.symptom[0];
    }

    if (filterValues.riskFactor && filterValues.riskFactor.length > 0) {
      params.riskFactor = filterValues.riskFactor[0];
    }

    dispatch(fetchDiseases(params));
  }, [searchQuery, filterValues, dispatch, i18n.language]);

  // Apply client-side letter filtering only (fast operation)
  const filteredDiseases = useMemo(() => {
    let result = diseases;

    if (selectedLetter) {
      result = result.filter((d) =>
        d.name.toUpperCase().startsWith(selectedLetter)
      );
    }

    return result;
  }, [diseases, selectedLetter]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setFilterValues({});
    setSelectedLetter(null);
    dispatch(fetchDiseases({ locale: i18n.language, take: 100 }));
  }, [dispatch, i18n.language]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleFilterChange = useCallback((groupId: string, values: string[]) => {
    setFilterValues((prev) => ({
      ...prev,
      [groupId]: values,
    }));
  }, []);

  const handleLetterSelect = useCallback((letter: string | null) => {
    setSelectedLetter(letter);
  }, []);

  const fetchPage = useCallback(
    async (page: number): Promise<Disease[]> => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredDiseases.slice(startIndex, endIndex);
    },
    [filteredDiseases]
  );

  const renderDisease = useCallback(
    (disease: Disease) => <DiseaseCard disease={disease} />,
    []
  );

  if (loading && diseases.length === 0) {
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  }

  // Only show error page when there's a real error (not just empty results)
  const isRealError = error && !error.toLowerCase().includes('not found') && !error.toLowerCase().includes('no diseases');
  
  if (isRealError && diseases.length === 0) {
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
        <h1 className={styles.title}>{t('mainPage.title')}</h1>
        <p className={styles.subtitle}>{t('mainPage.subtitle')}</p>
      </header>

      {/* Search & Filters */}
      <section className={styles.controls}>
        <div className={styles['search-row']}>
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t('mainPage.searchPlaceholder')}
            className={styles.search}
          />
          {isMobile && (
            <button
              className={styles['filter-button']}
              onClick={() => setIsFilterModalOpen(true)}
              aria-label={t('mainPage.openFilters')}
            >
              <Icon size="medium" color="primary" name="FILTER" />
            </button>
          )}
        </div>

        {!isMobile && (
          <FilterPanel
            filterGroups={filterGroups}
            selectedValues={filterValues}
            onFilterChange={handleFilterChange}
            onReset={handleClearFilters}
          />
        )}

        {isMobile && (
          <FilterModal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            title={t('mainPage.applyFilters')}
            subtitle={t('mainPage.filterSubtitle')}
            filterGroups={filterGroups}
            selectedValues={filterValues}
            onFilterChange={handleFilterChange}
            onReset={handleClearFilters}
          />
        )}

        <div className={styles['alphabet-wrapper']}>
          <AlphabetPanel
            language={i18n.language === 'ru' ? 'ru' : 'en'}
            selectedLetter={selectedLetter}
            onLetterSelect={handleLetterSelect}
          />
        </div>
      </section>

      {/* Results Count */}
      {filteredDiseases.length > 0 && (
        <div className={styles.count}>
          <span className={styles['count-label']}>{t('mainPage.showing')}</span>{' '}
          <span className={styles['count-value']}>{filteredDiseases.length}</span>{' '}
          <span className={styles['count-label']}>
            {filteredDiseases.length === 1 ? t('mainPage.diseaseFound') : t('mainPage.diseasesFound')}
          </span>
        </div>
      )}

      {/* Disease Cards */}
      <section className={styles.content}>
        {filteredDiseases.length === 0 ? (
          <div className={styles['no-results']}>
            <ResourceNotFound
              title={t('mainPage.noDiseasesFound')}
              message={t('mainPage.noDiseasesFoundMessage')}
            />
          </div>
        ) : (
          <InfinityScroll
            fetchPage={fetchPage}
            renderItem={renderDisease}
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
