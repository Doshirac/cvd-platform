import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StoreProvider } from '../StoreProvider';
import { useSelector } from 'react-redux';
import type { RootState } from '../../config/store';

// Mock the API
jest.mock('@shared/api', () => ({
  api: {
    reducerPath: 'api',
    reducer: (state = {}) => state, // Updated to return state passed in
    middleware: jest.fn(() => jest.fn()),
  },
}));

// Test component that uses the Redux store
const TestComponent = () => {
  const apiState = useSelector((state: RootState) => state.api);
  return <div data-testid="test-component">{JSON.stringify(apiState)}</div>;
};

describe('StoreProvider Component', () => {
  test('renders children and provides redux store', () => {
    render(
      <StoreProvider>
        <div data-testid="child-element">Child Element</div>
      </StoreProvider>
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });

  test('provides store with initial state', () => {
    // Update initialState to match the shape of the reducer
    const initialState = {
      api: {
        testKey: 'testValue',
      },
    };

    render(
      <StoreProvider initialState={initialState}>
        <TestComponent />
      </StoreProvider>
    );

    const testComponent = screen.getByTestId('test-component');
    expect(testComponent).toBeInTheDocument();

    // The state should contain our initial state
    expect(testComponent.textContent).toContain('testKey');
    expect(testComponent.textContent).toContain('testValue');
  });
});
