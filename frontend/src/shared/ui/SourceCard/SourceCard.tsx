import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import type { SourceCardProps } from './SourceCard.types';
import styles from './SourceCard.module.scss';

export function SourceCard({ source, className }: SourceCardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{source.name}</div>
        <div className={styles.cardDescription}>{source.description}</div>
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
          aria-label={`Visit ${source.name}`}
          className={styles.button}
        >
          Visit Resource
          <Icon name="EXTERNAL_LINK" size="small" color="white"/>
        </Button>
      </div>
    </div>
  );
}
