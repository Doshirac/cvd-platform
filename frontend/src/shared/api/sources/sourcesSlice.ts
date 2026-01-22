import { createSlice } from '@reduxjs/toolkit';
import { fetchSources } from './sourcesThunks';
import type { SourcesState } from './sources.types';
import type { RootState } from '@app/providers/StoreProvider/config/store';

const initialState: SourcesState = {
  items: [],
  loading: false,
  error: null,
};

const sourcesSlice = createSlice({
  name: 'sources',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSources.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sourcesSlice.reducer;
export const selectSources = (state: RootState) => state.sources.items || [];
