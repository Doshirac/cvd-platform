export interface CustomAxiosError {
  config?: {
    method?: string;
    url?: string;
    params?: unknown;
    headers?: unknown;
    _retry?: boolean;
  };
  response?: {
    status?: number;
    data?: { message?: string };
  };
  message?: string;
}
