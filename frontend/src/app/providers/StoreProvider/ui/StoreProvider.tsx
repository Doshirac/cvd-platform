import { type ReactNode, Suspense } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
  children: ReactNode;
  initialState?: Record<string, unknown>;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState } = props;
  const store = createReduxStore(initialState);

  return (
    <Provider store={store}>
      <Suspense fallback="Loading...">{children}</Suspense>
    </Provider>
  );
};
