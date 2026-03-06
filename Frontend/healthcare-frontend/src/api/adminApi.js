import axiosInstance from './axiosConfig';

export const getAllDoctors = async () => {
  const response = await axiosInstance.get('/admin/doctors');
  return response.data;
};

export const addDoctor = async (doctorData) => {
  const response = await axiosInstance.post('/admin/doctors', doctorData);
  return response.data;
};

export const updateDoctor = async (id, doctorData) => {
  const response = await axiosInstance.put(`/admin/doctors/${id}`, doctorData);
  return response.data;
};

export const deleteDoctor = async (id) => {
  const response = await axiosInstance.delete(`/admin/doctors/${id}`);
  return response.data;
};

export const getAllAppointments = async () => {
  const response = await axiosInstance.get('/admin/appointments');
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axiosInstance.get('/admin/users');
  return response.data;
};

export const getHealthStatus = async () => {
  const response = await axiosInstance.get('/health');
  return response.data;
};
