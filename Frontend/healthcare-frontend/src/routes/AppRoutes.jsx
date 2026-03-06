import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import UserDashboard from '../pages/user/UserDashboard';
import SearchDoctors from '../pages/user/SearchDoctors';
import BookAppointment from '../pages/user/BookAppointment';
import MyAppointments from '../pages/user/MyAppointments';
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import DoctorAppointments from '../pages/doctor/DoctorAppointments';
import SetAvailability from '../pages/doctor/SetAvailability';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageDoctors from '../pages/admin/ManageDoctors';
import ManageUsers from '../pages/admin/ManageUsers';
import AllAppointments from '../pages/admin/AllAppointments';
import ProtectedRoute from './ProtectedRoute';

const withProtectedLayout = (component, allowedRoles) => (
  <ProtectedRoute allowedRoles={allowedRoles}>
    <DashboardLayout>{component}</DashboardLayout>
  </ProtectedRoute>
);

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/user/dashboard" element={withProtectedLayout(<UserDashboard />, ['USER'])} />
        <Route path="/user/doctors" element={withProtectedLayout(<SearchDoctors />, ['USER'])} />
        <Route path="/user/book/:doctorId" element={withProtectedLayout(<BookAppointment />, ['USER'])} />
        <Route path="/user/appointments" element={withProtectedLayout(<MyAppointments />, ['USER'])} />

        <Route path="/doctor/dashboard" element={withProtectedLayout(<DoctorDashboard />, ['DOCTOR'])} />
        <Route path="/doctor/appointments" element={withProtectedLayout(<DoctorAppointments />, ['DOCTOR'])} />
        <Route path="/doctor/availability" element={withProtectedLayout(<SetAvailability />, ['DOCTOR'])} />

        <Route path="/admin/dashboard" element={withProtectedLayout(<AdminDashboard />, ['ADMIN'])} />
        <Route path="/admin/add-doctor" element={withProtectedLayout(<ManageDoctors />, ['ADMIN'])} />
        <Route path="/admin/doctors" element={<Navigate to="/admin/add-doctor" replace />} />
        <Route path="/admin/users" element={withProtectedLayout(<ManageUsers />, ['ADMIN'])} />
        <Route path="/admin/appointments" element={withProtectedLayout(<AllAppointments />, ['ADMIN'])} />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
