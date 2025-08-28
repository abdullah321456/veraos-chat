'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/gtag';

export default function PageTracker() {
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
