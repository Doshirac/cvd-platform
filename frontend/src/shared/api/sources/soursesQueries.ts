import { axiosInstance } from '../config/axiosConfig';
import type { Source } from './sources.types';
import { sourcesApi } from '../config/api';

export const getSources = async (params: {
  skip?: number;
  take?: number;
  search?: string;
}): Promise<Source[]> => {
  const response = await axiosInstance.get<Source[]>(sourcesApi, { params });
  return response.data;
};
