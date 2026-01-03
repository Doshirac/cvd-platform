import { useState, useEffect } from 'react';
import { Button } from '@shared/ui/Button';
import styles from './AlphabetPanel.module.scss';

interface AlphabetPanelProps {
  language?: 'en' | 'ru';
  selectedLetter?: string | null;
  onLetterSelect?: (letter: string | null) => void;
}

const englishLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const russianLetters = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯ'.split('');

export function AlphabetPanel({
  language = 'en',
  selectedLetter: externalSelectedLetter,
  onLetterSelect,
}: AlphabetPanelProps) {
  const [internalSelectedLetter, setInternalSelectedLetter] = useState<string | null>(null);

  const selectedLetter = externalSelectedLetter !== undefined ? externalSelectedLetter : internalSelectedLetter;

  const letters = language === 'en' ? englishLetters : russianLetters;

  useEffect(() => {
    // Reset selection when language changes
    if (onLetterSelect) {
      onLetterSelect(null);
    } else {
      setInternalSelectedLetter(null);
    }
  }, [language, onLetterSelect]);

  const handleLetterClick = (letter: string) => {
    const newSelection = selectedLetter === letter ? null : letter;
    
    if (onLetterSelect) {
      onLetterSelect(newSelection);
    } else {
      setInternalSelectedLetter(newSelection);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['scroll-area']}>
        <div className={styles.panel}>
          {letters.map((letter) => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleLetterClick(letter)}
              className={styles.button}
              aria-label={`Filter by letter ${letter}`}
              aria-pressed={selectedLetter === letter}
            >
              {letter}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
