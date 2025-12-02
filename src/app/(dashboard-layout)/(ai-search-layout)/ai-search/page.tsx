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

  // Add Safari mobile detection and prevent horizontal scroll
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Detect Safari on mobile - more accurate detection
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || 
                      /iPhone|iPad|iPod/.test(navigator.userAgent);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && window.innerWidth <= 768;
      
      if (isSafari && isMobile) {
        // Inject CSS styles for Safari mobile
        const styleId = 'safari-mobile-fix';
        let styleElement = document.getElementById(styleId) as HTMLStyleElement;
        
        if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.id = styleId;
          styleElement.textContent = `
            @supports (-webkit-touch-callout: none) {
              @media (max-width: 768px) {
                /* Only target textarea/input to prevent zoom */
                html.safari-mobile textarea,
                html.safari-mobile input,
                body.safari-mobile textarea,
                body.safari-mobile input {
                  font-size: 16px !important;
                  max-width: 100% !important;
                  width: 100% !important;
                  box-sizing: border-box !important;
                }
                
                html.safari-mobile textarea:focus,
                html.safari-mobile input:focus,
                body.safari-mobile textarea:focus,
                body.safari-mobile input:focus {
                  font-size: 16px !important;
                  max-width: 100% !important;
                  width: 100% !important;
                }
              }
            }
          `;
          document.head.appendChild(styleElement);
        }
        
        // Add class to html and body for Safari mobile
        document.documentElement.classList.add('safari-mobile');
        document.body.classList.add('safari-mobile');
        
        // Prevent horizontal scroll when textarea/input is focused
        const handleFocus = (e: FocusEvent) => {
          const target = e.target as HTMLElement;
          if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
            document.body.style.overflowX = 'hidden';
            document.body.style.maxWidth = '100vw';
            document.documentElement.style.overflowX = 'hidden';
            document.documentElement.style.maxWidth = '100vw';
          }
        };
        
        const handleBlur = () => {
          // Keep overflow-x hidden even after blur to prevent scroll
          document.body.style.overflowX = 'hidden';
          document.body.style.maxWidth = '100vw';
          document.documentElement.style.overflowX = 'hidden';
          document.documentElement.style.maxWidth = '100vw';
        };
        
        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);
        
        // Set initial styles
        document.body.style.overflowX = 'hidden';
        document.body.style.maxWidth = '100vw';
        document.documentElement.style.overflowX = 'hidden';
        document.documentElement.style.maxWidth = '100vw';
        
        return () => {
          document.removeEventListener('focusin', handleFocus);
          document.removeEventListener('focusout', handleBlur);
          document.documentElement.classList.remove('safari-mobile');
          document.body.classList.remove('safari-mobile');
        };
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
