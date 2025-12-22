import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainLayout } from '../MainLayout';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createReduxStore } from '@app/providers/StoreProvider/config/store';

const store = createReduxStore();

jest.mock('@shared/ui/Header/Header', () => () => <div data-testid="header" />);
jest.mock('@shared/ui/ScrollToTop', () => ({
  ScrollToTop: () => <button data-testid="scroll-to-top">Scroll to Top</button>,
}));

describe('<MainLayout>', () => {
  test('renders layout wrapper', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainLayout />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('layout-wrapper')).toBeInTheDocument();
  });

  test('renders children inside outlet area', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainLayout />
          <div data-testid="dummy-child">Child Content</div>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('dummy-child')).toBeInTheDocument();
  });

  test('renders ScrollToTop button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainLayout />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument();
  });
});
