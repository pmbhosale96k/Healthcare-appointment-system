import axiosInstance from './axiosConfig';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/user/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post('/user/register', userData);
  return response.data;
};

export const refreshAccessToken = async (refreshToken) => {
  const response = await axiosInstance.post('/user/refresh', { refreshToken });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
