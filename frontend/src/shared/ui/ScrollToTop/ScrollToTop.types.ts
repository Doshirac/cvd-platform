import type { ButtonProps } from '../Button';

export interface ScrollToTopProps extends Omit<ButtonProps, 'children'> {
  visible?: boolean;
}
