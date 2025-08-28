'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import analytics components to avoid SSR issues
const GoogleAnalytics = dynamic(() => import('./google-analytics'), {
  ssr: false,
  loading: () => null,
});

const PageTracker = dynamic(() => import('./page-tracker'), {
  ssr: false,
  loading: () => null,
});

const UserTracker = dynamic(() => import('./user-tracker'), {
  ssr: false,
  loading: () => null,
});

function AnalyticsComponents() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <GoogleAnalytics />
      <PageTracker />
      <UserTracker />
    </>
  );
}

export default function AnalyticsWrapper() {
  return (
    <Suspense fallback={null}>
      <AnalyticsComponents />
    </Suspense>
  );
}
