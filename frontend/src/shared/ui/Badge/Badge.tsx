import classNames from 'classnames';
import type { BadgeProps } from './Badge.types';
import styles from './Badge.module.scss';

export const Badge = ({ variant = 'default', className, children }: BadgeProps) => {
  return (
    <span className={classNames(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
};
