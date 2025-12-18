import axios from 'axios';
import * as Sentry from '@sentry/react';
import type { CustomAxiosError } from '@shared/api/config/customAxiosError.types';

export function handleThunkError(error: unknown, defaultMessage: string): string {
  Sentry.captureException(error);
  if (axios.isAxiosError(error)) {
    return (error as CustomAxiosError).response?.data?.message || defaultMessage;
  }
  return defaultMessage;
}
