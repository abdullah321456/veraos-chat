'use client';

import React, { forwardRef, useState } from 'react';

import { useInteractiveEvent } from '@/lib/hooks/use-interactive-event';
import cn from '@/lib/utils/cn';

import { FieldClearButton } from '../field-clear-button';
import { FieldError } from '../field-error-text';
import { FieldHelperText } from '../field-helper-text';
import { inputLabelStyles } from '../styles/label-styles';
import { PasswordToggleIcon } from './password-toggle-icon';

const inputStyles = {
  base: 'flex items-center peer w-full transition duration-200 border [&.is-focus]:ring-[0.8px] ring-[0.6px] ring-[#E1E1E1] [&.is-hover]:border-[#E1E1E1] [&.is-focus]:border-primary [&.is-focus]:ring-primary font-medium shadow-md shadow-[#ccd3d94b] [&.is-focus]:shadow-primary/10',
  disabled: '!bg-muted/70 backdrop-blur cursor-not-allowed !border-muted',
  error: '!border-red-500 !ring-[1px] [&.is-hover]:!border-red-500 [&.is-focus]:!border-red-500 !ring-red-500 !bg-red-200/20',
  size: {
    sm: 'px-2 py-1 text-xs h-8',
    md: 'px-3.5 py-2 text-sm h-[42px]',
    lg: 'px-4 py-2 text-base h-12',
    xl: 'px-5 py-2.5 text-base h-14',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-lg',
    xl: 'rounded-[10px]',
    pill: 'rounded-full',
  },
  variant: {
    text: 'border-transparent ring-transparent bg-transparent',
    flat: 'border-0 ring-[#E1E1E1] [&.is-focus]:ring-[1px] [&.is-focus]:ring-[#B1B1B1] bg-[#F1F1F1]/50 [&.is-focus]:bg-[#F1F1F1]/30 backdrop-blur [&_input::placeholder]:opacity-100',
    outline: 'border-0 border-muted ring-[#E1E1E1] [&.is-focus]:ring-[1px] bg-transparent [&_input::placeholder]:opacity-100',
  },
};

const inputFieldStyles = {
  base: 'w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0',
  reset:
    '[&::-ms-clear]:hidden [&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
  disabled: 'cursor-not-allowed placeholder:text-gray-300 text-[#565555]/80',
  clearable:
    '[&:placeholder-shown~.input-clear-btn]:opacity-0 [&:placeholder-shown~.input-clear-btn]:invisible [&:not(:placeholder-shown)~.input-clear-btn]:opacity-100 [&:not(:placeholder-shown)~.input-clear-btn]:visible',
  prefix: {
    size: {
      sm: 'ps-1.5',
      md: 'ps-2.5',
      lg: 'ps-3.5',
      xl: 'ps-4',
    },
  },
  suffix: {
    size: {
      sm: 'pe-1.5',
      md: 'pe-2.5',
      lg: 'pe-3.5',
      xl: 'pe-4',
    },
  },
};

