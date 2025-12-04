/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { PiCaretDownBold } from 'react-icons/pi';

import cn from '@/lib/utils/cn';
import { toEnhancedTitleCase } from '@/lib/utils/title-case';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

import { Dropdown } from '@/components/atom/dropdown/dropdown';

import { FieldError } from './form-elements/field-error-text';

export type SelectProps = {
  options: any[];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  onSelect?: (value) => void;
  formatOption?: (option: any) => void;
  formatDisplay?: (option: any) => void;
  placeholder?: React.ReactNode;
  loadingPlaceholder?: React.ReactNode;
  selected?: any;
  dropdownClassName?: string;
  dropdownMenuClassName?: string;
  dropdownTriggerClassName?: string;
  dropdownTriggerButtonClassName?: string;
  dropdownOptionClassName?: string;
  label?: React.ReactNode;
  labelClassName?: string;
  inPortal?: boolean;
  loading?: boolean;
  error?: string;
  errorClassName?: string;
  disabled?: boolean;
  isRequired?: boolean;
};

export function Select({
  options,
  onSelect,
  formatOption,
  formatDisplay,
  placeholder = 'PLACEHOLDER ',
  loadingPlaceholder,
  selected = null,
  dropdownClassName,
  dropdownTriggerClassName,
  dropdownTriggerButtonClassName,
  dropdownMenuClassName,
  dropdownOptionClassName,
  label,
  labelClassName,
  inPortal = true,
  loading = false,
  error,
  errorClassName,
  disabled = false,
  isRequired = false,
}: SelectProps) {
  // const [selected, setSelected] = useState(value);

  function handleSelect(v: any) {
    // setSelected(v);
    onSelect?.(v);
  }

  const { isDarkMode } = useDarkMode();
  const display = formatDisplay ? formatDisplay(selected) : selected?.name;
  
  // Apply title case to label if it's a string
  const processedLabel = typeof label === 'string' ? toEnhancedTitleCase(label) : label;

  const labelColor = isDarkMode ? '#FFFFFF' : '#6D6F73';
  const dropdownBg = isDarkMode ? '#505662' : '#FFFFFF';
  const dropdownBorderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : undefined;
  const buttonTextColor = isDarkMode ? (selected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)') : (selected ? '#000000' : undefined);
  const menuBg = isDarkMode ? '#505662' : '#FFFFFF';
  const menuTextColor = isDarkMode ? '#FFFFFF' : undefined;

  return (
    <>
      <div>
        {label ? (
          <span 
            className={cn(`input-label`, 'mb-2 block text-xs font-medium', labelClassName)}
            style={{ color: labelColor }}
          >
            {processedLabel} {isRequired && <span className="text-red-500">*</span>}{' '}
          </span>
        ) : null}
        <Dropdown
          inPortal={inPortal}
          className={cn(
            'flex h-[42px] items-center shadow-md shadow-[#ccd3d94b] border-0 rounded-[10px] ring-[0.6px] text-sm',
            dropdownClassName,
            error && 'border-red-500 border bg-red-200/20 ',
            disabled && 'pointer-events-none'
          )}
          style={isDarkMode ? {
            backgroundColor: dropdownBg,
            borderColor: dropdownBorderColor,
            borderWidth: '1px',
            borderStyle: 'solid',
            ringColor: dropdownBorderColor,
          } : {
            ringColor: '#E1E1E1',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Dropdown.Trigger className={cn('w-full h-[42px]', dropdownTriggerClassName)}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            {({ open }: { open: boolean }) => (
              <button
                type="button"
                title={loading ? 'Loading...' : ''}
                className={cn(
                  'flex h-full w-full items-center justify-between px-3.5 text-sm truncate duration-200',
                  !isDarkMode && selected && 'selected text-black',
                  !isDarkMode && !selected && 'text-gray-500/80',
                  dropdownTriggerButtonClassName
                )}
                style={isDarkMode ? { color: buttonTextColor } : undefined}
              >
                {loading ? loadingPlaceholder : display || placeholder}
                <PiCaretDownBold className={cn('ml-3 h-auto w-4 opacity-50 duration-200', open && !loading && 'rotate-180')} />
              </button>
            )}
          </Dropdown.Trigger>
          {!loading && !disabled && (
            <Dropdown.Menu 
              className={cn('text-sm shadow-lg z-[9999]', dropdownMenuClassName)}
              style={{ backgroundColor: menuBg, color: menuTextColor, zIndex: 9999 }}
            >
              {options.map((opt) => {
                const isSelected = opt === selected;
                const option = (formatOption ? formatOption(opt) : opt.name) as React.ReactNode;
                
                // Apply title case to option name if it's a string
                const processedOption = typeof option === 'string' ? toEnhancedTitleCase(option) : option;

                return (
                  <Dropdown.Item
                    key={opt.id}
                    onClick={() => handleSelect(opt)}
                    className={cn(
                      'text-xs',
                      !isDarkMode && 'hover:bg-primary/10 hover:text-primary-dark',
                      isDarkMode && 'hover:bg-white/10',
                      opt.className,
                      isSelected && 'selected',
                      isSelected && opt.selectedClassName,
                      dropdownOptionClassName
                    )}
                    style={isDarkMode ? { color: menuTextColor } : undefined}
                  >
                    {processedOption}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          )}
        </Dropdown>
        {error ? <FieldError size="md" error={error} className={cn(`input-error-text`, errorClassName)} /> : null}
      </div>
    </>
  );
}

export function getSelected<O extends Record<string, any>, K extends keyof O>({
  value,
  options,
  key,
}: {
  value: O[K];
  options: O[];
  key: K;
}) {
  if (!key) {
    throw new Error('Key must be provided and valid.');
  }

  return options?.find((opt) => opt?.[key] === value) || null;
}
