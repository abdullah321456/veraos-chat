'use client';

import React, { forwardRef } from 'react';

import cn from '@/lib/utils/cn';

import { FieldError } from './field-error-text';
import { FieldHelperText } from './field-helper-text';
import { inputLabelStyles } from './styles/label-styles';

const checkboxLabelStyles = {
  weight: inputLabelStyles.weight,
  size: inputLabelStyles.size,
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

const checkboxStyles = {
  base: 'peer checked:bg-red-500 transition duration-200 ease-in-out',
  disabled:
    'disabled:bg-purple/70 disabled:backdrop-blur disabled:border-purple/30',
  size: {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-7 w-7',
    xl: 'h-8 w-8',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-md',
    full: 'rounded-full',
  },
  activeIcon:
    'peer-checked:opacity-100 absolute opacity-0 w-full h-full top-0 left-0 text-white',
  variant: {
    outline:
      'bg-transparent border border-gray-600 checked:!bg-primary checked:!border-primary hover:enabled:border-primary',
    flat: 'border-0 bg-primary/70 backdrop-blur hover:enabled:bg-primary checked:!bg-primary',
  },
};

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: keyof typeof checkboxStyles.variant;
  size?: keyof typeof checkboxStyles.size;
  labelWeight?: keyof typeof inputLabelStyles.weight;
  rounded?: keyof typeof checkboxStyles.rounded;
  labelPlacement?: keyof typeof checkboxLabelStyles.margin;
  disabled?: boolean;
  label?: React.ReactNode;
  error?: string;
  helperText?: React.ReactNode;
  iconClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      // variant = 'outline',
      size = 'md',
      // rounded = 'md',
      labelPlacement = 'right',
      labelWeight = 'medium',
      label,
      disabled,
      error,
      helperText,
      iconClassName,
      labelClassName,
      // inputClassName,
      errorClassName,
      helperClassName,
      className,
      ...checkboxProps
    },
    ref
  ) => (
    <div className={cn(`checkbox-root`, 'flex flex-col w-full min-w-0', className)}>
      <label
        className={cn(
          `checkbox-container`,
          'flex cursor-pointer flex-row items-center',
          disabled && 'cursor-not-allowed'
        )}
      >
        <span className="checkbox-span relative h-4 w-4 leading-none">
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className={cn(
              `checkbox-input peer relative hidden`
              // checkboxStyles.base,
              // checkboxStyles.disabled,
              // checkboxStyles.size[size],
              // checkboxStyles.rounded[rounded],
              // checkboxStyles.variant[variant],
              // inputClassName
            )}
            {...checkboxProps}
          />
          <span className="inline-block h-full w-full rounded-sm border-[1.5px] ring-[0.6px] ring-[#858d9d] border-[#858d9d] duration-200 peer-checked:border-primary peer-checked:bg-primary peer-checked:ring-primary"></span>
          <CheckmarkIcon
            className={cn(
              `checkbox-icon h-full w-full scale-75`,
              checkboxStyles.activeIcon,
              size === 'sm' && 'top-0.5',
              iconClassName
            )}
          />
        </span>

        {label ? (
          <span
            className={cn(
              `checkbox-label`,
              checkboxLabelStyles.size[size],
              checkboxLabelStyles.weight[labelWeight],
              checkboxLabelStyles.margin[labelPlacement][size],
              disabled && 'text-muted-foreground',
              labelPlacement === 'left' && 'order-first',
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
            `checkbox-helper-text`,
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
          className={cn(`checkbox-error-text`, errorClassName)}
        />
      ) : null}
    </div>
  )
);

Checkbox.displayName = 'Checkbox';

function CheckmarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  );
}
