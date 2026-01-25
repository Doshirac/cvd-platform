import { createSlice } from '@reduxjs/toolkit';
import { fetchSources, fetchMoreSources } from './sourcesThunks';
import type { SourcesState } from './sources.types';
import type { RootState } from '@app/providers/StoreProvider/config/store';

const itemsPerPage = 6;

const initialState: SourcesState = {
  items: [],
  loading: false,
  error: null,
  hasMore: true,
};

const sourcesSlice = createSlice({
  name: 'sources',
  initialState,
  reducers: {
    resetSources: (state) => {
      state.items = [];
      state.hasMore = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSources.pending, state => {
        // Only show loading if no data exists (prevents flickering during search)
        if (state.items.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        state.items = action.payload;
        state.hasMore = action.payload.length >= itemsPerPage;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMoreSources.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoreSources.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.hasMore = action.payload.length >= itemsPerPage;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMoreSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSources } = sourcesSlice.actions;
export default sourcesSlice.reducer;
export const selectSources = (state: RootState) => state.sources.items || [];
export const selectSourcesHasMore = (state: RootState) => state.sources.hasMore;
