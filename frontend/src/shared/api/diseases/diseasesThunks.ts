import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleThunkError } from '@shared/utils/errorHandler';
import { messages as msg, logMessages } from '@shared/constants/constants';
import { logger } from '@shared/utils';
import { getDiseases, getRiskFactors, getSymptoms } from './diseasesQueries';

export interface FetchDiseasesParams {
  skip?: number;
  take?: number;
  symptom?: string;
  riskFactor?: string;
  search?: string;
  locale?: string;
}

export const fetchDiseases = createAsyncThunk(
  'diseases/fetchDiseases',
  async (params: FetchDiseasesParams, { rejectWithValue }) => {
    try {
      logger.debug(logMessages.FETCH_DISEASES_START, { params });
      const result = await getDiseases(params);
      logger.debug('Diseases fetched successfully', { count: result.length });
      return result;
    } catch (error) {
      logger.error(logMessages.FETCH_DISEASES_ERROR, error, { params });
      return rejectWithValue(handleThunkError(error, msg.DISEASE_FETCH_ALL_FAILED));
    }
  }
);

export const fetchMoreDiseases = createAsyncThunk(
  'diseases/fetchMoreDiseases',
  async (params: FetchDiseasesParams, { rejectWithValue }) => {
    try {
      logger.debug('Fetching more diseases', { params });
      const result = await getDiseases(params);
      logger.debug('More diseases fetched successfully', { count: result.length });
      return result;
    } catch (error) {
      logger.error(logMessages.FETCH_DISEASES_ERROR, error, { params });
      return rejectWithValue(handleThunkError(error, msg.DISEASE_FETCH_ALL_FAILED));
    }
  }
);

export const fetchRiskFactors = createAsyncThunk(
  'diseases/fetchRiskFactors',
  async (locale: string | undefined, { rejectWithValue }) => {
    try {
      logger.debug(logMessages.FETCH_RISK_FACTORS_START, { locale });
      const result = await getRiskFactors(locale);
      logger.debug('Risk factors fetched successfully', { count: result.length });
      return result;
    } catch (error) {
      logger.error(logMessages.FETCH_RISK_FACTORS_ERROR, error);
      return rejectWithValue(handleThunkError(error, msg.RISK_FACTOR_FETCH_ALL_FAILED));
    }
  }
);

export const fetchSymptoms = createAsyncThunk(
  'diseases/fetchSymptoms',
  async (locale: string | undefined, { rejectWithValue }) => {
    try {
      logger.debug(logMessages.FETCH_SYMPTOMS_START, { locale });
      const result = await getSymptoms(locale);
      logger.debug('Symptoms fetched successfully', { count: result.length });
      return result;
    } catch (error) {
      logger.error(logMessages.FETCH_SYMPTOMS_ERROR, error);
      return rejectWithValue(handleThunkError(error, msg.SYMPTOM_FETCH_ALL_FAILED));
    }
  }
);
