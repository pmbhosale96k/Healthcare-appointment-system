import axiosInstance from './axiosConfig';

export const login = async (credentials, role = 'PATIENT') => {
  const selectedRole = role.toUpperCase();

  if (selectedRole === 'ADMIN') {
    const response = await axiosInstance.post('/auth/admin/login', credentials);
    return { accessToken: response.data, refreshToken: null, role: 'ADMIN' };
  }

  if (selectedRole === 'DOCTOR') {
    const response = await axiosInstance.post('/auth/doctor/login', credentials);
    return { accessToken: response.data, refreshToken: null, role: 'DOCTOR' };
  }

  const response = await axiosInstance.post('/api/user/login', credentials);
  return { ...response.data, role: 'PATIENT' };
};

export const register = async (userData) => {
  const response = await axiosInstance.post('/api/user/register', userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
