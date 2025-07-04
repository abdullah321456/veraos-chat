import { useInteractiveEvent } from '@/lib/hooks/use-interactive-event';
import cn from '@/lib/utils/cn';
import React, { forwardRef } from 'react';
import { toEnhancedTitleCase } from '@/lib/utils/title-case';
import { inputLabelStyles } from './styles/label-styles';
import { FieldHelperText } from './field-helper-text';
import { FieldError } from './field-error-text';

const textareaStyles = {
  base: 'block focus:outline-none bg-transparent w-full transition duration-200 border [&.is-focus]:ring-[0.8px] ring-[0.6px] ring-[#E1E1E1] [&.is-hover]:border-[#E1E1E1] [&.is-focus]:border-primary [&.is-focus]:ring-primary font-medium shadow-md shadow-[#ccd3d94b] [&.is-focus]:shadow-primary/10',
  scrollBar:
    '[scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-[2px] [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground [&::-webkit-scrollbar-track]:rounded-[2px] [&::-webkit-scrollbar-track]:bg-transparent',
  disabled: '!bg-muted/70 backdrop-blur cursor-not-allowed !border-muted placeholder:text-muted-foreground',
  clearable:
    '[&:placeholder-shown~.input-clear-btn]:opacity-0 [&:placeholder-shown~.input-clear-btn]:invisible [&:not(:placeholder-shown)~.input-clear-btn]:opacity-100 [&:not(:placeholder-shown)~.input-clear-btn]:visible',
  error: '!border-red-500 !ring-[1px] [&.is-hover]:!border-red-500 [&.is-focus]:!border-red-500 !ring-red-500 !bg-red-200/20',
  size: {
    sm: 'px-2 py-1 text-xs h-8',
    md: 'px-3.5 py-2 text-sm h-[120px]',
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

export interface TextareaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  /** Set custom rows */
  rows?: number;
  /** Set custom cols */
  cols?: number;
  /** Set custom max length of character */
  maxLength?: number;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Default value in textarea */
  children?: React.ReactNode;
  /** The size of the component. `"sm"` is equivalent to the dense input styling. */
  size?: keyof typeof textareaStyles.size;
  /** The variants of the component are: */
  variant?: keyof typeof textareaStyles.variant;
  /** Set field label */
  label?: React.ReactNode;
  /** Set font weight for label */
  labelWeight?: keyof typeof inputLabelStyles.weight;
  /** add clearable option */
  clearable?: boolean;
  /** clear event */
  onClear?: (event: React.MouseEvent) => void;
  /** The rounded variants are: */
  rounded?: keyof typeof textareaStyles.rounded;
  /** It is the password visibility toggle icon.  */
  renderCharacterCount?({ characterCount, maxLength }: { characterCount?: number; maxLength?: number }): React.ReactNode;
  /** Add helper text. It could be string or a React component */
  helperText?: React.ReactNode;
  /** Show error message using this prop */
  error?: string;
  /** Use labelClassName prop to do some addition style for the field label */
  labelClassName?: string;
  /** Add custom classes for the input filed extra style */
  textareaClassName?: string;
  /** This prop allows you to customize the helper message style */
  helperClassName?: string;
  /** This prop allows you to customize the error message style */
  errorClassName?: string;
  /** Add custom classes to the root of the component */
  className?: string;
  isRequired?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'outline',
      size = 'md',
      rounded = 'md',
      labelWeight = 'medium',
      cols,
      rows = 5,
      label,
      error,
      clearable,
      readOnly,
      disabled,
      className,
      labelClassName,
      textareaClassName,
      helperClassName,
      errorClassName,
      helperText,
      onFocus,
      onBlur,
      maxLength,
      placeholder,
      renderCharacterCount,
      onMouseEnter,
      onMouseLeave,
      isRequired,
      ...textareaProps
    },
    ref
  ) => {
    const { isFocus, isHover, handleOnBlur, handleOnFocus, handleOnMouseEnter, handleOnMouseLeave } = useInteractiveEvent({
      readOnly,
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
    });

    // Apply title case to label if it's a string
    const processedLabel = typeof label === 'string' ? toEnhancedTitleCase(label) : label;

    return (
      <div className={cn(`textarea-root`, 'flex flex-col', className)}>
        <label className="block">
          {label ? (
            <span
              className={cn(
                `textarea-label`,
                'block',
                inputLabelStyles.size[size],
                inputLabelStyles.weight[labelWeight],
                disabled && 'text-muted-foreground',
                labelClassName
              )}
            >
              {processedLabel} {isRequired && <span className="text-red-500"> *</span>}
            </span>
          ) : null}

          <span className="relative block">
            <textarea
              ref={ref}
              rows={rows}
              disabled={disabled}
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
              readOnly={readOnly}
              maxLength={maxLength}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
              {...(cols && { cols })}
              // placeholder is a required prop for the clearable input component even if the user does not set any
              placeholder={placeholder || 'Screen reader only'}
              className={cn(
                `textarea-field`,
                textareaStyles.base,
                textareaStyles.scrollBar,
                textareaStyles.size[size],
                textareaStyles.rounded[rounded],
                textareaStyles.variant[variant],
                clearable && textareaStyles.clearable,
                // it's important we are using placeholder-shown pseudo class to control input clear icon btn
                !placeholder && 'placeholder-shown:placeholder:opacity-0',
                isHover && 'is-hover', // must have is-focus class based on mouse enter
                isFocus && 'is-focus', // must have is-focus class based on onFocus event
                !cols && 'w-full',
                readOnly && 'focus:ring-0',
                disabled && textareaStyles.disabled,
                error && textareaStyles.error,
                textareaClassName
              )}
              {...textareaProps}
            />

            {renderCharacterCount &&
              renderCharacterCount({
                characterCount: String(textareaProps?.value).length,
                maxLength,
              })}
          </span>
        </label>

        {!error && helperText ? (
          <FieldHelperText size={size} className={cn(`textarea-helper-text`, disabled && 'text-muted-foreground', helperClassName)}>
            {helperText}
          </FieldHelperText>
        ) : null}

        {error ? <FieldError size={size} error={error} className={cn(`textarea-error-text`, errorClassName)} /> : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
