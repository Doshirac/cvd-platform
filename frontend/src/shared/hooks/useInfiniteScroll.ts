import * as Sentry from '@sentry/react';
import { useCallback, useEffect, useState } from 'react';

interface UseInfiniteScrollProps<T> {
  fetchPage: (page: number) => Promise<T[]>;
  itemsPerPage: number;
}

export function useInfiniteScroll<T>({ fetchPage, itemsPerPage }: UseInfiniteScrollProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadMore = useCallback(async () => {
    try {
      const nextItems = await fetchPage(page);
      setItems(prev => [...prev, ...nextItems]);

      if (nextItems.length < itemsPerPage) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }
    } catch (err) {
      Sentry.captureException(`Error loading items: ${err}`);
      setError(true);
      setHasMore(false);
    }
  }, [fetchPage, page, itemsPerPage]);

  useEffect(() => {
    const loadInitialItems = async () => {
      try {
        setLoading(true);
        setItems([]);
        setPage(2);
        setHasMore(true);
        setError(false);

        const initialItems = await fetchPage(1);
        setItems(initialItems);

        if (initialItems.length < itemsPerPage || initialItems.length === 0) {
          setHasMore(false);
        }
      } catch (err) {
        Sentry.captureException(`Error loading initial items: ${err}`);
        setError(true);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadInitialItems();
  }, [fetchPage, itemsPerPage]);

  return { items, hasMore, error, loadMore, loading };
}
