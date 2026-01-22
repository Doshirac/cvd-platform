import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import type { ResearchModalProps } from './ResearchCard.types';
import styles from './ResearchModal.module.scss';

export function ResearchModal({ research, isOpen, onClose }: ResearchModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !research) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="research-modal-title"
      >
        <header className={styles.header}>
          <h2 id="research-modal-title" className={styles.title}>
            {research.title}
          </h2>
          <Button
            variant="secondary"
            size="icon"
            onClick={onClose}
            aria-label={t('common.close')}
          >
            <Icon name="CLOSE" size="medium" />
          </Button>
        </header>

        <div className={styles.content}>
          {research.imageUrl && (
            <div className={styles['image-wrapper']}>
              <img
                src={research.imageUrl}
                alt={research.title}
                className={styles.image}
              />
            </div>
          )}

          <p className={styles.description}>{research.description}</p>

          {research.methodology && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="INFO" size="small" />
                {t('researchPage.methodology')}
              </h3>
              <p className={styles.text}>{research.methodology}</p>
            </section>
          )}

          {research.findings && research.findings.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="CHECK" size="small" />
                {t('researchPage.findings')}
              </h3>
              <ul className={styles.list}>
                {research.findings.map((finding, index) => (
                  <li key={index}>{finding}</li>
                ))}
              </ul>
            </section>
          )}

          {research.dataset && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="BUILDING" size="small" />
                {t('researchPage.dataset')}
              </h3>
              <p className={styles.text}>{research.dataset}</p>
            </section>
          )}

          {research.tools && research.tools.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="STETHOSCOPE" size="small" />
                {t('researchPage.tools')}
              </h3>
              <div className={styles.tools}>
                {research.tools.map((tool, index) => (
                  <span key={index} className={styles.tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </section>
          )}

          {(research.accuracy || research.samples || research.features) && (
            <div className={styles.stats}>
              {research.accuracy && (
                <div className={styles.stat}>
                  <span className={styles['stat-value']}>{research.accuracy}%</span>
                  <span className={styles['stat-label']}>{t('researchPage.accuracy')}</span>
                </div>
              )}
              {research.samples && (
                <div className={styles.stat}>
                  <span className={styles['stat-value']}>
                    {research.samples.toLocaleString()}
                  </span>
                  <span className={styles['stat-label']}>{t('researchPage.samples')}</span>
                </div>
              )}
              {research.features && (
                <div className={styles.stat}>
                  <span className={styles['stat-value']}>{research.features}</span>
                  <span className={styles['stat-label']}>{t('researchPage.features')}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <footer className={styles.footer}>
          <Button variant="secondary" onClick={onClose}>
            {t('common.close')}
          </Button>
        </footer>
      </div>
    </div>
  );
}
