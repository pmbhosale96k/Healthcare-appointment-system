import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to={`/${user.role.toLowerCase()}/dashboard`}>Healthcare App</Link>
      </div>
      <div className="navbar-menu">
        {user.role === 'USER' && (
          <>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/user/dashboard">
              Dashboard
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/user/doctors">
              Search Doctors
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/user/appointments">
              My Appointments
            </NavLink>
          </>
        )}
        {user.role === 'DOCTOR' && (
          <>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/doctor/dashboard">
              Dashboard
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/doctor/appointments">
              Appointments
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/doctor/availability">
              Availability
            </NavLink>
          </>
        )}
        {user.role === 'ADMIN' && (
          <>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/admin/dashboard">
              Dashboard
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/admin/add-doctor">
              Manage Doctor
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/admin/users">
              Manage Users
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/admin/appointments">
              Appointments
            </NavLink>
          </>
        )}
        <button type="button" className="ghost-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
