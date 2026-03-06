// API base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// User roles
export const ROLES = {
  USER: 'USER',
  DOCTOR: 'DOCTOR',
  ADMIN: 'ADMIN'
};

// Appointment statuses
export const APPOINTMENT_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};
