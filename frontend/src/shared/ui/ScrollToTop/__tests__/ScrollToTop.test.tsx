import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScrollToTop } from '../ScrollToTop';

describe('<ScrollToTop />', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders button and scrolls page to top on click', () => {
    render(<ScrollToTop visible />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('does not render button when visible is false', () => {
    render(<ScrollToTop visible={false} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
