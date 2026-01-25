import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { selectDiseases } from '@shared/api/diseases/diseasesSlice';
import { fetchDiseases } from '@shared/api/diseases/diseasesThunks';
import type { RootState, AppDispatch } from '@app/providers/StoreProvider/config/store';
import type { Disease } from '@shared/api/diseases/diseases.types';
import { Loader } from '@shared/ui/Loader';
import { ResourceNotFound } from '@shared/ui/ResourceNotFound';
import { Button } from '@shared/ui/Button';
import { Badge } from '@shared/ui/Badge';
import { TabPanel } from '@shared/ui/TabPanel';
import { TooltipBadge } from '@shared/ui/TooltipBadge';
import { Icon } from '@shared/ui/Icon';
import styles from './DiseasePage.module.scss';

export function DiseasePage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const diseases = useSelector(selectDiseases);
  const loading = useSelector((state: RootState) => state.diseases.loading);
  const error = useSelector((state: RootState) => state.diseases.error);
  
  const [disease, setDisease] = useState<Disease | null>(null);

  useEffect(() => {
    if (diseases.length === 0 && !loading) {
      dispatch(fetchDiseases({ locale: i18n.language, take: 100 }));
    }
  }, [diseases.length, loading, dispatch, i18n.language]);

  useEffect(() => {
    if (diseases.length > 0 && id) {
      const foundDisease = diseases.find((d) => d.id === parseInt(id, 10));
      setDisease(foundDisease || null);
    }
  }, [diseases, id]);

  const handleGoBack = () => {
    navigate('/');
  };

  if (loading && diseases.length === 0) {
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <ResourceNotFound
          title={t('common.error')}
          message={error}
        />
        <Button onClick={handleGoBack} variant="primary">
          {t('common.goBack')}
        </Button>
      </div>
    );
  }

  if (!disease) {
    return (
      <div className={styles.notFound}>
        <ResourceNotFound
          title={t('diseasePage.notFound')}
          message={t('diseasePage.notFoundMessage')}
        />
        <Button onClick={handleGoBack} variant="primary">
          {t('common.goBack')}
        </Button>
      </div>
    );
  }

  const tabs = [
    {
      id: 'overview',
      label: t('diseasePage.overview'),
      content: (
        <div className={styles.overviewGrid}>
          {/* Primary Symptoms Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{t('diseasePage.primarySymptoms')}</h3>
              <p className={styles.cardDescription}>{t('diseasePage.primarySymptomsDesc')}</p>
            </div>
            <div className={styles.cardContent}>
              {disease.symptoms && disease.symptoms.filter(s => s.priority === 'primary').length > 0 ? (
                <div className={styles.badgeList}>
                  {disease.symptoms.filter(s => s.priority === 'primary').map((symptom) => (
                    <TooltipBadge
                      key={symptom.code || symptom.name}
                      code={symptom.code || symptom.name}
                      fullName={symptom.name}
                      variant="primary"
                    />
                  ))}
                </div>
              ) : (
                <p className={styles.noData}>{t('diseasePage.noData')}</p>
              )}
            </div>
          </div>

          {/* Secondary Symptoms Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{t('diseasePage.secondarySymptoms')}</h3>
              <p className={styles.cardDescription}>{t('diseasePage.secondarySymptomsDesc')}</p>
            </div>
            <div className={styles.cardContent}>
              {disease.symptoms && disease.symptoms.filter(s => s.priority === 'secondary').length > 0 ? (
                <div className={styles.badgeList}>
                  {disease.symptoms.filter(s => s.priority === 'secondary').map((symptom) => (
                    <TooltipBadge
                      key={symptom.code || symptom.name}
                      code={symptom.code || symptom.name}
                      fullName={symptom.name}
                      variant="secondary"
                    />
                  ))}
                </div>
              ) : (
                <p className={styles.noData}>{t('diseasePage.noData')}</p>
              )}
            </div>
          </div>

          {/* Risk Factors Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{t('diseasePage.riskFactors')}</h3>
              <p className={styles.cardDescription}>{t('diseasePage.riskFactorsDesc')}</p>
            </div>
            <div className={styles.cardContent}>
              {disease.risks && disease.risks.length > 0 ? (
                <div className={styles.badgeList}>
                  {disease.risks.map((risk) => (
                    <TooltipBadge
                      key={risk.code || risk.name}
                      code={risk.code || risk.name}
                      fullName={risk.name}
                      variant="secondary"
                    />
                  ))}
                </div>
              ) : (
                <p className={styles.noData}>{t('diseasePage.noData')}</p>
              )}
            </div>
          </div>

          {/* Prevention Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{t('diseasePage.prevention')}</h3>
              <p className={styles.cardDescription}>{t('diseasePage.preventionDesc')}</p>
            </div>
            <div className={styles.cardContent}>
              {disease.prevention ? (
                <p className={styles.text}>{disease.prevention}</p>
              ) : (
                <p className={styles.noData}>{t('diseasePage.noData')}</p>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'symptoms',
      label: t('diseasePage.symptoms'),
      content: (
        <div className={styles.symptomsContainer}>
          {/* Primary Symptoms Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{t('diseasePage.primarySymptoms')}</h3>
              <p className={styles.cardDescription}>{t('diseasePage.primarySymptomsDesc')}</p>
            </div>
            <div className={styles.cardContent}>
              {disease.symptoms && disease.symptoms.filter(s => s.priority === 'primary').length > 0 ? (
                <div className={styles.detailGrid}>
                  {disease.symptoms.filter(s => s.priority === 'primary').map((symptom) => (
                    <div key={symptom.code || symptom.name} className={styles.detailItem}>
                      <Badge variant="default" className={styles.detailBadge}>
                        {symptom.code || 'N/A'}
                      </Badge>
                      <p className={styles.detailName}>{symptom.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>{t('diseasePage.noData')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Secondary Symptoms Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{t('diseasePage.secondarySymptoms')}</h3>
              <p className={styles.cardDescription}>{t('diseasePage.secondarySymptomsDesc')}</p>
            </div>
            <div className={styles.cardContent}>
              {disease.symptoms && disease.symptoms.filter(s => s.priority === 'secondary').length > 0 ? (
                <div className={styles.detailGrid}>
                  {disease.symptoms.filter(s => s.priority === 'secondary').map((symptom) => (
                    <div key={symptom.code || symptom.name} className={styles.detailItemSecondary}>
                      <Badge variant="secondary" className={styles.detailBadge}>
                        {symptom.code || 'N/A'}
                      </Badge>
                      <p className={styles.detailName}>{symptom.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>{t('diseasePage.noData')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'risks',
      label: t('diseasePage.riskFactors'),
      content: (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{t('diseasePage.riskFactors')}</h3>
            <p className={styles.cardDescription}>{t('diseasePage.riskFactorsDesc')}</p>
          </div>
          <div className={styles.cardContent}>
            {disease.risks && disease.risks.length > 0 ? (
              <div className={styles.detailGrid}>
                {disease.risks.map((risk) => (
                  <div key={risk.code || risk.name} className={styles.detailItemSecondary}>
                    <Badge variant="secondary" className={styles.detailBadge}>
                      {risk.code || 'N/A'}
                    </Badge>
                    <p className={styles.detailName}>{risk.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>{t('diseasePage.noData')}</p>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 'prevention',
      label: t('diseasePage.prevention'),
      content: (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{t('diseasePage.prevention')}</h3>
            <p className={styles.cardDescription}>{t('diseasePage.preventionDesc')}</p>
          </div>
          <div className={styles.cardContent}>
            {disease.prevention ? (
              <p className={styles.text}>{disease.prevention}</p>
            ) : (
              <div className={styles.emptyState}>
                <p>{t('diseasePage.noData')}</p>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      {/* Back Button */}
      <div className={styles.backWrapper}>
        <Button onClick={handleGoBack} variant="secondary" className={styles.backButton}>
          <Icon name="ARROW_LEFT" size="small" color="inherit" />
          {t('diseasePage.backToDiseases')}
        </Button>
      </div>

      {/* Disease Header */}
      <article className={styles.article}>
        <header className={styles.header}>
          <Badge variant="default" className={styles.codeBadge}>
            #{disease.code}
          </Badge>
          <h1 className={styles.title}>{disease.name}</h1>
          {disease.description && (
            <p className={styles.description}>{disease.description}</p>
          )}
        </header>

        <div className={styles.separator} />

        {/* Tabs */}
        <TabPanel tabs={tabs} className={styles.tabs} />
      </article>
    </div>
  );
}
