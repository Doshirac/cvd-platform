import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import type { ResearchCardProps } from './ResearchCard.types';
import styles from './ResearchCard.module.scss';

export function ResearchCard({
  research,
  onViewDetails,
  className,
}: ResearchCardProps) {
  const { i18n } = useTranslation();
  const isRussian = i18n.language === 'ru';

  const title = isRussian && research.titleRu ? research.titleRu : research.title;
  const description = isRussian && research.descriptionRu ? research.descriptionRu : research.description;

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
        <h3 className={styles.title}>{title}</h3>
      </div>
      
      <div className={styles.content}>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
        
        {research.imageUrl && (
          <div className={styles['image-wrapper']}>
            <img
              src={research.imageUrl}
              alt={title}
              className={styles.image}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
}
