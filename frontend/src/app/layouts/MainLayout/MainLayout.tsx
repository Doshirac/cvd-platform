import { Outlet } from 'react-router-dom';
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

  useEffect(() => {
    dispatch(fetchSources({ take: 100 }));
    dispatch(fetchDiseases({ take: 100 }));
    dispatch(fetchRiskFactors());
    dispatch(fetchSymptoms());
  }, [dispatch]);

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
