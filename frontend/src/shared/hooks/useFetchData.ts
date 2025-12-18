import * as Sentry from '@sentry/react';
import { useState, useEffect } from 'react';

export function useFetchData<T>(fetchFn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchFn()
      .then(result => {
        setData(result);
      })
      .catch(e => {
        Sentry.captureException(`Fetch error: ${e}`);
        setError('Failed to fetch');
      })
      .finally(() => setIsLoading(false));
  }, deps);

  return { data, isLoading, error };
}
