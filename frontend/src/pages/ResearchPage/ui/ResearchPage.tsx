import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '@shared/ui/SearchBar';
import { TabPanel } from '@shared/ui/TabPanel';
import { ResearchCard, ResearchModal } from '@shared/ui/ResearchCard';
import { InfinityScroll } from '@shared/ui/InfinityScroll';
import type { Research } from '@shared/ui/ResearchCard';
import { ResourceNotFound } from '@shared/ui/ResourceNotFound';
import researchData from '@mock/research.json';
import styles from './ResearchPage.module.scss';

const itemsPerPage = 9;

export function ResearchPage() {
  const { t } = useTranslation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedResearch, setSelectedResearch] = useState<Research | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = useMemo(() => [
    { id: 'all', label: t('researchPage.categories.all'), content: null },
    { id: 'analysis', label: t('researchPage.categories.analysis'), content: null },
    { id: 'visualization', label: t('researchPage.categories.visualization'), content: null },
    { id: 'prediction', label: t('researchPage.categories.prediction'), content: null },
    { id: 'dataset', label: t('researchPage.categories.dataset'), content: null },
  ], [t]);

  const research = researchData.research as Research[];

  const filteredResearch = useMemo(() => {
    let result = research;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query)
      );
    }

    if (activeCategory !== 'all') {
      result = result.filter((r) => r.category === activeCategory);
    }

    return result;
  }, [research, searchQuery, activeCategory]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
  }, []);

  const handleViewDetails = useCallback((research: Research) => {
    setSelectedResearch(research);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedResearch(null);
  }, []);

  const fetchPage = useCallback(
    async (page: number): Promise<Research[]> => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredResearch.slice(startIndex, endIndex);
    },
    [filteredResearch]
  );

  const renderResearch = useCallback(
    (research: Research) => (
      <ResearchCard
        research={research}
        onViewDetails={handleViewDetails}
      />
    ),
    [handleViewDetails]
  );

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
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <h1 className={styles.title}>{t('researchPage.title')}</h1>
        <p className={styles.subtitle}>{t('researchPage.subtitle')}</p>
      </header>

      {/* Search & Tabs */}
      <section className={styles.controls}>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={t('researchPage.searchPlaceholder')}
          className={styles.search}
        />

        <TabPanel
          tabs={categories}
          activeTab={activeCategory}
          onTabChange={handleCategoryChange}
          className={styles.tabs}
        />
      </section>

      {/* Results Count */}
      {filteredResearch.length > 0 && (
        <div className={styles.count}>
          <span className={styles['count-label']}>{t('researchPage.showing')}</span>{' '}
          <span className={styles['count-value']}>{filteredResearch.length}</span>{' '}
          <span className={styles['count-label']}>
            {filteredResearch.length === 1 ? t('researchPage.itemFound') : t('researchPage.itemsFound')}
          </span>
        </div>
      )}

      {/* Research Cards */}
      <section className={styles.content}>
        {filteredResearch.length === 0 ? (
          <div className={styles['no-results']}>
            <ResourceNotFound
              title={t('researchPage.noResearchFound')}
              message=""
            />
          </div>
        ) : (
          <InfinityScroll
            fetchPage={fetchPage}
            renderItem={renderResearch}
            itemsPerPage={itemsPerPage}
            gridColumns={300}
            buttonLabel={t('common.loadMore')}
          />
        )}
      </section>

      <ResearchModal
        research={selectedResearch}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
