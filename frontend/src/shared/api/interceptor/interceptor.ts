import type { AxiosError, AxiosInstance } from 'axios';

class BaseInterceptor {
  protected readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.setupInterceptor();
  }

  protected setupInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }
}

export default BaseInterceptor;
