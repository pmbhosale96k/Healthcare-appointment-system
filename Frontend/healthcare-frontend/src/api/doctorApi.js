import axiosInstance from './axiosConfig';

export const getDoctors = async () => {
  const response = await axiosInstance.get('/admin/doctors');
  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await axiosInstance.get(`/admin/doctors/${id}`);
  return response.data;
};

export const updateDoctor = async (id, data) => {
  const response = await axiosInstance.put(`/admin/doctors/${id}`, data);
  return response.data;
};

export const setAvailability = async () => {
  throw new Error('Set availability endpoint is not available in backend');
};

export const getDoctorAppointments = async () => {
  const response = await axiosInstance.get('/doctor/appointments');
  return response.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const response = await axiosInstance.put(`/api/appointments/${id}/status`, null, {
    params: { status },
  });
  return response.data;
};
