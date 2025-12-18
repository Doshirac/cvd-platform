import { useContext } from 'react';
import { ThemeContext } from '@shared/context/theme';
import { messages } from '@shared/constants/constants';
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(messages.USETHEME_ERROR);
  }
  return context;
}

export { ThemeProvider } from '@shared/context/ThemeContext';
