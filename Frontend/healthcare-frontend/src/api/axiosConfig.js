import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const isRefreshCall = originalRequest?.url?.includes('/user/refresh');

    if (isUnauthorized && !originalRequest?._retry && !isRefreshCall) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const refreshResponse = await refreshClient.post('/user/refresh', { refreshToken });
          const newAccessToken = refreshResponse.data?.accessToken;
          const newRefreshToken = refreshResponse.data?.refreshToken;

          if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('token', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }

          if (newAccessToken) {
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
