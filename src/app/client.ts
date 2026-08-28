import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { ApiConfig } from './apiConfig';
import { NetworkError, ServerError, type ApiError } from './apiError';
import { store } from './store';

export const apiClient = axios.create({
  baseURL: ApiConfig.baseUrl,
});

function normalizeError(error: AxiosError): ApiError {
  if (error.response) {
    const data = error.response.data;
    const message =
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      typeof data.message === 'string'
        ? data.message
        : `An error occurred, status code: ${error.response.status}`;
    return new ServerError(message);
  }
  return new NetworkError('Network connection failed');
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const requireAuth = config.requireAuth ?? true;
  if (requireAuth) {
    const access = store.getState().auth.access;
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const isRefreshRequest = originalRequest?.isRefreshRequest ?? false;

    if (error.response?.status !== 401 || isRefreshRequest || !originalRequest) {
      return Promise.reject(normalizeError(error));
    }

    const refresh = localStorage.getItem('refresh');
    if (!refresh) {
      store.dispatch({ type: 'auth/clearSession' });
      return Promise.reject(normalizeError(error));
    }

    try {
      const refreshResponse = await apiClient.post<{ access: string; refresh?: string }>(
        '/token/refresh/',
        { refresh },
        { isRefreshRequest: true },
      );

      const newAccess = refreshResponse.data.access;
      const newRefresh = refreshResponse.data.refresh ?? refresh;
      localStorage.setItem('refresh', newRefresh);
      store.dispatch({ type: 'auth/setAccess', payload: newAccess });

      originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      return apiClient(originalRequest);
    } catch {
      store.dispatch({ type: 'auth/clearSession' });
      return Promise.reject(normalizeError(error));
    }
  },
);
