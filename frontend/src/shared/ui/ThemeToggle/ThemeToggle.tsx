import { useTheme } from '@shared/hooks/useTheme';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import * as motion from 'motion/react-client';
import styles from './ThemeToggle.module.scss';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="secondary"
      className={styles['theme-toggle']}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <motion.div
        key={theme}
        initial={{ scale: 0.8, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.8, rotate: 180, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          duration: 0.3,
        }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Icon
          name={theme === 'light' ? 'SUN' : 'MOON'}
          size="medium"
          className={styles.icon}
          ariaLabel={theme === 'light' ? 'Light theme' : 'Dark theme'}
        />
      </motion.div>
    </Button>
  );
}
