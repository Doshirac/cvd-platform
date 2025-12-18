import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeToggle } from '../ThemeToggle';
import { ThemeProvider } from '@shared/context/ThemeContext';

// Mock matchMedia globally
const mockMatchMedia = (matches: boolean = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: matches && query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe('<ThemeToggle /> component unit-tests', () => {
  // Create a real localStorage mock with actual storage
  let localStorageMock: { [key: string]: string };

  const renderWithThemeProvider = () => {
    return render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    // Setup actual localStorage implementation
    localStorageMock = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key: string) => localStorageMock[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          localStorageMock[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete localStorageMock[key];
        }),
        clear: jest.fn(() => {
          localStorageMock = {};
        }),
      },
      writable: true,
    });

    document.documentElement.className = '';
    mockMatchMedia(false); // Default to light theme preference
  });

  test('renders the theme toggle button', () => {
    renderWithThemeProvider();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('displays correct aria-label for light theme', () => {
    localStorageMock['theme'] = 'light';
    renderWithThemeProvider();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark theme');
  });

  test('displays correct aria-label for dark theme', () => {
    localStorageMock['theme'] = 'dark';
    renderWithThemeProvider();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light theme');
  });

  test('displays Sun icon in light theme', () => {
    localStorageMock['theme'] = 'light';
    renderWithThemeProvider();
    expect(screen.getByLabelText('Light theme')).toBeInTheDocument();
  });

  test('displays Moon icon in dark theme', () => {
    localStorageMock['theme'] = 'dark';
    renderWithThemeProvider();
    expect(screen.getByLabelText('Dark theme')).toBeInTheDocument();
  });

  test('toggles theme when clicked', async () => {
    localStorageMock['theme'] = 'light';
    renderWithThemeProvider();

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');

    fireEvent.click(button);

    // After clicking, should switch to dark theme
    await waitFor(() => {
      expect(screen.getByLabelText('Dark theme')).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
    });
  });

  test('persists theme to localStorage', async () => {
    localStorageMock['theme'] = 'light';
    renderWithThemeProvider();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorageMock['theme']).toBe('dark');
    });
  });

  test('applies theme class to document', async () => {
    localStorageMock['theme'] = 'light';
    renderWithThemeProvider();

    expect(document.documentElement.classList.contains('theme-light')).toBe(true);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(document.documentElement.classList.contains('theme-dark')).toBe(true);
      expect(document.documentElement.classList.contains('theme-light')).toBe(false);
    });
  });

  test('initializes with system preference when no saved theme', () => {
    mockMatchMedia(true); // Mock prefers dark theme

    renderWithThemeProvider();

    // Should initialize with dark theme based on mock
    expect(document.documentElement.classList.contains('theme-dark')).toBe(true);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light theme');
  });

  test('has accessible button with proper role', () => {
    renderWithThemeProvider();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label');
  });

  test('applies correct CSS class to button', () => {
    renderWithThemeProvider();
    const button = screen.getByRole('button');
    expect(button).toHaveClass('theme-toggle');
  });
});
