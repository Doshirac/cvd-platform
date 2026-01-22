import { useMemo, useState } from 'react';
import styles from './InfinityScroll.module.scss';
import { type InfinityScrollProps } from './InfinityScroll.types';
import { Loader } from '../Loader/index';
import { useInfiniteScroll } from '@shared/hooks/useInfiniteScroll';
import throttle from 'lodash.throttle';
import { Button } from '../Button';

export function InfinityScroll<T>({
  fetchPage,
  renderItem,
  itemsPerPage = 5,
  buttonLabel = 'Load More',
  gridColumns,
}: InfinityScrollProps<T>) {
  const { items, hasMore, error, loadMore, loading } = useInfiniteScroll<T>({
    fetchPage,
    itemsPerPage,
  });

  const [isLoading, setIsLoading] = useState(false);

  const throttledLoadMore = useMemo(
    () =>
      throttle(
        () => {
          if (!isLoading && hasMore) {
            setIsLoading(true);
            loadMore().finally(() => setIsLoading(false));
          }
        },
        1000,
        { trailing: true }
      ),
    [isLoading, hasMore, loadMore]
  );

  return (
    <section className={styles['scroll-container']}>
      {error && items.length === 0 ? (
        <p className={styles.error}>Failed to load items. Please try again later.</p>
      ) : loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <>
          <div
            className={gridColumns ? styles.grid : ''}
            style={gridColumns ? {
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(${gridColumns}px, 1fr))`,
              gap: '1.5rem',
              width: '100%',
            } : undefined}
          >
            {items.map((item, index) => (
              <div key={index}>
                {renderItem(item)}
              </div>
            ))}
          </div>
          {items.length > 0 && (
            <div className={styles['load-more-wrapper']}>
              <Button
                variant="secondary"
                disabled={!hasMore || isLoading}
                onClick={throttledLoadMore}
              >
                {isLoading ? <Loader /> : hasMore ? buttonLabel : 'No more items'}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
