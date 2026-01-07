import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonIntent = 'primary' | 'secondary' | 'neutral' | 'destructive';
export type ButtonVariant = 'filled' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

type BaseButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'>;
export interface ButtonProps extends BaseButtonProps {
  asChild?: boolean;
  intent?: ButtonIntent;
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: boolean;
  preloaded?: boolean;
  isSelected?: boolean;
  fullWidth?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}
