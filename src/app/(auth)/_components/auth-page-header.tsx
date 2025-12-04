'use client';

import cn from "@/lib/utils/cn";
import { useDarkMode } from '@/lib/contexts/dark-mode-context';
import { useState, useEffect } from 'react';

type Props = {
  title: string;
  className?: string;
  subtitle?: string;
};

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

export function AuthPageHeader({ title, className, subtitle }: Props) {
  const darkModeContext = useDarkMode();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const storageValue = getDarkModeFromStorage();
    const contextValue = darkModeContext.isDarkMode;
    return contextValue === true ? true : storageValue;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateDarkMode = () => {
      const storageValue = getDarkModeFromStorage();
      const contextValue = darkModeContext.isDarkMode;
      const newValue = contextValue === true ? true : storageValue;
      setIsDarkMode(newValue);
    };
    updateDarkMode();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'darkMode') updateDarkMode();
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(updateDarkMode, 50);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [darkModeContext.isDarkMode]);

  return (
    <div className={cn("text-center w-full", subtitle ? "mb-4 sm:mb-6" : "mb-6 sm:mb-8")}>
      <h1 className={cn("text-xl sm:text-2xl font-bold break-words", className)} style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{title}</h1>
      {subtitle && (
        <p className="text-xs sm:text-sm font-normal mt-2 break-words" style={{ color: isDarkMode ? '#A7A7A7' : '#808080' }}>{subtitle}</p>
      )}
    </div>
  );
}
