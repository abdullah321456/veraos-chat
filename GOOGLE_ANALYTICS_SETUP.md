# Google Analytics Setup

This application has been configured with Google Analytics 4 (GA4) tracking with enhanced user analytics.

## Environment Variables

Add the following environment variable to your `.env.testing` and `.env.production` files:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Google Analytics 4 Measurement ID.

## What's Tracked

### 🚀 **Automatic Tracking (No Setup Required)**
- **Page Views**: All page navigation is automatically tracked
- **Route Changes**: Navigation between different sections is tracked
- **User Sessions**: When users open/close the app
- **Device Information**: Desktop, Mobile, or Tablet
- **Screen Resolution**: User's screen dimensions
- **Language Preferences**: User's browser language
- **Timezone**: User's timezone
- **Geographic Location**: Country, City, Region (if permission granted)

### 📱 **User Device & Environment**
- **Device Type**: Mobile, Tablet, or Desktop
- **Operating System**: Windows, macOS, iOS, Android, etc.
- **Browser**: Chrome, Firefox, Safari, Edge, etc.
- **Screen Size**: Resolution and viewport dimensions
- **Network**: Connection type and performance

### 🎯 **Custom Events**
- **AI Search**: Tracks when users perform AI searches
  - Event: `ai_search`
  - Category: `engagement`
  - Label: Search query
  - Value: Number of results (when available)

- **Full Report View**: Tracks when users expand to full report view
  - Event: `full_report_view`
  - Category: `engagement`
  - Label: Report type

- **Drawer Expand**: Tracks when users expand drawer views
  - Event: `drawer_expand`
  - Category: `navigation`
  - Label: Section name

- **User Journey**: Tracks user progression through the app
  - Event: `user_journey`
  - Category: `navigation`
  - Label: Step details (app_opened, screen_resolution, etc.)

- **Session Tracking**: Tracks user engagement
  - Event: `session_start`
  - Category: `engagement`
  - Label: app_opened

- **Location Detection**: Tracks user location (with permission)
  - Event: `location_detected`
  - Category: `user_info`
  - Label: Coordinates or status

- **Device Detection**: Tracks user device information
  - Event: `device_detected`
  - Category: `user_info`
  - Label: Device type

## Implementation Details

### Components
- `GoogleAnalytics`: Main component that loads GA scripts
- `PageTracker`: Hook for automatic page view tracking
- `UserTracker`: Automatic user information and session tracking

### Utility Functions
- `pageview(url)`: Track page views
- `event({action, category, label, value})`: Track custom events
- `trackAISearch(query, resultsCount)`: Track AI search events
- `trackFullReportView(reportType)`: Track full report views
- `trackDrawerExpand(section)`: Track drawer expansions
- `trackUserEngagement(action, details)`: Track user engagement
- `trackSessionStart()`: Track when app is opened
- `trackUserLocation(location)`: Track user location
- `trackDeviceInfo(deviceType)`: Track device information
- `trackUserJourney(step, details)`: Track user progression
- `trackPerformance(metric, value)`: Track performance metrics

## Adding New Tracking

To add new tracking events, use the `event` function:

```typescript
import { event } from '@/lib/gtag';

// Track a custom event
event({
  action: 'button_click',
  category: 'engagement',
  label: 'submit_button',
  value: 1
});
```

## What You'll See in Google Analytics

### 📊 **Real-Time Reports**
- Live user activity
- Current page views
- Active users by location
- Device types in use

### 📈 **Audience Reports**
- **Demographics**: Age, gender, interests
- **Geographic**: Countries, cities, regions
- **Technology**: Browsers, operating systems, devices
- **Mobile**: Device categories, screen resolutions

### 🎯 **Behavior Reports**
- **Page Views**: Most visited pages
- **User Flow**: How users navigate through your app
- **Events**: Custom events like AI searches, report views
- **Site Speed**: Performance metrics

### 📱 **Acquisition Reports**
- **Traffic Sources**: How users find your app
- **Referrals**: Where users come from
- **Campaigns**: Marketing campaign performance

## Testing

1. Set your `NEXT_PUBLIC_GA_MEASUREMENT_ID` in environment variables
2. Open browser developer tools
3. Check the Network tab for requests to `googletagmanager.com`
4. Verify events in Google Analytics Real-Time reports
5. Check for user location, device, and session events

## Privacy Considerations

- **No PII**: No personally identifiable information is sent to Google Analytics
- **Location Privacy**: Location tracking only works with explicit user permission
- **User Control**: Users can opt out using browser extensions or privacy settings
- **GDPR Compliance**: Consider implementing a cookie consent banner
- **Data Retention**: Google Analytics data retention policies apply

## Enhanced Insights You'll Get

- **User Demographics**: Age, gender, interests
- **Geographic Distribution**: Where your users are located
- **Device Preferences**: Mobile vs desktop usage patterns
- **User Behavior**: How users interact with AI search and reports
- **Performance Metrics**: App loading times and user experience
- **Conversion Tracking**: User journey from search to report view
