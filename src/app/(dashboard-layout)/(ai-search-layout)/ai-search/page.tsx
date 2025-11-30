'use client';

import dynamic from 'next/dynamic';
import { useEffect, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { LoadingSpinner } from '@/components/atom/loading-spinner';

const Conversation = dynamic(() => import('./_view/conversation').then((mod) => mod.Conversation), {
  ssr: false,
  loading: () => <LoadingSpinner size="lg" className="h-64" />,
});

export default function Page() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if we're coming from login by checking session storage
    const fromLogin = sessionStorage.getItem('fromLogin');
    if (fromLogin) {
      // Clear the flag
      sessionStorage.removeItem('fromLogin');
      // Refresh the page
      window.location.reload();
    }
  }, [pathname]);

  // Ensure clean navigation by clearing any conflicting query parameters
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const currentPath = url.pathname;
      
      // If we're on the AI Search page, ensure we don't have conflicting query params
      if (currentPath === '/ai-search') {
        // Clear any report_id or other conflicting parameters
        const paramsToRemove = ['report_id', 'route'];
        let hasChanges = false;
        
        paramsToRemove.forEach(param => {
          if (url.searchParams.has(param)) {
            url.searchParams.delete(param);
            hasChanges = true;
          }
        });
        
        // Update URL if we removed parameters
        if (hasChanges) {
          window.history.replaceState({}, '', url.toString());
        }
      }
    }
  }, []);

  return (
    <div className="ml-0 sm:ml-0 w-full sm:w-[calc(100%-320px)] sm:max-w-[calc(100%-320px)] overflow-x-hidden box-border">
      <Suspense fallback={<LoadingSpinner size="lg" className="h-64" />}>
        <Conversation />
      </Suspense>
    </div>
  );
}
