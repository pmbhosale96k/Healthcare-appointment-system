import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import PatientDashboard from '../pages/patient/PatientDashboard';
import SearchDoctors from '../pages/patient/SearchDoctors';
import BookAppointment from '../pages/patient/BookAppointment';
import MyAppointments from '../pages/patient/MyAppointments';
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import DoctorAppointments from '../pages/doctor/DoctorAppointments';
import SetAvailability from '../pages/doctor/SetAvailability';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageDoctors from '../pages/admin/ManageDoctors';
import AllAppointments from '../pages/admin/AllAppointments';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Patient routes */}
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute allowedRoles={['PATIENT']}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/search-doctors"
            element={
              <ProtectedRoute allowedRoles={['PATIENT']}>
                <SearchDoctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/book-appointment"
            element={
              <ProtectedRoute allowedRoles={['PATIENT']}>
                <BookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/my-appointments"
            element={
              <ProtectedRoute allowedRoles={['PATIENT']}>
                <MyAppointments />
              </ProtectedRoute>
            }
          />

          {/* Doctor routes */}
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute allowedRoles={['DOCTOR']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoute allowedRoles={['DOCTOR']}>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/set-availability"
            element={
              <ProtectedRoute allowedRoles={['DOCTOR']}>
                <SetAvailability />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-doctors"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <ManageDoctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/all-appointments"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AllAppointments />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;