import { createSlice } from '@reduxjs/toolkit';
import { fetchDiseases, fetchSymptoms, fetchRiskFactors } from './diseasesThunks';
import type { DiseasesState } from './diseases.types';
import type { RootState } from '@app/providers/StoreProvider/config/store';

const initialState: DiseasesState = {
  items: [],
  symptomList: [], // Renamed from symptoms to symptomList
  riskFactors: [],
  loading: false,
  error: null,
};

const diseasesSlice = createSlice({
  name: 'diseases',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDiseases.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiseases.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDiseases.rejected, (state, action) => {
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

export default diseasesSlice.reducer;
export const selectDiseases = (state: RootState) => state.diseases.items;
export const selectSymptoms = (state: RootState) => state.diseases.symptomList;
export const selectRiskFactors = (state: RootState) => state.diseases.riskFactors;
