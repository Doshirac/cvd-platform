import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '@shared/api';
import diseasesReducer from '@shared/api/diseases/diseasesSlice';
import sourcesReducer from '@shared/api/sources/sourcesSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  diseases: diseasesReducer,
  sources: sourcesReducer,
});

export const createReduxStore = (initialState = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
  });

  setupListeners(store.dispatch);

  return store;
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export const store = createReduxStore();
