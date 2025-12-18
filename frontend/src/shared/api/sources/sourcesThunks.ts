import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleThunkError } from '@shared/utils/errorHandler';
import { messages as msg, logMessages } from '@shared/constants/constants';
import { logger } from '@shared/utils';
import { getSources } from './soursesQueries';

export const fetchSources = createAsyncThunk(
  'sources/fetchSources',
  async (
    params: {
      skip?: number;
      take?: number;
      search?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      logger.debug(logMessages.FETCH_SOURCES_START, { params });
      const result = await getSources(params);
      logger.debug('Sources fetched successfully', { count: result.length });
      return result;
    } catch (error) {
      logger.error(logMessages.FETCH_SOURCES_ERROR, error, { params });
      return rejectWithValue(handleThunkError(error, msg.SOURCE_FETCH_ALL_FAILED));
    }
  }
);
