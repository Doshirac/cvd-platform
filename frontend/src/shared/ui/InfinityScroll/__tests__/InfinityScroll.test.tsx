import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InfinityScroll } from '../InfinityScroll';

jest.mock('@shared/hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: () => ({
    items: [{ id: 1, title: 'Test Item' }],
    hasMore: true,
    error: false,
    loadMore: jest.fn(),
    loading: false,
  }),
}));

jest.mock('react-virtualized', () => ({
  List: () => <div data-testid="scroll-list">Mocked List</div>,
  AutoSizer: ({
    children,
  }: {
    children: (props: { width: number; height: number }) => React.ReactNode;
  }) => children({ width: 800, height: 600 }),
  CellMeasurer: ({ children }: { children: (props: { measure: () => void }) => React.ReactNode }) =>
    children({ measure: jest.fn() }),
  CellMeasurerCache: jest.fn().mockImplementation(() => ({
    rowHeight: jest.fn(() => 420),
    clearAll: jest.fn(),
  })),
  WindowScroller: ({
    children,
  }: {
    children: (props: {
      height: number;
      isScrolling: boolean;
      onChildScroll: () => void;
      scrollTop: number;
    }) => React.ReactNode;
  }) => children({ height: 800, isScrolling: false, onChildScroll: jest.fn(), scrollTop: 0 }),
}));

jest.mock('../../Loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

describe('InfinityScroll', () => {
  test('should render the component', () => {
    const mockFetchPage = jest.fn();
    const mockRenderItem = jest.fn(() => <div>Test Item</div>);

    render(<InfinityScroll fetchPage={mockFetchPage} renderItem={mockRenderItem} />);

    expect(screen.getByTestId('scroll-list')).toBeInTheDocument();
  });

  test('should show load more button with default label', () => {
    const mockFetchPage = jest.fn();
    const mockRenderItem = jest.fn(() => <div>Test Item</div>);

    render(<InfinityScroll fetchPage={mockFetchPage} renderItem={mockRenderItem} />);
    expect(screen.getByText('Load More')).toBeInTheDocument();
  });

  test('should show load more button with custom label', () => {
    const mockFetchPage = jest.fn();
    const mockRenderItem = jest.fn(() => <div>Test Item</div>);
    const customLabel = 'LOAD MORE NEWS';

    render(
      <InfinityScroll
        fetchPage={mockFetchPage}
        renderItem={mockRenderItem}
        buttonLabel={customLabel}
      />
    );

    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });
});
