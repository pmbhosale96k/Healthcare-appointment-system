import axiosInstance from './axiosConfig';

export const bookAppointment = async (appointmentData) => {
  const response = await axiosInstance.post('/appointments/book', appointmentData);
  return response.data;
};

export const getUserAppointments = async () => {
  const response = await axiosInstance.get('/appointments/my');
  return response.data;
};

export const getAllAppointments = async () => {
  const response = await axiosInstance.get('/appointments');
  return response.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const response = await axiosInstance.put(`/appointments/${id}/status`, null, { params: { status } });
  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await axiosInstance.put(`/appointments/${id}/cancel`);
  return response.data;
};

