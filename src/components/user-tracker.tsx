'use client';

import { useEffect } from 'react';
import { 
  trackSessionStart, 
  trackDeviceInfo, 
  trackUserLocation,
  trackUserJourney 
} from '@/lib/gtag';

export default function UserTracker() {
  useEffect(() => {
    // Track session start
    trackSessionStart();

    // Detect and track device information
    const userAgent = navigator.userAgent;
    let deviceType = 'desktop';
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      deviceType = 'mobile';
    } else if (/iPad|Android/i.test(userAgent)) {
      deviceType = 'tablet';
    }
    
    trackDeviceInfo(deviceType);

    // Track user journey - app opened
    trackUserJourney('app_opened');

    // Try to get user location (if they allow it)
    if (navigator.geolocation && navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const location = `${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`;
              trackUserLocation(location);
            },
            (error) => {
              // Location access denied or error
              trackUserLocation('access_denied');
            }
          );
        } else {
          trackUserLocation('not_granted');
        }
      });
    } else {
      trackUserLocation('not_supported');
    }

    // Track screen resolution
    const screenInfo = `${screen.width}x${screen.height}`;
    trackUserJourney('screen_resolution', screenInfo);

    // Track language preference
    const language = navigator.language || 'unknown';
    trackUserJourney('language_preference', language);

    // Track timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    trackUserJourney('timezone', timezone);

  }, []);

  return null; // This component doesn't render anything
}
