import { render, screen, fireEvent } from '@testing-library/react';
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

jest.mock('../../Loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

interface MockItem {
  id: number;
  title: string;
}

describe('InfinityScroll', () => {
  test('should render items', () => {
    const mockFetchPage = jest.fn();
    const mockRenderItem = jest.fn((item: MockItem) => <div>{item.title}</div>);

    render(<InfinityScroll fetchPage={mockFetchPage} renderItem={mockRenderItem} />);

    expect(screen.getByText('Test Item')).toBeInTheDocument();
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

  test('should disable button when hasMore is false', () => {
    const mockFetchPage = jest.fn();
    const mockRenderItem = jest.fn(() => <div>Test Item</div>);

    // Override the mock for this test
    jest.spyOn(require('@shared/hooks/useInfiniteScroll'), 'useInfiniteScroll').mockReturnValue({
      items: [{ id: 1, title: 'Test Item' }],
      hasMore: false,
      error: false,
      loadMore: jest.fn(),
      loading: false,
    });

    render(<InfinityScroll fetchPage={mockFetchPage} renderItem={mockRenderItem} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('No more items')).toBeInTheDocument();
  });

  test('should render with grid layout when gridColumns is provided', () => {
    const mockFetchPage = jest.fn();
    const mockRenderItem = jest.fn(() => <div>Test Item</div>);

    const { container } = render(
      <InfinityScroll
        fetchPage={mockFetchPage}
        renderItem={mockRenderItem}
        gridColumns={300}
      />
    );

    const gridElement = container.querySelector('.grid');
    expect(gridElement).toBeInTheDocument();
    expect(gridElement).toHaveStyle({
      display: 'grid',
    });
  });
});
