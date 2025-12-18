import { Button } from '../Button';
import { Icon } from '../Icon';
import { iconSizes } from '../Icon';
import styles from './ScrollToTop.module.scss';
import type { ScrollToTopProps } from './ScrollToTop.types';
import classNames from 'classnames';

export const ScrollToTop = ({ visible = true, className, ...buttonProps }: ScrollToTopProps) => {
  if (!visible) return null;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      {...buttonProps}
      onClick={handleClick}
      size="icon"
      aria-label="Scroll to top"
      className={classNames(styles['scroll-to-top'], className)}
    >
      <Icon
        name="ARROW_UP"
        size={iconSizes.MEDIUM}
        className={classNames(styles.icon, className)}
      />
    </Button>
  );
};
