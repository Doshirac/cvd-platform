import { useMemo, useState, useEffect } from 'react';
import styles from './InfinityScroll.module.scss';
import { type InfinityScrollProps } from './InfinityScroll.types';
import { Loader } from '../Loader/index';
import { useInfiniteScroll } from '@shared/hooks/useInfiniteScroll';
import throttle from 'lodash.throttle';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
} from 'react-virtualized';
import { Button } from '../Button';

export function InfinityScroll<T>({
  fetchPage,
  renderItem,
  itemsPerPage = 5,
  itemHeight = 420,
  buttonLabel = 'Load More',
}: InfinityScrollProps<T>) {
  const { items, hasMore, error, loadMore, loading } = useInfiniteScroll<T>({
    fetchPage,
    itemsPerPage,
  });

  const [isLoading, setIsLoading] = useState(false);
  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: itemHeight,
        keyMapper: index => index,
      }),
    [itemHeight]
  );

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

  useEffect(() => {
    const handleResize = () => {
      cache.clearAll();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cache]);

  useEffect(() => {
    cache.clearAll();
  }, [items.length, cache]);

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
          <WindowScroller scrollElement={window}>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    key="infinity-scroll-list"
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    width={width}
                    overscanRowCount={1}
                    rowCount={items.length}
                    rowHeight={cache.rowHeight}
                    deferredMeasurementCache={cache}
                    rowRenderer={({ index, style, key, parent }) => {
                      const isLast = index === items.length - 1;
                      const handleRowResize = () => cache.clear(index, 0);
                      return (
                        <CellMeasurer
                          key={key}
                          cache={cache}
                          columnIndex={0}
                          rowIndex={index}
                          parent={parent}
                        >
                          {({ measure }) => (
                            <div
                              style={style}
                              className={`${styles.element} ${isLast ? styles['last-element'] : ''}`}
                              onLoad={measure}
                            >
                              {renderItem(items[index], handleRowResize, measure)}
                            </div>
                          )}
                        </CellMeasurer>
                      );
                    }}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
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
