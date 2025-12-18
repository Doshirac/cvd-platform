import styles from './Header.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { Button } from '../Button';
import { Icon, iconNames, iconColors } from '../Icon';
// import UserProfile from '../UserProfile';
import { useBreakpoint } from '@shared/hooks';
import { useSelector } from 'react-redux';
import type { RootState } from '@app/providers/StoreProvider/config/store';
import { useNavigate, NavLink } from 'react-router-dom';
import { getOptionsByRole } from '@shared/utils/userRoleOptions';
import type { UserRole } from '@shared/utils/userRoleOptions';
import { Selector } from '@shared/ui/Selector';
import { useLogoutUser } from '@shared/hooks';
import { optionToRoute } from './Header.constants';
import { ThemeToggle } from '@shared/ui/ThemeToggle';
import { motion } from 'motion/react';
import { useTextMotion } from '@shared/hooks';
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const navigate = useNavigate();
  const logoutUser = useLogoutUser();
  const { y, dotY, nY, eY, wY, sY } = useTextMotion({ header: true });
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const isLoggedIn = !!token;
  const userRole: UserRole = (user?.role as UserRole) || 'USER';
  const availableOptions = getOptionsByRole(userRole);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const categoryOptions = [
    { label: 'All', value: 'all' },
    ...categories.map(c => ({ label: c.title, value: c.slug })),
  ];

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <>
      <header className={styles.header}>
        <NavLink id="home" to="/" className={styles.logo}>
          <motion.span
            className={styles['logo-half-1']}
            animate={{ y }}
            transition={{ type: 'spring' }}
          >
            m
          </motion.span>
          <motion.span
            className={styles['logo-half-2']}
            animate={{ y: dotY }}
            transition={{ type: 'spring' }}
          >
            .
          </motion.span>
          <motion.span
            className={styles['logo-half-2']}
            animate={{ y: nY }}
            transition={{ type: 'spring' }}
          >
            n
          </motion.span>
          <motion.span
            className={styles['logo-half-2']}
            animate={{ y: eY }}
            transition={{ type: 'spring' }}
          >
            e
          </motion.span>
          <motion.span
            className={styles['logo-half-2']}
            animate={{ y: wY }}
            transition={{ type: 'spring' }}
          >
            w
          </motion.span>
          <motion.span
            className={styles['logo-half-2']}
            animate={{ y: sY }}
            transition={{ type: 'spring' }}
          >
            s
          </motion.span>
        </NavLink>

        {breakpoint === 'desktop' ? (
          <nav>
            <div className={classNames(styles['links-container'], 'regular-24')}>
              <div className={styles.selector}>
                <Selector
                  typographyClass="regular-24"
                  dropdownHeight={181}
                  fullWidth={true}
                  options={categoryOptions}
                  onValueChange={value => {
                    if (value === 'all') {
                      navigate('/');
                    } else {
                      navigate(`/category/${value}`);
                    }
                    setIsMenuOpen(false);
                  }}
                />
              </div>
              <ThemeToggle />
              <div className={classNames(styles['buttons-container'])}>
                {isLoggedIn ? (
                  // <UserProfile role={userRole} />
                  <div>User Profile Placeholder</div>
                ) : (
                  <>
                    <Button variant="secondary" size="small" onClick={() => navigate('/login')}>
                      LOGIN
                    </Button>
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => navigate('/registration')}
                    >
                      REGISTER
                    </Button>
                  </>
                )}
              </div>
            </div>
          </nav>
        ) : (
          <nav className={classNames(styles['menu-container'], 'regular-16')}>
            <div className={`${styles['theme-toggle-mobile']}`}>
              <ThemeToggle />
            </div>
            <div onClick={toggleMenu} style={{ cursor: 'pointer' }}>
              <Icon name={iconNames.MENU} />
            </div>
            <div
              className={classNames(styles['menu-overlay'], { [styles.open]: isMenuOpen })}
              onClick={toggleMenu}
            />
            <div className={classNames(styles['menu-dropdown'], { [styles.open]: isMenuOpen })}>
              <div className={styles['menu-header']}>
                <div className={styles['cancel-button']} onClick={toggleMenu}>
                  <Icon name={iconNames.CANCEL} />
                </div>
              </div>
              <div className={styles['menu-items']}>
                <div className={styles.selector}>
                  <Selector
                    options={categoryOptions}
                    fullWidth
                    onValueChange={value => {
                      if (value === 'all') {
                        navigate('/');
                      } else {
                        navigate(`/category/${value}`);
                      }
                      toggleMenu();
                    }}
                  />
                </div>

                <hr className={styles.line} />
                {isLoggedIn ? (
                  <>
                    {availableOptions
                      .filter(option => option !== 'Logout')
                      .map(option => {
                        const route = optionToRoute[option] ?? '#';
                        return (
                          <NavLink key={option} to={route} onClick={toggleMenu}>
                            {option}
                          </NavLink>
                        );
                      })}
                    <hr className={styles.line} />
                    <NavLink to="/logout">
                      <div
                        onClick={() => {
                          logoutUser();
                          toggleMenu();
                        }}
                        className={styles['logout-link']}
                      >
                        <Icon name={iconNames.LOGOUT} color={iconColors.PRIMARY} />
                        <p>{availableOptions[availableOptions.length - 1]}</p>
                      </div>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" onClick={toggleMenu}>
                      <p className={styles['auth-link']}>Login</p>
                    </NavLink>
                    <NavLink to="/registration" onClick={toggleMenu}>
                      <p className={styles['auth-link']}>Register</p>
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
        {breakpoint !== 'desktop' && <hr className={styles['mobile-hr']} />}
      </header>
    </>
  );
}
