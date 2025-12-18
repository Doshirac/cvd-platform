import classNames from 'classnames';
import styles from './Icon.module.scss';
import type { IconProps } from './Icon.types';
import { iconMap, iconSizes, iconColors } from './Icon.constants';

export const Icon = ({
  name,
  size = iconSizes.MEDIUM,
  color = iconColors.PRIMARY,
  ariaLabel,
  className,
}: IconProps) => {
  const LucideIcon = iconMap[name];

  if (!LucideIcon) return null;

  return (
    <span
      role="img"
      aria-label={ariaLabel ?? `${name} icon`}
      className={classNames(styles.icon, styles[size], styles[color], className)}
    >
      <LucideIcon size="100%" strokeWidth={1.75} />
    </span>
  );
};
