'use client';

import cn from '@/lib/utils/cn';
import { useState, useEffect } from 'react';
import { PiTrash } from 'react-icons/pi';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

type InputDataCellProps = {
  label: string;
  values?: string[];
  onDone?: (value?: string) => void;
  editable?: boolean;
  entryPrefix?: React.ReactNode;
  addButtonLabel?: React.ReactNode;
  serial?: boolean;
  bullet?: boolean;
  rowClassName?: string;
  rowWrapperClassName?: string;
  rowTextClassName?: string;
  valueClassName?: string;
  newField?: React.ReactNode;
  blockRemoveButton?: boolean;
  onBlockRemove?: () => void;
};

export function InputArrayDataCell({
  label,
  values,
  entryPrefix,
  onDone,
  editable,
  addButtonLabel,
  serial,
  bullet,
  rowClassName,
  rowWrapperClassName,
  rowTextClassName,
  valueClassName,
  newField,
  blockRemoveButton,
  onBlockRemove,
}: InputDataCellProps) {
  const darkModeContext = useDarkMode();
  const prevValues = values ?? [];
  const [newValue, setNewValue] = useState('');
  const [newFieldState, setNewFieldState] = useState(newField ?? false);
  const [allValues, setAllValues] = useState([...prevValues]);
  
  // Helper to get dark mode from localStorage
  const getDarkModeFromStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('darkMode');
        return saved === 'true';
      } catch {
        return false;
      }
    }
    return false;
  };

  // Always read from localStorage as source of truth (works even in portals)
  // Also sync with context if it's available and true
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const storageValue = getDarkModeFromStorage();
    const contextValue = darkModeContext.isDarkMode;
    // Use context if it's explicitly true, otherwise trust localStorage
    return contextValue === true ? true : storageValue;
  });

  // Sync dark mode from context and localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateDarkMode = () => {
      const storageValue = getDarkModeFromStorage();
      const contextValue = darkModeContext.isDarkMode;
      // Prefer context if it's true, otherwise use storage
      const newValue = contextValue === true ? true : storageValue;
      setIsDarkMode(newValue);
    };

    // Initial update immediately
    updateDarkMode();

    // Listen to storage events (from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'darkMode') {
        updateDarkMode();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    // Poll localStorage frequently for same-tab changes (more aggressive polling)
    const interval = setInterval(updateDarkMode, 50);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [darkModeContext.isDarkMode]);

  // Ensure allValues updates when values prop changes
  useEffect(() => {
    setAllValues([...prevValues]);
  }, [JSON.stringify(prevValues)]);

  const handleDone = () => {
    if (!editable) return;
    setAllValues((prev) => [...prev, newValue]);
    setNewValue('');
    setNewFieldState(false);
    onDone?.(newValue);
  };

  function remove(index: number) {
    if (!editable) return;
    setAllValues((prev) => prev.filter((_, i) => i !== index));
  }

  const addButton = (
    <button onClick={() => setNewFieldState(true)} className="text-xs" style={{ color: isDarkMode ? '#C0AEFF' : '#5C39D9' }}>
      +Add {addButtonLabel && addButtonLabel}
    </button>
  );
  const doneButton = (
    <button onClick={handleDone} className="text-xs" style={{ color: isDarkMode ? '#C0AEFF' : '#5C39D9' }}>
      Done
    </button>
  );

  const removeButton = (
    <button
      onClick={() => {
        if (blockRemoveButton) {
          onBlockRemove?.();
          return;
        }
        remove(allValues.length - 1);
      }}
      className="text-red-500 text-xs"
    >
      - Remove
    </button>
  );

  const doneButtonVisibility = newValue && newFieldState;

  const containerBgStyle = isDarkMode 
    ? { background: '#404652', borderColor: 'rgba(255, 255, 255, 0.1)' }
    : { background: '#F9FAFB', borderColor: '#E5E7EB' };
  const rowBgStyle = isDarkMode 
    ? { background: '#404652' }
    : { background: '#F9FAFB' };

  return (
    <div className="border rounded-lg py-2 px-2.5" style={containerBgStyle}>
      <div className="flex justify-between relative mb-2.5">
        <p className="text-xs" style={{ color: isDarkMode ? '#FFFFFF' : undefined }}>{label}</p>
        {editable && (
          <div className="flex gap-2">
            <>{blockRemoveButton && removeButton}</>
            <>{!newFieldState && !newValue && addButton}</>
            <>{doneButtonVisibility && doneButton}</>
          </div>
        )}
      </div>
      <div className={cn('space-y-2.5', rowWrapperClassName)}>
        {allValues.map((val, index) => {
          const hasValueLabel = val?.includes(':');
          const valueLabel = hasValueLabel ? val?.split(':')[0] : '';
          const value = hasValueLabel ? val?.split(':')[1] : val;
          const isTransparent = rowClassName?.includes('bg-transparent');
          return (
            <div
              className={cn('flex justify-between items-center relative pe-7 gap-2 text-xs rounded py-3', rowClassName)}
              style={isTransparent ? {} : rowBgStyle}
              key={index}
            >
              <div className="flex items-center gap-1.5">
                {bullet && <Bullet isDarkMode={isDarkMode} />}
                {!!entryPrefix && <span className="flex-shrink-0">{entryPrefix}</span>}
                {serial && <span style={{ color: isDarkMode ? '#FFFFFF' : undefined }}>{index + 1}.</span>}
                <p title={val} className={cn('break-all', rowTextClassName)} style={{ color: isDarkMode ? '#FFFFFF' : undefined }}>
                  {hasValueLabel && <span className="font-semibold">{valueLabel + ':'}</span>}
                  {valueLabel?.toLowerCase() === 'facebook' && value ? (
                    <a 
                      href={`https://facebook.com/${value.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(valueClassName, 'hover:underline cursor-pointer')}
                      style={{ color: isDarkMode ? '#C0AEFF' : undefined }}
                    >
                      {value}
                    </a>
                  ) : (
                    <span className={valueClassName} style={{ color: isDarkMode ? '#FFFFFF' : undefined }}>{value}</span>
                  )}
                </p>
              </div>
              {editable && (
                <button onClick={() => remove(index)} className="text-red-500 absolute top-1/2 translate-y-[-50%] right-1.5">
                  <PiTrash size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>
      {newFieldState && editable && (
        <div className="relative mt-4 mb-1 pr-8">
          <input
            autoFocus
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-full rounded-md text-xs px-3 py-2 border-dashed border-2 border-primary font-medium focus:outline-none"
            style={isDarkMode 
              ? { background: '#404652', color: '#FFFFFF' }
              : { background: '#5C39D91A' }
            }
            onKeyDown={(e) => e.key === 'Enter' && handleDone()}
          />
          <button onClick={() => setNewFieldState(false)} className="text-red-500 absolute top-1/2 right-2 -translate-y-1/2">
            <PiTrash size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

function Bullet({ isDarkMode }: { isDarkMode: boolean }) {
  return <span className="inline-block min-w-1.5 max-w-1.5 h-1.5 rounded-full mt-[5px]" style={{ background: isDarkMode ? '#FFFFFF' : '#374151' }} />;
}
