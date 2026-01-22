export const mobileBreakpoint = 'mobile';
export const desktopBreakpoint = 'desktop';
export const breakpointWidth = 768;

// Navigation routes
export const ROUTES = {
  HOME: '/',
  SOURCES: '/sources',
  RESEARCH: '/research',
} as const;

// Navigation items configuration - labels are i18n keys
export const navItems = [
  { path: ROUTES.HOME, labelKey: 'navigation.home', icon: 'HOME' as const },
  { path: ROUTES.SOURCES, labelKey: 'navigation.sources', icon: 'BUILDING' as const },
  { path: ROUTES.RESEARCH, labelKey: 'navigation.research', icon: 'ACTIVITY' as const },
] as const;
