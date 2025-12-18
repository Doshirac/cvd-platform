import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import Header from '@shared/ui/Header/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { fetchCategories } from '@shared/api/categories/categoriesThunks';
// import { getArticles } from '@shared/api/articles/articlesThunks';
// import { fetchCurrentUser } from '@shared/api/auth/authThunks';
import type { AppDispatch } from '@app/providers/StoreProvider/config/store';
import { Icon, iconNames, iconColors, iconSizes } from '@shared/ui/Icon';

export const MainLayout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // dispatch(getArticles());
    // dispatch(fetchCategories());
    // dispatch(fetchCurrentUser());
  }, [dispatch]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div data-testid="layout-wrapper" className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <button className={styles.fab} onClick={scrollToTop} aria-label="Scroll to top">
        <Icon name={iconNames.ARROW_UP} size={iconSizes.MEDIUM} color={iconColors.WHITE} />
      </button>
    </div>
  );
};
