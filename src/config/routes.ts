export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
    JOIN_WITH_INVITE_CODE: '/invite-signup',
    LOGOUT: '/logout',
  },
  HOME: '/',
  REPORTS: '/reports',
  FAQ: {
    INDEX: '/faq',
    HELP_CENTER: '/help-center',
  },
  SETTINGS: {
    ACCOUNT: '/settings/account',
    SEARCH_PREFERENCE: '/settings/search-preference',
    PRIVACY_SECURITY: '/settings/privacy',
    NOTIFICATIONS_ALERTS: '/settings/notification',
    ADVANCED_AI_ANALYSIS: '/settings/advanced-ai',
    DATA_VISUALIZATION: '/settings/data-visualization',
  },
  TECH_SUPPORT: '/tech-support',
  BILLING: '/billing',
  AI_SEARCH: {
    INDEX: '/ai-search',
    FULL_REPORT: '/ai-search/full-report',
    BUILD: '/ai-search/build',
  },
} as const;

export const MAP_PAGE_HEADER_TITLE = {
  [ROUTES.AUTH.LOGIN]: 'Login to your account',
  [ROUTES.AUTH.SIGNUP]: 'Create a new account',
  [ROUTES.AUTH.FORGOT_PASSWORD]: 'Forgot password',
  [ROUTES.HOME]: 'Home',
  [ROUTES.REPORTS]: 'Archive',
  [ROUTES.FAQ.INDEX]: 'Faq',
  [ROUTES.FAQ.HELP_CENTER]: 'Help Center',
  [ROUTES.SETTINGS.ACCOUNT]: 'Account Settings',
  [ROUTES.SETTINGS.SEARCH_PREFERENCE]: 'Search Preferences',
  [ROUTES.SETTINGS.PRIVACY_SECURITY]: 'Privacy & Security',
  [ROUTES.SETTINGS.NOTIFICATIONS_ALERTS]: 'Notifications & Alerts',
  [ROUTES.SETTINGS.ADVANCED_AI_ANALYSIS]: 'Advanced AI & Analysis',
  [ROUTES.SETTINGS.DATA_VISUALIZATION]: 'Data Visualization',
  [ROUTES.TECH_SUPPORT]: 'Tech Support',
  [ROUTES.BILLING]: 'Billing',
  [ROUTES.AI_SEARCH.INDEX]: 'Search history',
};
