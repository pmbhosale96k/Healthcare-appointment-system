import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}!</h2>
      <div className="dashboard-options">
        <Link to="/patient/search-doctors">Search Doctors</Link>
        <Link to="/patient/book-appointment">Book Appointment</Link>
        <Link to="/patient/my-appointments">My Appointments</Link>
      </div>
    </div>
  );
};

export default PatientDashboard;