'use client';
import Link from 'next/link';
import { SubmissionDoneVerifiedIcon } from './icons';
import { ROUTES } from '@/config/routes';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import { useSignup } from '../context/signup.context';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';
import { useState, useEffect } from 'react';

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

export function SubmissionDone() {
  const { basicInfo } = useSignup();
  const email = basicInfo?.email || '';
  const pendingApprovalUrl = email 
    ? `${ROUTES.AUTH.PENDING_APPROVAL}?email=${encodeURIComponent(email)}`
    : ROUTES.AUTH.PENDING_APPROVAL;
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
    <FadeAnimation>
      <div className="w-full max-w-[590px] mx-auto text-center space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-4 sm:px-6 md:px-0">
        <SubmissionDoneVerifiedIcon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
        <div className="space-y-2 sm:space-y-2.5">
          <h3 className="text-base sm:text-lg md:text-xl font-bold px-2" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>Account Submitted for Review.</h3>
          <p className="text-xs sm:text-sm md:text-base leading-5 sm:leading-6 px-2" style={{ color: isDarkMode ? '#A7A7A7' : '#6B7280' }}>
            Thank you! Your account request has been successfully submitted. Our team will review your details and notify you once approved.
          </p>
        </div>
        <div className="flex justify-center pt-4 sm:pt-6">
          <Link
            href={pendingApprovalUrl}
            className="rounded-[8px] px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-semibold duration-300 hover:opacity-90 w-full sm:w-auto max-w-[280px] sm:max-w-none"
            style={{
              background: 'linear-gradient(113.07deg, #5C39D9 15.59%, #7B6FFF 64.93%)'
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </FadeAnimation>
  );
}
