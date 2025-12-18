import { Link, useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles['icon-wrapper']}>
          <Icon name="QUESTION" size="large" color="muted" />
        </div>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          The page you're looking for doesn't exist or has been moved. Please check the URL or
          return to the homepage.
        </p>
        <div className={styles.actions}>
          <Button onClick={() => navigate('/')}>
            <Icon name="HOME" size="small" color="white" /> Go to Homepage
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)} className={styles.button}>
            <Icon name="ARROW_LEFT" size="small" /> Go Back
          </Button>
        </div>
        <div className={styles.links}>
          <h2>Helpful Links</h2>
          <ul>
            <li>
              <Link to="/">Explore Cardiovascular Diseases</Link>
            </li>
            <li>
              <Link to="/sources">Browse Medical Sources</Link>
            </li>
            <li>
              <Link to="/research">View Research Gallery</Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
