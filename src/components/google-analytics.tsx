'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics() {
  const [measurementId, setMeasurementId] = useState<string | undefined>();

  useEffect(() => {
    // Only set measurement ID on client side
    setMeasurementId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  }, []);

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        onError={(e) => {
          console.warn('Failed to load Google Analytics script:', e);
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onError={(e) => {
          console.warn('Failed to initialize Google Analytics:', e);
        }}
        dangerouslySetInnerHTML={{
          __html: `
            try {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            } catch (error) {
              console.warn('Google Analytics initialization error:', error);
            }
          `,
        }}
      />
    </>
  );
}
