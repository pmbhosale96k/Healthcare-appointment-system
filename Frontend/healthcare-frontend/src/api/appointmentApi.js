import axiosInstance from './axiosConfig';

export const bookAppointment = async (appointmentData) => {
  const response = await axiosInstance.post('/appointments', appointmentData);
  return response.data;
};

export const getPatientAppointments = async () => {
  const response = await axiosInstance.get('/appointments/patient');
  return response.data;
};

export const getAllAppointments = async () => {
  const response = await axiosInstance.get('/appointments');
  return response.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const response = await axiosInstance.put(`/appointments/${id}/status`, { status });
  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await axiosInstance.put(`/appointments/${id}/cancel`);
  return response.data;
};