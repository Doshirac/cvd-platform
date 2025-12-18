export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';
export type TypographyClass =
  | 'regular-14'
  | 'regular-16'
  | 'regular-18'
  | 'medium-14'
  | 'medium-16'
  | 'medium-18'
  | (string & {});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  typographyClass?: TypographyClass;
  fullWidth?: boolean;
}
