import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './NotFoundPage.module.scss';

import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';

export function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles['icon-wrapper']}>
          <Icon name="QUESTION" size="large" color="muted" />
        </div>
        <div className={styles.code}>{t('notFoundPage.code')}</div>
        <h1 className={styles.title}>{t('notFoundPage.title')}</h1>
        <p className={styles.description}>{t('notFoundPage.description')}</p>
        <div className={styles.actions}>
          <Button onClick={() => navigate('/')}>
            <Icon name="HOME" size="small" color="white" /> {t('common.goHome')}
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)} className={styles.button}>
            <Icon name="ARROW_LEFT" size="small" /> {t('common.goBack')}
          </Button>
        </div>
        <div className={styles.links}>
          <h2>{t('notFoundPage.helpfulLinks')}</h2>
          <ul>
            <li>
              <Link to="/">{t('notFoundPage.exploreDiseasesLink')}</Link>
            </li>
            <li>
              <Link to="/sources">{t('notFoundPage.browseSourcesLink')}</Link>
            </li>
            <li>
              <Link to="/research">{t('notFoundPage.viewResearchLink')}</Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
