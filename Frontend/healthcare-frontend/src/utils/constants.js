// API base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://healthcare-appointment-system-9mxq.onrender.com';

// User roles
export const ROLES = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  ADMIN: 'ADMIN'
};

// Appointment statuses
export const APPOINTMENT_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};
