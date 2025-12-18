import type { ButtonProps } from './Button.types';
import classNames from 'classnames';
import styles from './Button.module.scss';
import {
  defaultButtonSize,
  defaultButtonVariant,
  defaultTypographyClass,
} from './Button.constants';

export const Button = (props: ButtonProps) => {
  const {
    className,
    typographyClass = defaultTypographyClass,
    children,
    variant = defaultButtonVariant,
    size = defaultButtonSize,
    disabled,
    fullWidth,
    type = 'button',
    ...otherProps
  } = props;

  return (
    <button
      type={type}
      className={classNames(
        typographyClass,
        styles.button,
        styles[variant],
        styles[size],
        { [styles['full-width']]: fullWidth, [styles.disabled]: disabled },
        className
      )}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};
