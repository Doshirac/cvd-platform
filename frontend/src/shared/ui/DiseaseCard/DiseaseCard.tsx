import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Badge } from '@shared/ui/Badge';
import { Icon } from '@shared/ui/Icon';
import { TooltipBadge } from '@shared/ui/TooltipBadge';
import type { DiseaseCardProps } from './DiseaseCard.types';
import type { IconName } from '@shared/ui/Icon/Icon.constants';
import styles from './DiseaseCard.module.scss';

// Array of health-related icons
const diseaseIcons: IconName[] = [
  'HEART',
  'ACTIVITY',
  'STETHOSCOPE',
  'HEART_PULSE',
  'SYRINGE',
  'PILL',
  'THERMOMETER',
  'CROSS',
];

// Function to get icon based on disease ID
const getIconForDisease = (id: number): IconName => {
  const index = id % diseaseIcons.length;
  return diseaseIcons[index];
};

export function DiseaseCard({
  disease,
  className,
}: DiseaseCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const iconName = getIconForDisease(disease.id);

  const handleClick = () => {
    navigate(`/diseases/${disease.id}`);
  };

  return (
    <div 
      className={classNames(styles.card, 'group', className)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <header className={styles.header}>
        <div className={styles['title-row']}>
          <h3 className={styles.title}>{disease.name}</h3>
          <Badge variant="secondary" className={styles.badge}>
            #{disease.id}
          </Badge>
        </div>
      </header>

      <div className={styles.content}>
        {/* Icon with background - positioned absolutely */}
        <div className={styles['icon-container']}>
          <Icon className={styles.icon} name={iconName} size="large" />
        </div>

        {/* Primary Symptoms - only show primary priority */}
        {disease.symptoms && disease.symptoms.filter(s => s.priority === 'primary').length > 0 && (
          <section className={styles.section}>
            <h4 className={styles['section-title']}>
              {t('diseaseCard.primarySymptoms')}
            </h4>
            <div className={styles.badges}>
              {disease.symptoms.filter(s => s.priority === 'primary').slice(0, 3).map((symptom, index) => (
                <TooltipBadge
                  key={index}
                  code={symptom.code || symptom.name.slice(0, 3).toUpperCase()}
                  fullName={symptom.name}
                  variant="primary"
                />
              ))}
              {disease.symptoms.filter(s => s.priority === 'primary').length > 3 && (
                <Badge variant="muted" className={styles['more-badge']}>
                  +{disease.symptoms.filter(s => s.priority === 'primary').length - 3}
                </Badge>
              )}
            </div>
          </section>
        )}

        {/* Risk Factors */}
        {disease.risks && disease.risks.length > 0 && (
          <section className={styles.section}>
            <h4 className={styles['section-title']}>
              {t('diseaseCard.riskFactors')}
            </h4>
            <div className={styles.badges}>
              {disease.risks.slice(0, 3).map((risk, index) => (
                <TooltipBadge
                  key={index}
                  code={risk.code || risk.name.slice(0, 3).toUpperCase()}
                  fullName={risk.name}
                  variant="secondary"
                />
              ))}
              {disease.risks.length > 3 && (
                <Badge variant="muted" className={styles['more-badge']}>
                  +{disease.risks.length - 3}
                </Badge>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
