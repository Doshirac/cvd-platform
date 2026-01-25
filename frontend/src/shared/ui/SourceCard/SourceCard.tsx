import { useTranslation } from 'react-i18next';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import type { SourceCardProps } from './SourceCard.types';
import styles from './SourceCard.module.scss';

export function SourceCard({ source, className }: SourceCardProps) {
  const { t } = useTranslation();
  
  return (
    <div className={`${styles.card} ${className || ''}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{source.name}</h3>
        <p className={styles.cardDescription}>{source.description}</p>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.organization}>
          <Icon name="BUILDING" size="small" color="muted" />
          <span>{source.organization}</span>
        </div>
        <Button
          variant="primary"
          size="default"
          onClick={() => window.open(source.link, '_blank', 'noopener,noreferrer')}
          aria-label={`${t('sourcesPage.viewResource')} ${source.name}`}
          className={styles.button}
        >
          {t('sourcesPage.viewResource')}
          <Icon name="EXTERNAL_LINK" size="small" color="white"/>
        </Button>
      </div>
    </div>
  );
}
