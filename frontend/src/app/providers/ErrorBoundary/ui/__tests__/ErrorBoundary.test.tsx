import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from '../ErrorBoundary';

// Mock the ErrorPage component
jest.mock('@pages/ErrorPage', () => ({
  ErrorPage: () => <div data-testid="error-page">Error Page Content</div>,
}));

describe('ErrorBoundary Component', () => {
  // Suppress console.error during tests to avoid noisy output
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="test-child">Test Child Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.queryByTestId('error-page')).not.toBeInTheDocument();
  });

  test('renders error page when there is an error', () => {
    // Define a component that throws an error
    const ThrowError = () => {
      throw new Error('Test error');
    };

    // Render the component that throws an error inside the ErrorBoundary
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    // Verify that the ErrorPage is displayed
    expect(screen.getByTestId('error-page')).toBeInTheDocument();
  });
});
