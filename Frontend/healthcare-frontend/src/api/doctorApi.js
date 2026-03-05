import axiosInstance from './axiosConfig';

export const getDoctors = async () => {
  const response = await axiosInstance.get('/doctors');
  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await axiosInstance.get(`/doctors/${id}`);
  return response.data;
};

export const updateDoctor = async (id, data) => {
  const response = await axiosInstance.put(`/doctors/${id}`, data);
  return response.data;
};

export const setAvailability = async (availabilityData) => {
  const response = await axiosInstance.post('/doctors/availability', availabilityData);
  return response.data;
};

export const getDoctorAppointments = async () => {
  const response = await axiosInstance.get('/doctors/appointments');
  return response.data;
};