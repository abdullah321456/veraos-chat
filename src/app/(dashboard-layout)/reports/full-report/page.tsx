'use client';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import dynamic from 'next/dynamic';

// Dynamically import the full report component with SSR disabled
const ReportsFullReport = dynamic(() => import('./_view/reports-full-report'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading report...</p>
      </div>
    </div>
  )
});

export default function ReportsFullReportPage() {
  return (
    <FadeAnimation>
      <div className="flex gap-4">
        <ReportsFullReport />
      </div>
    </FadeAnimation>
  );
}
