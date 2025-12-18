import { useState, useCallback } from 'react';

export function useRefresh(): [number, () => void] {
  const [refresh, setRefresh] = useState(0);
  const triggerRefresh = useCallback(() => setRefresh(prev => prev + 1), []);
  return [refresh, triggerRefresh];
}
