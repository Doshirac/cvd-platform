import type { ButtonSize, ButtonVariant, TypographyClass } from './Button.types';

export const buttonVariants: readonly ButtonVariant[] = ['primary', 'secondary'] as const;

export const buttonSizes: readonly ButtonSize[] = ['default', 'sm', 'lg', 'icon'] as const;

export const defaultButtonVariant: ButtonVariant = 'primary';
export const defaultButtonSize: ButtonSize = 'default';
export const defaultTypographyClass: TypographyClass = 'regular-16';
