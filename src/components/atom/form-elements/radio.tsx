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

const radioLabelStyles = {
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

const radioStyles = {
  base: 'relative after:absolute rounded-full after:top-0 after:left-0 after:scale-[.6] after:h-full after:w-full after:rounded-full peer-checked:after:bg-purple peer-checked:border-purple',
  size: {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7',
  },
  variant: {
    outline: 'border border-gray-400',
    flat: 'border-0 bg-muted/70 backdrop-blur ring-muted/70 hover:enabled:bg-muted/90 dark:checked:!bg-transparent dark:checked:!ring-primary checked:!bg-primary',
  },
};

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: keyof typeof radioStyles.variant;
  size?: keyof typeof radioStyles.size;
  labelPlacement?: keyof typeof radioLabelStyles.margin;
  labelWeight?: keyof typeof labelStyles.weight;
  disabled?: boolean;
  label?: React.ReactNode;
  error?: string;
  helperText?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      variant = 'outline',
      size = 'sm',
      labelPlacement = 'right',
      labelWeight = 'medium',
      label,
      disabled,
      error,
      helperText,
      className,
      labelClassName,
      inputClassName,
      errorClassName,
      helperClassName,
      ...radioProps
    },
    ref
  ) => (
    <div className={cn(`radio-root`, 'flex flex-col', className)}>
      <label
        className={cn(
          `radio-container`,
          'flex cursor-pointer flex-row items-center',
          disabled && 'cursor-not-allowed opacity-70'
        )}
      >
        <input
          type="radio"
          ref={ref}
          disabled={disabled}
          className="radio-field peer hidden"
          {...radioProps}
        />

        <span
          className={cn(
            radioStyles.base,
            radioStyles.size[size],
            radioStyles.variant[variant],
            inputClassName
          )}
        ></span>

        {label ? (
          <span
            className={cn(
              `radio-label`,
              radioLabelStyles.size[size],
              radioLabelStyles.weight[labelWeight],
              radioLabelStyles.margin[labelPlacement][size],
              disabled && 'text-black/50',
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
            `radio-helper-text`,
            disabled && 'text-black/50',
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
          className={cn(`radio-error-text`, errorClassName)}
        />
      ) : null}
    </div>
  )
);

Radio.displayName = 'Radio';
