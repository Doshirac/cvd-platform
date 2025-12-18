import { Button } from '@shared/ui/Button';
import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={styles.wrapper} role="alert">
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.description}>
        Please try refreshing the page or contact support if the problem persists.
      </p>
      <Button onClick={handleRefresh} variant="primary">
        Refresh
      </Button>
    </div>
  );
};
