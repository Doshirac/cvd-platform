import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import Header from '@shared/ui/Header/Header';
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
    dispatch(fetchSources({}));
    dispatch(fetchDiseases({}));
    dispatch(fetchRiskFactors());
    dispatch(fetchSymptoms());
  }, [dispatch]);

  return (
    <div data-testid="layout-wrapper" className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <ScrollToTop />
    </div>
  );
};
