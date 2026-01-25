import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';
import styles from './Footer.module.scss';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.disclaimer}>
          <AlertTriangle className={styles.icon} size={20} />
          <p className={styles.text}>
            {t('footer.disclaimer')}
          </p>
        </div>
        <div className={styles.copyright}>
          <span>© {currentYear} CVD Platform. {t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  );
};
