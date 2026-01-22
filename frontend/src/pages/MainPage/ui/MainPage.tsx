import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectDiseases, selectSymptoms, selectRiskFactors } from '@shared/api/diseases/diseasesSlice';
import type { RootState } from '@app/providers/StoreProvider/config/store';
import type { Disease } from '@shared/api/diseases/diseases.types';
import { SearchBar } from '@shared/ui/SearchBar';
import { FilterPanel } from '@shared/ui/FilterPanel';
import { AlphabetPanel } from '@shared/ui/AlphabetPanel';
import { DiseaseCard } from '@shared/ui/DiseaseCard';
import { InfinityScroll } from '@shared/ui/InfinityScroll';
import { Loader } from '@shared/ui/Loader';
import { ResourceNotFound } from '@shared/ui/ResourceNotFound';
import styles from './MainPage.module.scss';

const itemsPerPage = 12;

export function MainPage() {
  const { t, i18n } = useTranslation();
  
  const diseases = useSelector(selectDiseases);
  const symptoms = useSelector(selectSymptoms);
  const riskFactors = useSelector(selectRiskFactors);
  const loading = useSelector((state: RootState) => state.diseases.loading);
  const error = useSelector((state: RootState) => state.diseases.error);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({});
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

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

  const filteredDiseases = useMemo(() => {
    let result = diseases;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.code.toLowerCase().includes(query)
      );
    }

    if (filterValues.symptom && filterValues.symptom.length > 0) {
      result = result.filter((d) =>
        d.symptoms?.some((s) => filterValues.symptom.includes(s))
      );
    }

    if (filterValues.riskFactor && filterValues.riskFactor.length > 0) {
      result = result.filter((d) =>
        d.risks?.some((r) => filterValues.riskFactor.includes(r))
      );
    }

    if (selectedLetter) {
      result = result.filter((d) =>
        d.name.toUpperCase().startsWith(selectedLetter)
      );
    }

    return result;
  }, [diseases, searchQuery, filterValues, selectedLetter]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setFilterValues({});
    setSelectedLetter(null);
  }, []);

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

  if (error && diseases.length === 0) {
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
        </div>

        <FilterPanel
          filterGroups={filterGroups}
          selectedValues={filterValues}
          onFilterChange={handleFilterChange}
          onReset={handleClearFilters}
        />

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
              message={t('mainPage.clearFilters')}
            />
          </div>
        ) : (
          <InfinityScroll
            fetchPage={fetchPage}
            renderItem={renderDisease}
            itemsPerPage={itemsPerPage}
            gridColumns={320}
            buttonLabel={t('common.loadMore')}
          />
        )}
      </section>
    </div>
  );
}
