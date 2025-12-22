export const mobileBreakpoint = 'mobile';
export const desktopBreakpoint = 'desktop';
export const breakpointWidth = 768;

// Navigation routes
export const ROUTES = {
  HOME: '/',
  SOURCES: '/sources',
  RESEARCH: '/research',
} as const;

// Navigation items configuration
export const navItems = [
  { path: ROUTES.HOME, label: 'Home', icon: 'HOME' as const },
  { path: ROUTES.SOURCES, label: 'Sources', icon: 'BUILDING' as const },
  { path: ROUTES.RESEARCH, label: 'Research', icon: 'ACTIVITY' as const },
] as const;
