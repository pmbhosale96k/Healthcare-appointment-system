import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <aside className="sidebar">
      <h3>Workspace</h3>
      <nav>
        {user.role === 'USER' && (
          <>
            <NavLink className={({ isActive }) => (isActive ? 'side-link active' : 'side-link')} to="/user/dashboard">
              Dashboard
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'side-link active' : 'side-link')} to="/user/doctors">
              Search Doctors
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'side-link active' : 'side-link')} to="/user/appointments">
              Appointments
            </NavLink>
          </>
        )}
        {user.role === 'DOCTOR' && (
          <>
            <NavLink className={({ isActive }) => (isActive ? 'side-link active' : 'side-link')} to="/doctor/dashboard">
              Dashboard
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'side-link active' : 'side-link')} to="/doctor/appointments">
              Appointments
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'side-link active' : 'side-link')} to="/doctor/availability">
              Availability
            </NavLink>
          </>
        )}
        {user.role === 'ADMIN' && (
          <>
            <NavLink className={({ isActive }) => (isActive ? 'side-link active' : 'side-link')} to="/admin/dashboard">
              Dashboard
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'side-link active' : 'side-link')} to="/admin/add-doctor">
              Manage Doctor
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'side-link active' : 'side-link')} to="/admin/users">
              Users
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'side-link active' : 'side-link')} to="/admin/appointments">
              Appointments
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
