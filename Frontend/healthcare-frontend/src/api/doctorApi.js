import axiosInstance from './axiosConfig';

export const getDoctors = async () => {
  const response = await axiosInstance.get('/doctors');
  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await axiosInstance.get(`/doctors/${id}`);
  return response.data;
};

export const getDoctorAvailability = async (doctorId, date) => {
  const response = await axiosInstance.get(`/doctors/${doctorId}/availability`, {
    params: date ? { date } : {},
  });
  return response.data;
};

export const updateDoctor = async (id, data) => {
  const response = await axiosInstance.put(`/doctors/${id}`, data);
  return response.data;
};

export const setAvailability = async (availabilityData) => {
  const response = await axiosInstance.post('/doctor/availability', availabilityData);
  return response.data;
};

export const getMyAvailability = async () => {
  const response = await axiosInstance.get('/doctor/availability');
  return response.data;
};

export const deleteAvailabilitySlot = async (id) => {
  const response = await axiosInstance.delete(`/doctor/availability/${id}`);
  return response.data;
};

export const getDoctorAppointments = async () => {
  const response = await axiosInstance.get('/doctor/appointments');
  return response.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const response = await axiosInstance.put(`/appointments/${id}/status`, null, { params: { status } });
  return response.data;
};
