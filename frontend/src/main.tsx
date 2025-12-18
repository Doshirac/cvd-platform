import * as Sentry from '@sentry/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@app/App';
import { ThemeProvider } from '@shared/hooks/useTheme';
import { logger, setupGlobalErrorLogging } from '@shared/utils';
import { logMessages } from '@shared/constants/constants';

Sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  release: import.meta.env.VITE_RELEASE || 'dev',
  sendDefaultPii: true,
  debug: true,
  tracesSampleRate: 1.0,
});

setupGlobalErrorLogging();
logger.info(logMessages.APP_BOOT, { mode: import.meta.env.MODE });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Sentry.ErrorBoundary>
        <App />
      </Sentry.ErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);
