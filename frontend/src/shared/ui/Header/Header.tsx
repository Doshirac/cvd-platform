import styles from './Header.module.scss';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { useBreakpoint } from '@shared/hooks';
import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '@shared/ui/ThemeToggle';
import { LanguageSwitcher } from '@shared/ui/LanguageSwitcher';
import * as motion from 'motion/react-client';
import { navItems, ROUTES, desktopBreakpoint, mobileBreakpoint } from './Header.constants';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const toggleMenu = () => setIsMobileMenuOpen(prev => !prev);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            <NavLink to={ROUTES.HOME} className={styles.logo}>
              <div className={styles['logo-icon']}>
                <Icon
                  name="HEART_PULSE"
                  size="medium"
                  color="white"
                  ariaLabel="CVD Platform logo"
                />
              </div>
              <span className={styles['logo-text']}>CVD Platform</span>
            </NavLink>

            {breakpoint === desktopBreakpoint && (
              <nav className={styles.nav}>
                {navItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      classNames(styles['nav-link'], { [styles.active]: isActive })
                    }
                  >
                    <Icon name={item.icon} size="small" ariaLabel={item.label} />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            )}
          </div>

          <div className={styles.right}>
            <LanguageSwitcher />
            <ThemeToggle />

            {breakpoint === mobileBreakpoint && (
              <Button
                size="icon"
                variant="secondary"
                className={styles['burger-button']}
                onClick={toggleMenu}
                aria-label="Toggle mobile menu"
              >
                <Icon name="MENU" size="medium" ariaLabel="Menu icon" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {breakpoint === 'mobile' && isMobileMenuOpen && (
        <div className={styles['mobile-menu-wrapper']}>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            onClick={toggleMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />

          {/* Slide-in Menu */}
          <motion.nav
            className={styles['mobile-menu']}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className={styles['mobile-menu-header']}>
              <span className={classNames(styles['mobile-menu-title'], 'medium-18')}>Menu</span>
              <Button
                size="icon"
                variant="secondary"
                onClick={toggleMenu}
                aria-label="Close mobile menu"
              >
                <Icon name="CLOSE" size="medium" ariaLabel="Close icon" />
              </Button>
            </div>

            <div className={styles['mobile-menu-items']}>
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    classNames(styles['mobile-nav-link'], { [styles.active]: isActive })
                  }
                  onClick={toggleMenu}
                >
                  <Icon name={item.icon} size="small" ariaLabel={item.label} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </motion.nav>
        </div>
      )}
    </>
  );
}
