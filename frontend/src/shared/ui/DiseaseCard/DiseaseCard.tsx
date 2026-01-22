import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Badge } from '@shared/ui/Badge';
import { Icon } from '@shared/ui/Icon';
import { TooltipBadge } from '@shared/ui/TooltipBadge';
import { selectSymptoms, selectRiskFactors } from '@shared/api/diseases/diseasesSlice';
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
  const symptoms = useSelector(selectSymptoms);
  const riskFactors = useSelector(selectRiskFactors);

  const iconName = getIconForDisease(disease.id);

  // Helper functions to get full names
  const getSymptomName = (code: string) => {
    const symptom = symptoms.find(s => s.code === code);
    return symptom?.term || code;
  };

  const getRiskFactorName = (code: string) => {
    const riskFactor = riskFactors.find(rf => rf.code === code);
    return riskFactor?.name || code;
  };

  return (
    <div className={classNames(styles.card, 'group', className)}>
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
          <Icon name={iconName} size="large" />
        </div>

        {/* Primary Symptoms */}
        {disease.symptoms && disease.symptoms.length > 0 && (
          <section className={styles.section}>
            <h4 className={styles['section-title']}>
              {t('diseaseCard.primarySymptoms')}
            </h4>
            <div className={styles.badges}>
              {disease.symptoms.slice(0, 3).map((symptomCode, index) => (
                <TooltipBadge
                  key={index}
                  code={symptomCode}
                  fullName={getSymptomName(symptomCode)}
                  variant="primary"
                />
              ))}
              {disease.symptoms.length > 3 && (
                <Badge variant="outline" className={styles['more-badge']}>
                  +{disease.symptoms.length - 3}
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
              {disease.risks.slice(0, 3).map((riskCode, index) => (
                <TooltipBadge
                  key={index}
                  code={riskCode}
                  fullName={getRiskFactorName(riskCode)}
                  variant="secondary"
                />
              ))}
              {disease.risks.length > 3 && (
                <Badge variant="outline" className={styles['more-badge']}>
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
