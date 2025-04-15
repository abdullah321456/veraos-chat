'use client';

import React, { forwardRef } from 'react';

import cn from '@/lib/utils/cn';

// import { Loader } from '../loader';

export const buttonVariantStyles = {
  solid: {
    base: 'border border-transparent dark:backdrop-blur ',
    color: {
      primary: 'bg-primary hover:bg-primary-dark focus-visible:ring-muted text-white',
      secondary:
        'bg-secondary hover:bg-secondary-dark dark:hover:bg-secondary/80 focus-visible:ring-secondary/30 text-secondary-foreground',
      danger: 'bg-red-500 hover:bg-red-700 focus-visible:ring-danger/30 text-white',
    },
  },
  flat: {
    base: 'border-transparent backdrop-blur bg-muted',
    color: {
      primary: 'bg-primary/20 hover:bg-primary/[.25] focus-visible:ring-transparent text-primary',
      secondary: 'hover:bg-secondary-lighter focus-visible:ring-secondary-lighter hover:text-secondary-dark',
      danger: 'bg-red-lighter focus-visible:ring-red-lighter text-red-dark',
    },
  },
  outline: {
    base: 'bg-transparent border dark:backdrop-blur',
    color: {
      primary: 'focus-visible:ring-muted border-primary hover:bg-primary/[.05] text-primary hover:text-primary hover:border-primary',
      secondary: 'focus-visible:ring-secondary-lighter hover:text-secondary hover:border-secondary',
      danger: 'focus-visible:ring-red-500 text-red-500 hover:text-red-500 border-red-500 hover:border-red-700 ',
    },
  },
  text: {
    base: '',
    color: {
      primary: 'hover:text-primary text-primary focus-visible:ring-transparent',
      secondary: 'hover:text-secondary focus-visible:ring-secondary-lighter',
      danger: 'text-red-500',
    },
  },
};

const buttonDisabledStyles: {
  [key: string]: string;
} = {
  solid: 'cursor-not-allowed pointer-events-none bg-[#9599A3] text-white backdrop-blur-xl hover:border-muted hover:bg-[#9599A3]',
  flat: 'cursor-not-allowed pointer-events-none bg-[#9599A3] text-white border-muted bg-muted/70 text-muted-foreground backdrop-blur-xl hover:border-muted hover:bg-muted/70',
  outline:
    'cursor-not-allowed pointer-events-none bg-[#9599A3] text-white border-muted bg-muted/70 text-muted-foreground backdrop-blur-xl hover:border-muted hover:bg-muted/70',
  text: 'cursor-not-allowed pointer-events-none bg-[#9599A3] text-white border-muted bg-muted/70 text-muted-foreground backdrop-blur-xl hover:border-muted hover:bg-muted/70',
};

const buttonStyles = {
  base: 'inline-flex cursor-pointer rounded-full items-center justify-center focus:outline-none focus-visible:ring-[1.8px] focus-visible:ring-offset-2 ring-offset-background transition-colors duration-200 active:enabled:scale-[.985]',
  disabled: buttonDisabledStyles,
  size: {
    sm: 'px-2.5 py-1 text-xs h-8 font-medium',
    md: 'px-5 py-3 text-sm h-10 font-medium',
    lg: 'px-5 py-2 text-base h-12 font-semibold',
  },
  variant: buttonVariantStyles,
};

export type ButtonProps = {
  as?: 'button' | 'span';
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: keyof typeof buttonStyles.variant;
  size?: keyof typeof buttonStyles.size;
  color?: keyof (typeof buttonStyles.variant)['solid']['color'];
  disabled?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.HTMLAttributes<HTMLSpanElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      isLoading,
      as = 'button',
      type = 'button',
      variant = 'solid',
      size = 'md',
      color = 'primary',
      disabled,
      ...buttonProps
    },
    ref
  ) => {
    const Component = as;
    const variantStyle = buttonStyles.variant[variant];
    return (
      <Component
        ref={ref}
        disabled={disabled}
        className={cn(
          buttonStyles.base,
          buttonStyles.size[size],
          variantStyle.base,
          variantStyle.color[color],
          isLoading && 'pointer-events-none relative hover:cursor-progress',
          disabled && buttonStyles.disabled[variant],
          className
        )}
        {...(as && as !== 'span' && { type })}
        {...buttonProps}
      >
        {isLoading ? (
          <>
            <span className="opacity-30">{children}</span>
            <span
              className={cn(
                // `button-loader`,
                'absolute inset-0 flex h-full w-full items-center justify-center'
              )}
            >
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-b-0 border-r-0 border-current" />
            </span>
          </>
        ) : (
          <>{children}</>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';
