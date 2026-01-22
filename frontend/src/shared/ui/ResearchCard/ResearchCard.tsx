import classNames from 'classnames';
import type { ResearchCardProps } from './ResearchCard.types';
import styles from './ResearchCard.module.scss';

export function ResearchCard({
  research,
  onViewDetails,
  className,
}: ResearchCardProps) {
  const handleClick = () => {
    onViewDetails?.(research);
  };

  return (
    <div 
      className={classNames(styles.card, 'group', className)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{research.title}</h3>
      </div>
      
      <div className={styles.content}>
        {research.description && (
          <p className={styles.description}>{research.description}</p>
        )}
        
        {research.imageUrl && (
          <div className={styles['image-wrapper']}>
            <img
              src={research.imageUrl}
              alt={research.title}
              className={styles.image}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
}
