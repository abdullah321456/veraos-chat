'use client';

import { FullReport } from '../../full-report/_view/full-report';
import { AIResponseDetail } from './type';
import Image from 'next/image';
import cn from '@/lib/utils/cn';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  details?: AIResponseDetail;
};

export function FullReportOverlay({ isOpen, onClose, details }: Props) {
  const { isDarkMode } = useDarkMode();

  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const overlayBgStyle = isDarkMode
    ? { background: 'linear-gradient(143.11deg, #22252A 4.37%, #1F2736 78.56%)' }
    : { background: 'white' };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 sm:bg-transparent z-40"
        onClick={handleClose}
      />

      {/* Full Report Container - positioned within conversation area on large devices only */}
      {/* Takes full width of conversation container on large devices */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 w-full h-[90vh] z-50 pr-2',
          'shadow-xl',
          'overflow-hidden flex flex-col',
          // Mobile: full width bottom sheet
          // Large devices: positioned within conversation container, full height
          'sm:absolute sm:inset-0 sm:h-full'
        )}
        style={overlayBgStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center gap-2 transition-colors"
            style={isDarkMode ? { color: '#FFFFFF' } : { color: '#4B5563' }}
            onMouseEnter={(e) => {
              if (isDarkMode) {
                e.currentTarget.style.color = '#FFFFFF';
              } else {
                e.currentTarget.style.color = '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (isDarkMode) {
                e.currentTarget.style.color = '#FFFFFF';
              } else {
                e.currentTarget.style.color = '#4B5563';
              }
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Previous Results</span>
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer flex-shrink-0 hover:opacity-70 transition-opacity"
            aria-label="Close"
          >
            <Image
              src="/cancel-circle.svg"
              alt="Close"
              width={24}
              height={24}
              className={cn("w-5 h-5 sm:w-6 sm:h-6", isDarkMode && "brightness-0 invert")}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <FullReport isDrawer={true} details={details} />
        </div>
      </div>
    </>
  );
}

