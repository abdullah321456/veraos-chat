'use client';
import { Button } from '@/components/atom/button';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { ROUTES } from '@/config/routes';
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

function PendingApprovalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') || '';
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

  const handleRefreshStatus = () => {
    // Navigate to login page
    router.push(ROUTES.AUTH.LOGIN);
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:support@veraos.com';
  };

  return (
    <div className="w-full max-w-[700px] mx-auto text-center flex flex-col min-h-[calc(100vh-200px)]">
      <div className="flex-1 flex flex-col justify-center">
        {/* Padlock Icon */}
        <div className="flex justify-center mb-6">
          <svg 
            className="w-[55px] h-[55px] text-[#5C39D9]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{
              filter: 'drop-shadow(0 4px 6px rgba(92, 57, 217, 0.2))'
            }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
            />
          </svg>
        </div>

        {/* Main Heading */}
        <h1 className="text-[24px] font-bold mb-4" style={{ color: isDarkMode ? '#FFFFFF' : '#2D2A2A' }}>
          Your account is pending approval.
        </h1>

        {/* First Paragraph */}
        <p className="text-[14px] mb-4" style={{ color: isDarkMode ? '#FFFFFF' : '#2D2A2A' }}>
          Thank you for signing up. Your request is under review. Once approved, return to this page to begin using Overwatch.
        </p>

        {/* Second Paragraph */}
        <p className="text-[14px] mb-8" style={{ color: isDarkMode ? '#FFFFFF' : '#2D2A2A' }}>
          For security reasons, all features remain disabled until your account is approved.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-6">
          <Button
            onClick={handleContactSupport}
            variant="outline"
            className="border-[#5C39D9] text-[#5C39D9] hover:bg-[#5C39D9] hover:text-white rounded-[8px]"
          >
            Contact Support
          </Button>
          <Button
            onClick={handleRefreshStatus}
            className="text-white rounded-[8px] border-0"
            style={{
              background: 'linear-gradient(113.07deg, #5C39D9 15.59%, #7B6FFF 64.93%)'
            }}
          >
            Refresh Status
          </Button>
        </div>

        {/* Email Notification */}
        {email && (
          <p className="text-[14px] mb-8" style={{ color: isDarkMode ? '#FFFFFF' : '#2D2A2A' }}>
            You&apos;ll receive an email at <span className="font-medium">{email}</span> when your account is approved.
          </p>
        )}
      </div>

      {/* Footer - Aligned at bottom */}
      <p className="text-sm mt-auto" style={{ color: isDarkMode ? '#A7A7A7' : '#6B7280' }}>
        Need help? Contact{' '}
        <a 
          href="mailto:support@veraos.com" 
          className="underline font-bold"
          style={{ color: isDarkMode ? '#C0AEFF' : '#5C39D9' }}
        >
          support@veraos.com
        </a>
      </p>
    </div>
  );
}

export function PendingApprovalForm() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-[700px] mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="w-[55px] h-[55px] bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto animate-pulse"></div>
      </div>
    }>
      <PendingApprovalContent />
    </Suspense>
  );
}

