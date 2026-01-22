import classNames from 'classnames';
import { type InputProps } from '@shared/ui/Input';
import { Icon, iconSizes, iconColors } from '@shared/ui/Icon';
import styles from './Input.module.scss';

export const Input = ({
  label,
  id,
  error = false,
  helperText,
  className,
  fullWidth = false,
  disabled,
  typographyClass = 'regular-16',
  labelTypographyClass = 'semibold-16',
  helperTypographyClass = 'regular-14',
  multiline = false,
  rows = 3,
  value,
  placeholder,
  onChange,
  ...rest
}: InputProps & {
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) => {
  return (
    <div className={classNames(styles.wrapper)}>
      {label && (
        <label
          className={classNames(styles.label, labelTypographyClass, {
            [styles['disabled-label']]: disabled,
          })}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          id={id}
          className={classNames(
            styles.input,
            typographyClass,
            {
              [styles.error]: error,
              [styles.disabled]: disabled,
              [styles['full-width']]: fullWidth,
            },
            className
          )}
          disabled={disabled}
          aria-invalid={error}
          rows={rows}
          value={value as string}
          placeholder={placeholder}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
        />
      ) : (
        <input
          id={id}
          className={classNames(
            styles.input,
            typographyClass,
            {
              [styles.error]: error,
              [styles.disabled]: disabled,
              [styles['full-width']]: fullWidth,
            },
            className
          )}
          disabled={disabled}
          aria-invalid={error}
          value={value}
          placeholder={placeholder}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          {...rest}
        />
      )}
      {helperText && (
        <span
          className={classNames(styles.helper, helperTypographyClass, {
            [styles['error-helper']]: error,
          })}
        >
          <Icon
            name="INFO"
            size={iconSizes.SMALL}
            color={error ? iconColors.DANGER : iconColors.MUTED}
          />
          {helperText}
        </span>
      )}
    </div>
  );
};
