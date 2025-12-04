'use client';
import { Button } from '@/components/atom/button';
import { ModalCloseIcon } from '@/components/atom/icons/ai-search/modal-close';
import { ROUTES } from '@/config/routes';
import useQueryParams from '@/lib/hooks/use-query-params';
import { parsePathnameWithQuery } from '@/lib/utils/parse-pathname-with-query';
import { trackDrawerExpand } from '@/lib/gtag';
import Link from 'next/link';
import { SVGProps, useEffect, ReactNode, useState } from 'react';
import { FullReportOverlay } from './full-report-overlay';
import { AIResponseDetail } from './type';
import { useDrawer } from '@/components/drawer-views/use-drawer';
import { FullReport } from '../../full-report/_view/full-report';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

type ConversationCtaProps = {
  message?: string | ReactNode;
  onShowFullReport?: (show: boolean) => void;
  fullReportDetails?: AIResponseDetail;
};

export function ConversationCta({ message, onShowFullReport, fullReportDetails }: ConversationCtaProps) {
  const { queryParams } = useQueryParams();
  const { openDrawer } = useDrawer();
  const [showFullReport, setShowFullReport] = useState(false);
  const [isLargeDevice, setIsLargeDevice] = useState(false);

  useEffect(() => {
    const checkDeviceSize = () => {
      setIsLargeDevice(window.innerWidth >= 640);
    };
    
    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  useEffect(() => {
    if (queryParams?.open_current_record_drawer) {
      handleFullReport();
    }
  }, [queryParams?.open_current_record_drawer]);

  function handleFullReport() {
    // Store the message and details in localStorage for the full report to access
    if (message || fullReportDetails) {
      try {
        // Convert message to string if it's not already
        const messageString = message ? (typeof message === 'string' ? message : String(message)) : '';
        
        const currentData = localStorage.getItem('fullReportDetails');
        let reportData = currentData ? JSON.parse(currentData) : {};
        
        // Store details if provided
        if (fullReportDetails) {
          reportData.details = fullReportDetails;
        }
        
        // If it's the new format, update the message
        if (reportData.details) {
          if (messageString) {
            reportData.message = messageString;
            // Also store message in details object
            reportData.details.message = messageString;
          }
        } else {
          // If it's the old format, create new format
          reportData = {
            details: fullReportDetails || {
              ...reportData,
              message: messageString
            },
            message: messageString
          };
        }
        
        console.log('Storing report data with message:', reportData);
        localStorage.setItem('fullReportDetails', JSON.stringify(reportData));
      } catch (e) {
        console.error('Error storing message:', e);
      }
    }
    
    if (isLargeDevice) {
      // Use overlay for large devices
      setShowFullReport(true);
      onShowFullReport?.(true);
    } else {
      // Use drawer for small devices
      openDrawer({
        closeOnPathnameChange: true,
        containerClassName: 'w-full sm:w-[470px]',
        view: (
          <div className="h-screen">
            <DrawerHeader details={fullReportDetails} />
            <div className="h-[calc(100vh-56px)] overflow-y-auto">
              <FullReport isDrawer details={fullReportDetails} />
            </div>
          </div>
        ),
      });
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 px-2 sm:px-4 md:px-8 lg:px-16 pt-3 relative">
        <Button variant="outline" size="md" disableTitleCase className="w-full sm:w-auto">
          View Matching Records
        </Button>
        <Button onClick={handleFullReport} size="md" disableTitleCase className="w-full sm:w-auto">
          Full Report
        </Button>
        {/* Only show overlay on large devices - positioned relative to parent */}
        {isLargeDevice && (
          <FullReportOverlay 
            isOpen={showFullReport} 
            onClose={() => {
              setShowFullReport(false);
              onShowFullReport?.(false);
            }} 
            details={fullReportDetails}
          />
        )}
      </div>
    </>
  );
}

export function DrawerHeader({ details }: { details?: any } = {}) {
  const { closeDrawer } = useDrawer();
  const { queryParams, removeQueryParams } = useQueryParams();
  const darkModeContext = useDarkMode();
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  
  // Helper to get dark mode from localStorage
  const getDarkModeFromStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('darkMode');
        // The context saves as String(isDarkMode), so it's 'true' or 'false'
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
    const storageValue = getDarkModeFromStorage();
    const contextValue = darkModeContext.isDarkMode;
    // Use context if it's explicitly true, otherwise trust localStorage
    return contextValue === true ? true : storageValue;
  });

  useEffect(() => {
    const checkDevice = () => {
      setIsSmallDevice(window.innerWidth < 640);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    const updateDarkMode = () => {
      const storageValue = getDarkModeFromStorage();
      const contextValue = darkModeContext.isDarkMode;
      // Prefer context if it's true, otherwise use storage
      const newValue = contextValue === true ? true : storageValue;
      setIsDarkMode(newValue);
    };

    // Initial update
    updateDarkMode();

    // Listen to storage events (from other tabs)
    window.addEventListener('storage', updateDarkMode);
    
    // Poll localStorage frequently for same-tab changes
    const interval = setInterval(updateDarkMode, 100);
    
    return () => {
      window.removeEventListener('storage', updateDarkMode);
      clearInterval(interval);
    };
  }, [darkModeContext.isDarkMode]);

  function handleClose() {
    if (queryParams?.open_current_record_drawer) {
      removeQueryParams(['open_current_record_drawer']);
    }
    closeDrawer();
  }

  function handleExpand() {
    if (details) {
      try {
        localStorage.setItem('fullReportDetails', JSON.stringify(details));
        // Track drawer expand event
        trackDrawerExpand('full_report');
      } catch (e) {
        // fallback: ignore
      }
    }
  }

  // Use gradient for dark mode on small devices, solid color for large devices
  const headerBg = isDarkMode 
    ? (isSmallDevice 
        ? 'linear-gradient(143.11deg, #22252A 4.37%, #1F2736 78.56%)' 
        : '#404652')
    : '#F3F4F6';
  
  const textColor = isDarkMode ? '#FFFFFF' : '#4B5563';
  const hoverTextColor = isDarkMode ? '#C0AEFF' : '#111827';
  const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.3)' : '#6B7280';
  const expandIconColor = isDarkMode ? '#FFFFFF' : '#4B5563';
  const expandIconHoverColor = isDarkMode ? '#C0AEFF' : '#111827';

  // Use 'background' for gradients, 'backgroundColor' for solid colors
  const headerStyle = typeof headerBg === 'string' && headerBg.startsWith('linear-gradient')
    ? { background: headerBg }
    : { backgroundColor: headerBg };

  return (
    <div 
      className="h-14 flex items-center justify-between px-3 sm:px-4 py-2"
      style={headerStyle}
    >
      <button
        type="button"
        onClick={handleClose}
        className="flex items-center gap-2 transition-colors"
        style={{ color: textColor }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = hoverTextColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = textColor;
        }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Back to Previous Results</span>
      </button>
      <div className="flex items-center gap-3 sm:gap-5">
        <Link 
          href={parsePathnameWithQuery(ROUTES.AI_SEARCH.FULL_REPORT, queryParams)} 
          onClick={handleExpand} 
          className="hidden sm:block transition-colors"
          style={{ color: expandIconColor }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = expandIconHoverColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = expandIconColor;
          }}
        >
          <DrawerHeaderExpandIcon 
            className="w-4 h-4 sm:w-5 sm:h-5" 
            style={{ color: 'currentColor' }}
          />
        </Link>
        <button 
          onClick={handleClose} 
          className="border-2 rounded-full transition-colors"
          style={{ borderColor: borderColor }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.5)' : '#111827';
            const icon = e.currentTarget.querySelector('svg');
            if (icon) {
              icon.style.color = hoverTextColor;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = borderColor;
            const icon = e.currentTarget.querySelector('svg');
            if (icon) {
              icon.style.color = textColor;
            }
          }}
        >
          <ModalCloseIcon style={{ color: textColor }} />
        </button>
      </div>
    </div>
  );
}

const DrawerHeaderExpandIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" fill="none" {...props}>
    <g clipPath="url(#a_DrawerHeaderExpandIcon)">
      <path
        fill="currentColor"
        d="M5.25 1.313V0H.656A.656.656 0 0 0 0 .656V5.25h1.313V2.238l6.096 6.096.925-.925-6.096-6.096H5.25ZM20.344 0H15.75v1.313h3.012l-6.096 6.096.925.925 6.097-6.096V5.25H21V.656A.656.656 0 0 0 20.344 0Zm-.657 18.762-6.096-6.096-.925.925 6.096 6.097H15.75V21h4.594a.656.656 0 0 0 .656-.656V15.75h-1.313v3.012ZM7.41 12.66l-6.096 6.103V15.75H0v4.594c0 .362.294.656.656.656H5.25v-1.313H2.238l6.096-6.096-.925-.932Z"
      />
    </g>
    <defs>
      <clipPath id="a_DrawerHeaderExpandIcon">
        <path fill="#fff" d="M0 0h21v21H0z" />
      </clipPath>
    </defs>
  </svg>
);
