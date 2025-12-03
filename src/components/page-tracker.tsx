'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/gtag';

function PageTrackerContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run on client side and when we have valid data
    if (typeof window === 'undefined' || !pathname) return;
    
    try {
      const url = pathname + (searchParams ? searchParams.toString() : '');
      pageview(url);
    } catch (error) {
      // Silently handle any errors during tracking
      console.warn('Google Analytics tracking error:', error);
    }
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}

export default function PageTracker() {
  return (
    <Suspense fallback={null}>
      <PageTrackerContent />
    </Suspense>
  );
}
