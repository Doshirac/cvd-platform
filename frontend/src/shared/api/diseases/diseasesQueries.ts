import { axiosInstance } from '../config/axiosConfig';
import type { Disease, RiskFactor, Symptom } from './diseases.types';
import { diseasesApi } from '../config/api';

export const getDiseases = async (params: {
  skip?: number;
  take?: number;
  symptom?: string;
  riskFactor?: string;
  search?: string;
  locale?: string;
}): Promise<Disease[]> => {
  const response = await axiosInstance.get<Disease[]>(diseasesApi, { params });
  return response.data;
};

export const getRiskFactors = async (locale?: string): Promise<RiskFactor[]> => {
  const response = await axiosInstance.get<RiskFactor[]>('/diseases/risk-factors', {
    params: { locale },
  });
  return response.data;
};

export const getSymptoms = async (locale?: string): Promise<Symptom[]> => {
  const response = await axiosInstance.get<Symptom[]>('/diseases/symptoms', {
    params: { locale },
  });
  return response.data;
};
