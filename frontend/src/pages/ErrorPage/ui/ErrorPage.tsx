import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@shared/ui/Button';
import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Check if the user is on the error page and redirect to the main page
    const hasTriedRefresh = localStorage.getItem('hasTriedRefresh');
    if (!hasTriedRefresh) {
      localStorage.setItem('hasTriedRefresh', 'true');
      window.location.href = '/';
    }
  }, []);

  const handleRefresh = () => {
    // Reset the flag and reload the page
    localStorage.removeItem('hasTriedRefresh');
    window.location.reload();
  };

  return (
    <div className={styles.wrapper} role="alert">
      <h1 className={styles.title}>{t('errorPage.title')}</h1>
      <p className={styles.description}>{t('errorPage.description')}</p>
      <Button onClick={handleRefresh} variant="primary">
        {t('errorPage.refresh')}
      </Button>
    </div>
  );
};
