import { useState, useEffect } from 'react';
import { mobileBreakpoint, desktopBreakpoint, breakpointWidth } from '@shared/ui/Header/index';

export type Breakpoint = typeof mobileBreakpoint | typeof desktopBreakpoint;

const getBreakpoint = (width: number): Breakpoint => {
  if (width < breakpointWidth) return mobileBreakpoint;
  return desktopBreakpoint;
};

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState(() => getBreakpoint(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};
