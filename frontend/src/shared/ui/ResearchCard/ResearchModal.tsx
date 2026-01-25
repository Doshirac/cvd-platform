import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import type { ResearchModalProps } from './ResearchCard.types';
import styles from './ResearchModal.module.scss';

export function ResearchModal({ research, isOpen, onClose }: ResearchModalProps) {
  const { t, i18n } = useTranslation();
  const isRussian = i18n.language === 'ru';

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

  const title = isRussian && research.titleRu ? research.titleRu : research.title;
  const description = isRussian && research.descriptionRu ? research.descriptionRu : research.description;
  const methodology = isRussian && research.methodologyRu ? research.methodologyRu : research.methodology;
  const findings = isRussian && research.findingsRu ? research.findingsRu : research.findings;
  const analyzedFeatures = isRussian && research.analyzedFeaturesRu ? research.analyzedFeaturesRu : research.analyzedFeatures;
  const conclusions = isRussian && research.conclusionsRu ? research.conclusionsRu : research.conclusions;
  const outcomes = research.outcomes ? (isRussian ? research.outcomes.ru : research.outcomes.en) : undefined;
  const whyText = research.why ? (isRussian ? research.why.ru : research.why.en) : undefined;

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
            {title}
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
          {research.imageUrl ? (
            <div className={styles['image-wrapper']}>
              <img
                src={research.imageUrl}
                alt={title}
                className={styles.image}
                onError={(e) => {
                  console.error('Image failed to load:', research.imageUrl);
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ) : null}

          <p className={styles.description}>{description}</p>

          {whyText && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="INFO" size="small" />
                {t('researchPage.researchGoal')}
              </h3>
              <p className={styles.text}>{whyText}</p>
            </section>
          )}

          {methodology && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="INFO" size="small" />
                {t('researchPage.methodology')}
              </h3>
              <p className={styles.text}>{methodology}</p>
            </section>
          )}

          {analyzedFeatures && analyzedFeatures.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="ACTIVITY" size="small" />
                {t('researchPage.analyzedFeatures')}
              </h3>
              <ul className={styles.list}>
                {analyzedFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {research.hypotheses && research.hypotheses.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="CHECK" size="small" />
                {t('researchPage.hypotheses')}
              </h3>
              <div className={styles.hypotheses}>
                {research.hypotheses.map((hyp, index) => (
                  <div key={index} className={styles.hypothesis}>
                    <p className={styles['hypothesis-text']}>
                      <strong>{isRussian ? hyp.hypothesisRu : hyp.hypothesis}</strong>
                    </p>
                    {(hyp.why || hyp.whyRu) && (
                      <p className={styles['hypothesis-why']}>
                        <em>{t('researchPage.hypothesisWhy')}: {isRussian ? hyp.whyRu : hyp.why}</em>
                      </p>
                    )}
                    <p className={styles['hypothesis-result']}>
                      {isRussian ? hyp.resultRu : hyp.result}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {outcomes && outcomes.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="CHECK" size="small" />
                {t('researchPage.outcomes')}
              </h3>
              <ul className={styles.list}>
                {outcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </section>
          )}

          {conclusions && conclusions.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="CHECK" size="small" />
                {t('researchPage.conclusions')}
              </h3>
              <ul className={styles.list}>
                {conclusions.map((conclusion, index) => (
                  <li key={index}>{conclusion}</li>
                ))}
              </ul>
            </section>
          )}

          {findings && findings.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="CHECK" size="small" />
                {t('researchPage.findings')}
              </h3>
              <ul className={styles.list}>
                {findings.map((finding, index) => (
                  <li key={index}>{finding}</li>
                ))}
              </ul>
            </section>
          )}

          {research.correlation?.topWithTarget && research.correlation.topWithTarget.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="ACTIVITY" size="small" />
                {t('researchPage.topCorrelations')}
              </h3>
              <div className={styles.correlations}>
                {research.correlation.topWithTarget.slice(0, 5).map((corr, index) => (
                  <div key={index} className={styles.correlation}>
                    <span className={styles['correlation-feature']}>{corr.feature}</span>
                    <span className={`${styles['correlation-value']} ${corr.r < 0 ? styles.negative : styles.positive}`}>
                      r = {corr.r.toFixed(3)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {research.dataset && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="BUILDING" size="small" />
                {t('researchPage.dataset')}
              </h3>
              <div className={styles['dataset-info']}>
                <p><strong>{t('researchPage.datasetFile')}:</strong> {research.dataset.file}</p>
                <p><strong>{t('researchPage.samples')}:</strong> {typeof research.dataset.samples === 'number' ? research.dataset.samples.toLocaleString() : research.dataset.samples}</p>
                <p><strong>{t('researchPage.features')}:</strong> {research.dataset.features}</p>
                {research.dataset.target && (
                  <p><strong>{t('researchPage.target')}:</strong> {isRussian && research.dataset.targetRu ? research.dataset.targetRu : research.dataset.target}</p>
                )}
              </div>
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

          {research.statisticalMethods && research.statisticalMethods.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles['section-title']}>
                <Icon name="ACTIVITY" size="small" />
                {t('researchPage.statisticalMethods')}
              </h3>
              <div className={styles.tools}>
                {research.statisticalMethods.map((method, index) => (
                  <span key={index} className={styles.tool}>
                    {method}
                  </span>
                ))}
              </div>
            </section>
          )}

          {research.colabLink && (
            <section className={styles.section}>
              <a
                href={research.colabLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['colab-link']}
              >
                <Icon name="EXTERNAL_LINK" size="small" />
                {t('researchPage.openInColab')}
              </a>
            </section>
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
