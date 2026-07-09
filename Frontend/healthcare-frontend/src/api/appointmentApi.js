import axiosInstance from './axiosConfig';

export const bookAppointment = async (appointmentData) => {
  const response = await axiosInstance.post('/api/appointments/book', appointmentData);
  return response.data;
};

export const getPatientAppointments = async (email) => {
  const response = await axiosInstance.get('/api/appointments/my', {
    params: email ? { email } : {},
  });
  return response.data;
};

export const getAllAppointments = async () => {
  const response = await axiosInstance.get('/api/appointments/all');
  return response.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const response = await axiosInstance.put(`/api/appointments/${id}/status`, null, {
    params: { status },
  });
  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await axiosInstance.put(`/api/appointments/${id}/cancel`);
  return response.data;
};
