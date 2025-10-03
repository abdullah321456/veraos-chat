'use client';

import React, { forwardRef } from 'react';

import cn from '@/lib/utils/cn';

import { FieldError } from './field-error-text';
import { FieldHelperText } from './field-helper-text';

const fontWeightStyles = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const labelStyles = {
  weight: fontWeightStyles,
  size: {
    sm: 'text-xs mb-1',
    md: 'text-xs mb-2',
    lg: 'text-sm mb-1.5',
    xl: 'text-base mb-2',
  },
};

const switchLabelStyles = {
  weight: labelStyles.weight,
  size: labelStyles.size,
  margin: {
    left: {
      sm: 'me-1.5',
      md: 'me-2',
      lg: 'me-2.5',
      xl: 'me-3',
    },
    right: {
      sm: 'ms-1.5',
      md: 'ms-2',
      lg: 'ms-2.5',
      xl: 'ms-3',
    },
  },
};

export const roundedStyles = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  pill: 'rounded-full',
} as const;

const switchStyles = {
  base: 'flex items-center cursor-pointer transition duration-200 ease-in-out peer-focus/switch:ring-[1.5px] peer-focus/switch:ring-offset-2 peer-focus/switch:ring-muted ring-transparent ring-offset-background',
  active:
    'peer-checked/switch:bg-primary bg-slate-500 peer-checked/switch:border-primary',
  disabled:
    'cursor-not-allowed peer-disabled/switch:border-muted peer-disabled/switch:bg-muted/70 peer-disabled:backdrop-blur',
  rounded: roundedStyles,
  size: {
    sm: 'w-8 h-5',
    md: 'w-10 h-6',
    lg: 'w-12 h-7',
    xl: 'w-14 h-8',
  },
  icon: {
    size: {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'w-4 h-4',
      xl: 'w-5 h-5',
    },
  },
  variant: {
    flat: 'border border-transparent bg-muted/70 backdrop-blur group-hover/switch:bg-muted',
    outline:
      'border border-muted ring-[0.6px] ring-muted group-hover/switch:border-primary',
  },
};

const switchKnobStyles = {
  base: 'flex justify-center items-center transform ring-0 transition duration-200 ease-in-out',
  disabled: 'peer-disabled/switch:bg-muted peer-disabled/switch:shadow-none',
  outlineInactiveDisabled: 'cursor-not-allowed opacity-50',
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-md',
    pill: 'rounded-full',
  },
  size: {
    sm: 'w-3.5 h-3.5',
    md: 'w-[1.13rem] h-[1.13rem]',
    lg: 'w-[1.38rem] h-[1.38rem]',
    xl: 'w-[1.63rem] h-[1.63rem]',
  },
  color: 'bg-primary',
  outlineInactiveColor:
    '[&:hover_.rm-switch-knob]:bg-primary [&:hover_.rm-switch-knob]:text-primary-foreground',
  translate: {
    active: {
      sm: '[&:checked+span>.rm-switch-knob]:translate-x-[.88rem] rtl:[&:checked+span>.rm-switch-knob]:-translate-x-[.88rem]',
      md: '[&:checked+span>.rm-switch-knob]:translate-x-[1.14rem] rtl:[&:checked+span>.rm-switch-knob]:-translate-x-[1.14rem]',
      lg: '[&:checked+span>.rm-switch-knob]:translate-x-[1.36rem] rtl:[&:checked+span>.rm-switch-knob]:-translate-x-[1.36rem]',
      xl: '[&:checked+span>.rm-switch-knob]:translate-x-[1.6rem] rtl:[&:checked+span>.rm-switch-knob]:-translate-x-[1.6rem]',
    },
    inactive: 'translate-x-[2.5px] rtl:-translate-x-[2.5px]',
  },
};

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  labelPlacement?: keyof typeof switchLabelStyles.margin;
  labelWeight?: keyof typeof labelStyles.weight;
  rounded?: keyof typeof switchStyles.rounded;
  size?: keyof typeof switchLabelStyles.size;
  disabled?: boolean;
  variant?: keyof typeof switchStyles.variant;
  onIcon?: React.ReactNode;
  offIcon?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: string;
  labelClassName?: string;
  switchClassName?: string;
  switchKnobClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
  className?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      labelPlacement = 'right',
      labelWeight = 'medium',
      rounded = 'pill',
      size = 'md',
      variant = 'flat',
      disabled = false,
      onIcon,
      offIcon,
      error,
      helperText,
      className,
      labelClassName,
      switchClassName,
      switchKnobClassName,
      errorClassName,
      helperClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('rm-switch', className)}>
        <label
          className={cn(
            'group/switch my-2 inline-flex items-center',
            disabled && 'cursor-not-allowed opacity-50',
            labelPlacement === 'left' && 'flex-row-reverse',
            variant === 'outline' && [
              switchKnobStyles.outlineInactiveColor,
              disabled && switchKnobStyles.outlineInactiveDisabled,
            ]
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            disabled={disabled}
            className={cn(
              'peer/switch absolute -z-[1] opacity-0 [&:checked:enabled~span_.rm-switch-off-icon]:hidden [&:checked:enabled~span_.rm-switch-on-icon]:opacity-100',
              '[&:checked:enabled~span>.rm-switch-knob]:bg-white [&:checked:enabled~span>.rm-switch-knob]:text-black',
              switchKnobStyles.translate.active[size]
            )}
            {...props}
          />

          <span
            className={cn(
              switchStyles.base,
              switchStyles.size[size],
              switchStyles.rounded[rounded],
              switchStyles.variant[variant],
              switchStyles.active,
              disabled && switchStyles.disabled,
              switchClassName
            )}
          >
            <span
              className={cn(
                'rm-switch-knob relative',
                switchKnobStyles.base,
                switchKnobStyles.size[size],
                switchKnobStyles.rounded[rounded],
                switchKnobStyles.color,
                switchKnobStyles.translate.inactive,
                variant === 'flat' && [
                  'text-foreground bg-white shadow-sm',
                  disabled && 'bg-muted-foreground',
                ],
                variant === 'outline' && 'bg-muted text-foreground',
                switchKnobClassName
              )}
            >
              <span className="rm-switch-off-icon inline-flex items-center">
                {offIcon}
              </span>
              <span className="rm-switch-on-icon absolute inset-0 inline-flex items-center justify-center opacity-0">
                {onIcon || (
                  // HeroIcon: check
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={cn(switchStyles.icon.size[size], 'hidden')}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </span>
          </span>

          {label ? (
            <span
              className={cn(
                `switch-label`,
                switchLabelStyles.size[size],
                switchLabelStyles.weight[labelWeight],
                switchLabelStyles.margin[labelPlacement][size],
                disabled
                  ? 'text-muted-foreground cursor-not-allowed'
                  : 'cursor-pointer',
                labelPlacement === 'right' && 'order-last',
                'mb-0',
                labelClassName
              )}
            >
              {label}
            </span>
          ) : null}
        </label>

        {!error && helperText ? (
          <FieldHelperText
            size={size}
            className={cn(
              `switch-helper-text`,
              disabled && 'text-muted-foreground',
              helperClassName
            )}
          >
            {helperText}
          </FieldHelperText>
        ) : null}

        {error ? (
          <FieldError
            size={size}
            error={error}
            className={cn(`switch-error-text`, errorClassName)}
          />
        ) : null}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
