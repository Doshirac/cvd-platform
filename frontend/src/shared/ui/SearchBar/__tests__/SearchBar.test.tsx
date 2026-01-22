import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '../SearchBar';

// Mock Icon component
jest.mock('@shared/ui/Icon', () => ({
  Icon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid={`icon-${name.toLowerCase()}`} className={className} />
  ),
}));

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'common.search': 'Search',
        'common.clear': 'Clear',
      };
      return translations[key] || key;
    },
  }),
}));

describe('<SearchBar /> component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders with placeholder', () => {
    render(<SearchBar placeholder="Search items..." />);
    
    expect(screen.getByPlaceholderText('Search items...')).toBeInTheDocument();
  });

  test('renders with default placeholder from i18n', () => {
    render(<SearchBar />);
    
    expect(screen.getByPlaceholderText('search.placeholder')).toBeInTheDocument();
  });

  test('updates value on input change', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'test query' } });
    
    expect(input).toHaveValue('test query');
  });

  test('shows clear button when value is present', () => {
    render(<SearchBar value="test" />);
    
    const clearButton = screen.getByRole('button', { name: /clear/i });
    expect(clearButton).toBeInTheDocument();
  });

  test('hides clear button when value is empty', () => {
    render(<SearchBar value="" />);
    
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });

  test('calls onChange when clear button is clicked', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="test" onChange={mockOnChange} />);
    
    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  test('applies custom className', () => {
    const { container } = render(<SearchBar className="custom-class" />);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('has accessible search input', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('aria-label', 'Search');
  });

  test('renders search icon', () => {
    render(<SearchBar />);
    
    expect(screen.getByTestId('icon-search')).toBeInTheDocument();
  });

  test('debounces onChange calls', async () => {
    const mockOnChange = jest.fn();
    render(<SearchBar onChange={mockOnChange} debounceMs={300} />);
    
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    // Should not call immediately
    expect(mockOnChange).not.toHaveBeenCalled();
    
    // Fast-forward time
    jest.advanceTimersByTime(300);
    
    // Should call after debounce
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith('test');
    });
  });

  test('clears debounce on rapid changes', async () => {
    const mockOnChange = jest.fn();
    render(<SearchBar onChange={mockOnChange} debounceMs={300} />);
    
    const input = screen.getByRole('searchbox');
    
    fireEvent.change(input, { target: { value: 't' } });
    jest.advanceTimersByTime(100);
    
    fireEvent.change(input, { target: { value: 'te' } });
    jest.advanceTimersByTime(100);
    
    fireEvent.change(input, { target: { value: 'test' } });
    jest.advanceTimersByTime(300);
    
    // Should only call once with the final value
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith('test');
    });
  });
});
