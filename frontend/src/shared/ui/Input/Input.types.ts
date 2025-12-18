export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  className?: string;
  typographyClass?: string;
  labelTypographyClass?: string;
  helperTypographyClass?: string;
  multiline?: boolean;
  rows?: number;
}
