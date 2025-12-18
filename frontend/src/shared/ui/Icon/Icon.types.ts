import type { IconColor, IconName, IconSize } from './Icon.constants';

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  ariaLabel?: string;
  className?: string;
}
