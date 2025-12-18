import { render, screen } from '@shared/lib/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../Header';
import { useBreakpoint } from '@shared/hooks';
import categoriesReducer from '@shared/api/categories/categoriesSlice';
import type { SelectorProps, SelectorOption } from '@shared/ui/Selector';
import authReducer from '@shared/api/auth/authSlice';

jest.mock('@shared/hooks/useBreakpoint', () => ({
  useBreakpoint: jest.fn(),
}));
jest.mock('@shared/ui/Icon', () => ({
  Icon: (props: { name: string }) => <div data-testid={`icon-${props.name}`} />,
  iconNames: {
    MENU: 'menu',
    CANCEL: 'cancel',
    USER1: 'user1',
    ARROW_DOWN: 'arrow-down',
  },
  iconColors: {},
  iconSizes: {},
}));
jest.mock('../../UserProfile', () => () => <div data-testid="user-profile" />);

const mockSelector = jest.fn();
jest.mock('@shared/ui/Selector', () => ({
  Selector: (props: SelectorProps) => {
    mockSelector(props);
    return <div data-testid="selector-mock" />;
  },
}));

const mockUseBreakpoint = useBreakpoint as jest.MockedFunction<typeof useBreakpoint>;

const renderWithRouter = (component: React.ReactElement, preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      categories: categoriesReducer,
      auth: authReducer,
    },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('Header Component', () => {
  it('renders logo', () => {
    const preloadedState = {
      auth: {
        user: null,
        token: null,
      },
    };
    renderWithRouter(<Header />, preloadedState);
    expect(screen.getByRole('link', { name: /m \. n e w s/i })).toBeInTheDocument();
  });

  it('shows desktop selector with categories when breakpoint is desktop', () => {
    mockUseBreakpoint.mockReturnValue('desktop');
    const preloadedState = {
      categories: {
        categories: [
          { id: 1, title: 'Places', slug: 'places' },
          { id: 2, title: 'Events', slug: 'events' },
          { id: 3, title: 'People', slug: 'people' },
        ],
        selectedCategory: null,
        isLoading: false,
        error: null,
      },
      auth: {
        user: null,
        token: null,
      },
    };
    renderWithRouter(<Header />, preloadedState);

    expect(screen.getByTestId('selector-mock')).toBeInTheDocument();

    const lastCall = mockSelector.mock.calls[
      mockSelector.mock.calls.length - 1
    ][0] as SelectorProps;
    expect(lastCall.options.map((o: SelectorOption) => o.label)).toEqual([
      'All',
      'Places',
      'Events',
      'People',
    ]);
  });

  it('shows mobile menu icon when breakpoint is mobile and user is not logged', () => {
    mockUseBreakpoint.mockReturnValue('mobile');
    const preloadedState = {
      auth: {
        user: null,
        token: null,
      },
    };
    renderWithRouter(<Header />, preloadedState);
    expect(screen.getByTestId('icon-menu')).toBeInTheDocument();
  });

  it('does not show user profile on mobile, even when user is logged in', () => {
    mockUseBreakpoint.mockReturnValue('mobile');
    const preloadedState = {
      auth: {
        user: { role: 'USER' },
        token: 'mock-token',
      },
    };
    renderWithRouter(<Header />, preloadedState);
    expect(screen.queryByTestId('user-profile')).not.toBeInTheDocument();
  });
});
