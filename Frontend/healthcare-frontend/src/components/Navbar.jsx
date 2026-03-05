import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to={`/${user.role.toLowerCase()}/dashboard`}>Healthcare App</Link>
      </div>
      <div className="navbar-menu">
        {user.role === 'PATIENT' && (
          <>
            <Link to="/patient/dashboard">Dashboard</Link>
            <Link to="/patient/search-doctors">Search Doctors</Link>
            <Link to="/patient/my-appointments">My Appointments</Link>
          </>
        )}
        {user.role === 'DOCTOR' && (
          <>
            <Link to="/doctor/dashboard">Dashboard</Link>
            <Link to="/doctor/appointments">Appointments</Link>
            <Link to="/doctor/set-availability">Set Availability</Link>
          </>
        )}
        {user.role === 'ADMIN' && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/manage-doctors">Manage Doctors</Link>
            <Link to="/admin/all-appointments">All Appointments</Link>
          </>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;