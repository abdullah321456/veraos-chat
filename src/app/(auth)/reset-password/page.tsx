'use client';

import { FadeAnimation } from '@/components/atom/fade-animatation';
import { AuthLogo } from '../_components/auth-logo';
import { AuthPageHeader } from '../_components/auth-page-header';
import { ResetPasswordForm } from './form';
import { Suspense, useState, useEffect } from 'react';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

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

function ResetPasswordContent() {
  return (
    <FadeAnimation>
      <AuthLogo />
      <AuthPageHeader title="Reset your password" />
      <ResetPasswordForm />
    </FadeAnimation>
  );
}

export default function ResetPasswordPage() {
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
      <Suspense fallback={
        <FadeAnimation>
          <AuthLogo />
          <AuthPageHeader title="Reset your password" />
          <div className="w-full max-w-[420px] mx-auto text-center px-4 sm:px-0">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-xs sm:text-sm mt-2" style={{ color: isDarkMode ? '#A7A7A7' : '#6B7280' }}>Loading...</p>
          </div>
        </FadeAnimation>
      }>
      <ResetPasswordContent />
    </Suspense>
  );
}
