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
        if (error.response?.status === 500 || error.response?.status === 503) {
          // Check if the user has already tried to refresh
          const hasTriedRefresh = localStorage.getItem('hasTriedRefresh');

          if (!hasTriedRefresh) {
            // First attempt: redirect to the main page
            localStorage.setItem('hasTriedRefresh', 'true');
            window.location.href = '/';
          } else {
            // Second attempt: redirect to the error page
            localStorage.removeItem('hasTriedRefresh'); // Reset the flag
            window.location.href = '/error';
          }
        }
        return Promise.reject(error);
      }
    );
  }
}

export default BaseInterceptor;
