'use client';

import { useDarkMode } from '@/lib/contexts/dark-mode-context';

export function RecentPayments() {
  const { isDarkMode } = useDarkMode();
  
  const cardBg = isDarkMode ? '#505662' : 'white';
  const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#F3F4F6';
  const headingColor = isDarkMode ? '#FFFFFF' : '#000000';
  const iconColor = isDarkMode ? '#A7A7A7' : '#9CA3AF';
  const textColor = isDarkMode ? '#FFFFFF' : '#111827';
  const subtextColor = isDarkMode ? '#A7A7A7' : '#6B7280';

  return (
    <div className="pb-4 sm:pb-6">
      <div 
        className="shadow-lg p-3 sm:p-4 border rounded-[10px]"
        style={{
          backgroundColor: cardBg,
          borderColor: borderColor
        }}
      >
        <h2 
          className="text-sm sm:text-base font-bold"
          style={{ color: headingColor }}
        >
          Recent Payments
        </h2>
        <div className="mt-4 sm:mt-6 py-6 sm:py-8 text-center">
          <div>
            <svg
              className="mx-auto h-10 w-10 sm:h-12 sm:w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              style={{ color: iconColor }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 
              className="mt-2 text-xs sm:text-sm font-medium"
              style={{ color: textColor }}
            >
              No recent payments
            </h3>
            <p 
              className="mt-1 text-xs sm:text-sm px-2 break-words"
              style={{ color: subtextColor }}
            >
              Your payment history will appear here once you make your first payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
