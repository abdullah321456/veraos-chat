'use client';

import cn from '@/lib/utils/cn';
import { useEffect, useState } from 'react';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

type InputDataCellProps = {
  label: string;
  value?: string;
  onDone?: (value?: string) => void;
  editable?: boolean;
};

export function InputDataCell({ label, value, onDone, editable }: InputDataCellProps) {
  const darkModeContext = useDarkMode();
  const prevValue = value;
  const [isBlank, setIsBlank] = useState(!value);
  const [isDone, setIsDone] = useState(false);
  const [focused, setFocused] = useState(false);
  const [newValue, setNewValue] = useState(value);
  
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

  const requiredDone = prevValue !== newValue;

  function handleDone() {
    if (!editable) return;
    if (requiredDone) onDone?.(newValue);
    setIsDone(true);
    setFocused(false);
  }

  function handleFocus() {
    if (!editable) return;

    setFocused(true);
  }

  function handleBlur() {
    if (!editable) return;

    if (requiredDone && !isDone) return;
    setFocused(false);
  }

  useEffect(() => {
    if (!editable) return;
    if (requiredDone && !isDone) setIsDone(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, newValue]);

  if (editable && isBlank) {
    return (
      <button
        onClick={() => {
          setIsBlank(false);
          setFocused(true);
        }}
        className="rounded-md text-xs px-2.5 py-1.5 border-dashed border-2 border-primary font-medium text-primary h-14 flex items-center justify-center cursor-pointer"
      >
        + Add {label}
      </button>
    );
  }

  return (
    <div
      className={cn(
        'ring-[1px] min-h-14 text-xs rounded-md px-2.5 py-1.5 border-dashed border-2 border-primary/0',
        focused ? 'border-primary ring-gray-200/0' : (isDarkMode ? 'ring-white/10' : 'ring-gray-200')
      )}
      style={focused && isDarkMode ? { borderColor: 'rgba(255, 255, 255, 0.1)' } : {}}
    >
      <div className="flex justify-between w-full mb-1.5 relative">
        <p className="whitespace-nowrap" style={{ color: isDarkMode ? '#FFFFFF' : '#4B5563' }}>{label}</p>
        {requiredDone && !isDone && (
          <button onClick={handleDone}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px] absolute -top-0.5 -right-1"
              viewBox="0 0 19 19"
              fill="none"
            >
              <path
                fill="#5C39D9"
                d="M14.804 5.7a.765.765 0 0 0-1.109 0l-5.937 5.937-2.454-2.454a.765.765 0 0 0-1.108 0 .765.765 0 0 0 0 1.109L7.204 13.3a.718.718 0 0 0 .554.237.718.718 0 0 0 .554-.237l6.492-6.492a.765.765 0 0 0 0-1.108Z"
              />
            </svg>
          </button>
        )}
      </div>
      <div>
        {editable ? (
          <input
            autoFocus={false}
            type="text"
            value={newValue || '-'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => setNewValue(e.target.value)}
            className="focus:outline-none w-full text-[13px] font-semibold"
            style={{ color: isDarkMode ? '#FFFFFF' : undefined }}
          />
        ) : (
          <p className="text-[13px] font-semibold" style={{ color: isDarkMode ? '#FFFFFF' : undefined }}>{newValue || value}</p>
        )}
      </div>
    </div>
  );
}
