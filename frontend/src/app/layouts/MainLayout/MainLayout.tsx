import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './MainLayout.module.scss';
import Header from '@shared/ui/Header/Header';
import { Footer } from '@shared/ui/Footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { AppDispatch } from '@app/providers/StoreProvider/config/store';
import { fetchSources } from '@shared/api/sources/sourcesThunks';
import {
  fetchDiseases,
  fetchRiskFactors,
  fetchSymptoms,
} from '@shared/api/diseases/diseasesThunks';
import { ScrollToTop } from '@shared/ui/ScrollToTop';

export const MainLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { i18n } = useTranslation();
  const locale = i18n.language;

  // Fetch all data when language changes
  useEffect(() => {
    dispatch(fetchSources({ take: 100 }));
    dispatch(fetchDiseases({ take: 100, locale }));
    dispatch(fetchRiskFactors(locale));
    dispatch(fetchSymptoms(locale));
  }, [dispatch, locale]);

  return (
    <div data-testid="layout-wrapper" className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};
