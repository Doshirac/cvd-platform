import { useTranslation } from 'react-i18next';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import { useDropdown } from '@shared/hooks/useDropdown';
import { changeLanguage } from '@shared/i18n';
import styles from './LanguageSwitcher.module.scss';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const { showDropdown, dropdownRef, handleDropdownClick, closeDropdown, containerRef } =
    useDropdown();

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
    closeDropdown();
  };

  const currentLanguage = i18n.language;

  return (
    <div className={styles['language-switcher']} ref={containerRef}>
      <Button
        size="icon"
        variant="secondary"
        className={styles.button}
        onClick={() => handleDropdownClick()}
        aria-label={t('header.languageSelection')}
      >
        <Icon name="GLOBE" size="medium" className={styles.icon} ariaLabel="Language icon" />
      </Button>
      {showDropdown && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <div className={styles['dropdown-item']} onClick={() => handleLanguageChange('en')}>
            {t('language.en')} {currentLanguage === 'en' && '✓'}
          </div>
          <div className={styles['dropdown-item']} onClick={() => handleLanguageChange('ru')}>
            {t('language.ru')} {currentLanguage === 'ru' && '✓'}
          </div>
        </div>
      )}
    </div>
  );
}
