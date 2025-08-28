'use client';

import { useGoogleAnalytics } from '@/hooks/use-google-analytics';

export default function PageTracker() {
  useGoogleAnalytics();
  return null; // This component doesn't render anything
}
