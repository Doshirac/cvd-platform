import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the providers to isolate App component testing
jest.mock('@app/providers/StoreProvider', () => ({
  StoreProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="store-provider">{children}</div>
  ),
}));

jest.mock('@app/providers/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}));

jest.mock('@app/providers/Router', () => ({
  Router: () => <div data-testid="router">Router Content</div>,
}));

describe('App Component', () => {
  test('renders correctly with all providers', () => {
    render(<App />);

    // Check if the app container is rendered
    const appElement = document.querySelector('.app');
    expect(appElement).toBeInTheDocument();

    // Check if all providers are rendered
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('store-provider')).toBeInTheDocument();
    expect(screen.getByTestId('router')).toBeInTheDocument();
  });
});
