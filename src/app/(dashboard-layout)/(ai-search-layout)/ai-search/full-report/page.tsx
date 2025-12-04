'use client';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import { FullReport } from './_view/full-report';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

export default function AiSearchPage() {
  const { isDarkMode } = useDarkMode();
  
  const containerBg = isDarkMode ? '#404652' : undefined;

  return (
    <FadeAnimation>
      <div 
        className="ml-0 sm:ml-0 w-full sm:w-[calc(100%-320px)] sm:max-w-[calc(100%-320px)] overflow-x-hidden box-border pr-1 sm:pr-4 md:pr-6 px-1 sm:px-4 md:px-0"
        style={containerBg ? { backgroundColor: containerBg } : undefined}
      >
        <div className="w-full min-w-0 max-w-full box-border">
          <FullReport />
        </div>
      </div>
    </FadeAnimation>
  );
}
