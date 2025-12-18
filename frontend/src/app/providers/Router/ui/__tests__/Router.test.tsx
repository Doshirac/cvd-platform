import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from '../Router';
import { MemoryRouter } from 'react-router-dom';
import { createReduxStore } from '@app/providers/StoreProvider/config/store';
import { Provider } from 'react-redux';
const store = createReduxStore();

jest.mock('@shared/api/config/config', () => ({
  baseUrl: 'http://localhost:3000',
}));

jest.mock('@pages/MainPage', () => ({
  MainPage: () => <div data-testid="main-page">Main Page Content</div>,
}));

jest.mock('@pages/ErrorPage', () => ({
  ErrorPage: () => <div data-testid="error-page">Error Page Content</div>,
}));

jest.mock('@pages/NotFoundPage', () => ({
  NotFoundPage: () => <div data-testid="not-found-page">Not Found Page Content</div>,
}));

jest.mock('@shared/hooks/useBreakpoint', () => ({
  useBreakpoint: () => 'desktop',
}));

jest.mock('@pages/CategoriesPage', () => ({
  CategoriesPage: () => <div data-testid="categories-page">Categories Page Content</div>,
}));

jest.mock('@pages/ArticlePage/ui/ArticlePage', () => ({
  ArticlePage: () => <div data-testid="article-page">Article Page Content</div>,
}));

jest.mock('@shared/ui/Header/Header', () => () => <div data-testid="header" />);

// Mock BrowserRouter to avoid errors with Router being used inside Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
interface ReactMarkdownProps {
  children?: React.ReactNode;
}

jest.mock('react-markdown', () => (props: ReactMarkdownProps) => (
  <div data-testid="react-markdown">{props.children}</div>
));

describe('Router Component', () => {
  test('renders MainPage on main route', () => {
    // Override the mock for this specific test
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Router />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('main-page')).toBeInTheDocument();

    expect(screen.queryByTestId('error-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('not-found-page')).not.toBeInTheDocument();
  });

  test('renders ErrorPage on error route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/error']}>
          <Router />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
  });

  test('renders NotFoundPage on non-existent route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/non-existent-route']}>
          <Router />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
  });

  test('renders RegistrationLayout on registration route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/registration']}>
          <Router />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('registration-page')).toBeInTheDocument();
    expect(screen.getByText('Registration Layout Content')).toBeInTheDocument();
    expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
  });
});
