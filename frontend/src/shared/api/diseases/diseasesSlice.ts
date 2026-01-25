import { createSlice } from '@reduxjs/toolkit';
import { fetchDiseases, fetchMoreDiseases, fetchSymptoms, fetchRiskFactors } from './diseasesThunks';
import type { DiseasesState } from './diseases.types';
import type { RootState } from '@app/providers/StoreProvider/config/store';

const itemsPerPage = 6;

const initialState: DiseasesState = {
  items: [],
  symptomList: [],
  riskFactors: [],
  loading: false,
  error: null,
  hasMore: true,
};

const diseasesSlice = createSlice({
  name: 'diseases',
  initialState,
  reducers: {
    resetDiseases: (state) => {
      state.items = [];
      state.hasMore = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDiseases.pending, state => {
        // Only show loading if no data exists (prevents flickering during search)
        if (state.items.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchDiseases.fulfilled, (state, action) => {
        state.items = action.payload;
        state.hasMore = action.payload.length >= itemsPerPage;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDiseases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMoreDiseases.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoreDiseases.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.hasMore = action.payload.length >= itemsPerPage;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMoreDiseases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSymptoms.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSymptoms.fulfilled, (state, action) => {
        state.symptomList = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSymptoms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRiskFactors.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRiskFactors.fulfilled, (state, action) => {
        state.riskFactors = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRiskFactors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDiseases } = diseasesSlice.actions;
export default diseasesSlice.reducer;
export const selectDiseases = (state: RootState) => state.diseases.items || [];
export const selectDiseasesHasMore = (state: RootState) => state.diseases.hasMore;
export const selectSymptoms = (state: RootState) => state.diseases.symptomList || [];
export const selectRiskFactors = (state: RootState) => state.diseases.riskFactors || [];
