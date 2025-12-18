import React, { useEffect } from 'react';

export const ThemeRoot = ({
  theme,
  children,
}: {
  theme: 'light' | 'dark';
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }, [theme]);

  return <>{children}</>;
};
