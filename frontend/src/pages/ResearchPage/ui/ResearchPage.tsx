import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ResearchCard, ResearchModal } from '@shared/ui/ResearchCard';
import { InfinityScroll } from '@shared/ui/InfinityScroll';
import { Icon } from '@shared/ui/Icon';
import type { Research } from '@shared/ui/ResearchCard';
import researchData from '@mock/research.json';
import styles from './ResearchPage.module.scss';

const itemsPerPage = 6;

export function ResearchPage() {
  const { t } = useTranslation();
  
  const [selectedResearch, setSelectedResearch] = useState<Research | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const research = researchData.research as Research[];

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
      return research.slice(startIndex, endIndex);
    },
    [research]
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
          <Icon name="FILE_TEXT" size="large" />
        </div>
        <h1 className={styles.title}>{t('researchPage.title')}</h1>
        <p className={styles.subtitle}>{t('researchPage.subtitle')}</p>
      </header>

      {/* Research Cards */}
      <section className={styles.content}>
        <InfinityScroll
            fetchPage={fetchPage}
            renderItem={renderResearch}
            itemsPerPage={itemsPerPage}
            gridColumns={300}
            buttonLabel={t('common.seeMore')}
            endMessage={t('common.noMoreItems')}
          />
      </section>

      <ResearchModal
        research={selectedResearch}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