export interface PasswordProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'prefix'> {
  /** The variants of the component are: */
  variant?: keyof typeof inputStyles.variant;
  /** The size of the component. `"sm"` is equivalent to the dense input styling. */
  size?: keyof typeof inputStyles.size;
  /** The rounded variants are: */
  rounded?: keyof typeof inputStyles.rounded;
  /** Set input placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Set field label */
  label?: React.ReactNode;
  /** Set label font weight */
  labelWeight?: keyof typeof inputLabelStyles.weight;
  /** add clearable option */
  clearable?: boolean;
  /** clear event */
  onClear?: (event: React.MouseEvent) => void;
  /** The prefix is design for adding any icon or text on the Input field's start (it's a left icon for the `ltr` and right icon for the `rtl`) */
  prefix?: React.ReactNode;
  /** It is the password visibility toggle icon.  */
  visibilityToggleIcon?(visible: boolean): React.ReactNode;
  /** Add helper text. It could be string or a React component */
  helperText?: React.ReactNode;
  /** Show error message using this prop */
  error?: string;
  /** Override default CSS style of label */
  labelClassName?: string;
  /** Override default CSS style of input */
  inputClassName?: string;
  /** Override default CSS style of prefix */
  prefixClassName?: string;
  /** Override default CSS style of password show/hide toggle icon */
  visibilityToggleIconClassName?: string;
  /** Override default CSS style of helperText */
  helperClassName?: string;
  /** Override default CSS style of error message */
  errorClassName?: string;
  /** Add custom classes to the root of the component */
  className?: string;
  isRequired?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordProps>(
  (
    {
      className,
      variant = 'outline',
      size = 'md',
      rounded = 'xl',
      disabled,
      placeholder,
      label,
      labelWeight = 'medium',
      error,
      clearable,
      onClear,
      prefix,
      readOnly,
      helperText,
      labelClassName,
      inputClassName,
      errorClassName,
      helperClassName,
      prefixClassName,
      visibilityToggleIcon,
      visibilityToggleIconClassName,
      onFocus,
      onBlur,
      isRequired,
      ...inputProps
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const { isFocus, isHover, handleOnBlur, handleOnFocus, handleOnMouseEnter, handleOnMouseLeave } = useInteractiveEvent({
      readOnly,
      onBlur,
      onFocus,
    });

    return (
      <div className={cn(`password-root`, 'flex flex-col', className)}>
        <label className="block">
          {label ? (
            <span
              className={cn(
                `input-label`,
                'block',
                inputLabelStyles.color.black,
                inputLabelStyles.size[size],
                inputLabelStyles.weight[labelWeight],
                disabled && 'text-[#6D6F73]',
                labelClassName
              )}
            >
              {label} {isRequired && <span className="text-red-500">*</span>}
            </span>
          ) : null}

          <span
            className={cn(
              `password-container`,
              inputStyles.base,
              inputStyles.size[size],
              inputStyles.rounded[rounded],
              inputStyles.variant[variant],
              isHover && 'is-hover', // must have is-hover class based on mouse enter
              isFocus && 'is-focus', // must have is-focus class based on onFocus event
              disabled && inputStyles.disabled,
              error && inputStyles.error,
              inputClassName
            )}
            data-focus={isFocus}
            data-hover={isHover}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            {prefix ? <span className={cn(`password-prefix`, 'whitespace-nowrap leading-normal', prefixClassName)}>{prefix}</span> : null}

            <input
              ref={ref}
              type={visible ? 'text' : 'password'}
              disabled={disabled}
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
              readOnly={readOnly}
              spellCheck="false"
              // placeholder is a required prop for the clearable input component even if the user does not set any
              placeholder={placeholder || 'Screen reader only'}
              className={cn(
                `password-field`,
                inputFieldStyles.base,
                inputFieldStyles.reset,
                // it's important we are using placeholder-shown pseudo class to control input clear icon btn
                !placeholder && 'placeholder:opacity-0',
                disabled && inputFieldStyles.disabled,
                clearable && inputFieldStyles.clearable,
                prefix && inputFieldStyles.prefix.size[size],
                visibilityToggleIcon && inputFieldStyles.suffix.size[size]
              )}
              style={{ fontSize: 'inherit' }}
              {...inputProps}
            />

            {clearable ? <FieldClearButton size={size} onClick={onClear} hasSuffix /> : null}

            <span
              role="button"
              tabIndex={0}
              className={cn(
                `password-toggle-icon`,
                'whitespace-nowrap leading-normal',
                disabled && 'text-muted-foreground',
                visibilityToggleIconClassName
              )}
              onClick={() => {
                if (disabled) return false;
                setVisible((prevState) => !prevState);
              }}
            >
              {visibilityToggleIcon ? visibilityToggleIcon(visible) : <PasswordToggleIcon isVisible={visible} iconSize={size} />}
            </span>
          </span>
        </label>

        {!error && helperText ? (
          <FieldHelperText size={size} className={cn(`password-helper-text`, disabled && 'text-muted-foreground', helperClassName)}>
            {helperText}
          </FieldHelperText>
        ) : null}

        {error ? <FieldError size={size} error={error} className={cn(`password-error-text`, errorClassName)} /> : null}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
