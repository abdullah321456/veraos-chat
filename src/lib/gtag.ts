export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {


  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Enhanced user engagement tracking
export const trackUserEngagement = (action: string, details?: any) => {
  event({
    action: action,
    category: 'user_engagement',
    label: details,
  });
};

// Track user session start
export const trackSessionStart = () => {
  event({
    action: 'session_start',
    category: 'engagement',
    label: 'app_opened',
  });
};

// Track user location (when available)
export const trackUserLocation = (location: string) => {
  event({
    action: 'location_detected',
    category: 'user_info',
    label: location,
  });
};

// Track device information
export const trackDeviceInfo = (deviceType: string) => {
  event({
    action: 'device_detected',
    category: 'user_info',
    label: deviceType,
  });
};

// Track user preferences
export const trackUserPreference = (preference: string, value: string) => {
  event({
    action: 'preference_set',
    category: 'user_settings',
    label: `${preference}: ${value}`,
  });
};

// Custom event for AI Search
export const trackAISearch = (query: string, resultsCount: number) => {
  event({
    action: 'ai_search',
    category: 'engagement',
    label: query,
    value: resultsCount,
  });
};

// Custom event for Full Report view
export const trackFullReportView = (reportType: string) => {
  event({
    action: 'full_report_view',
    category: 'engagement',
    label: reportType,
  });
};

// Custom event for Drawer expand
export const trackDrawerExpand = (section: string) => {
  event({
    action: 'drawer_expand',
    category: 'navigation',
    label: section,
  });
};

// Track user journey through the app
export const trackUserJourney = (step: string, details?: string) => {
  event({
    action: 'user_journey',
    category: 'navigation',
    label: `${step}${details ? `: ${details}` : ''}`,
  });
};

// Track performance metrics
export const trackPerformance = (metric: string, value: number) => {
  event({
    action: 'performance_metric',
    category: 'technical',
    label: metric,
    value: value,
  });
};
