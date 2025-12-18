import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './config';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + 'api',
  }),
  endpoints: () => ({}),
});

export const diseasesApi = '/diseases';
export const sourcesApi = '/sources';
