import axios from 'axios';
import { baseUrl } from '@shared/api';
import BaseInterceptor from '@shared/api/interceptor/interceptor';

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

new BaseInterceptor(axiosInstance);
