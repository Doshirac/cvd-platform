import { useState } from 'react';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import { useDropdown } from '@shared/hooks/useDropdown';
import styles from './LanguageSwitcher.module.scss';

export function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const { showDropdown, dropdownRef, handleDropdownClick, closeDropdown, containerRef } =
    useDropdown();

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    closeDropdown();
  };

  return (
    <div className={styles['language-switcher']} ref={containerRef}>
      <Button
        size="icon"
        variant="secondary"
        className={styles.button}
        onClick={() => handleDropdownClick()}
        aria-label="Language selection"
      >
        <Icon name="GLOBE" size="medium" className={styles.icon} ariaLabel="Language icon" />
      </Button>
      {showDropdown && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <div className={styles['dropdown-item']} onClick={() => handleLanguageChange('English')}>
            English {selectedLanguage === 'English' && '✓'}
          </div>
          <div className={styles['dropdown-item']} onClick={() => handleLanguageChange('Русский')}>
            Русский {selectedLanguage === 'Русский' && '✓'}
          </div>
        </div>
      )}
    </div>
  );
}
