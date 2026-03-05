import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DoctorDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h2>Welcome, Dr. {user.name}!</h2>
      <div className="dashboard-options">
        <Link to="/doctor/appointments">View Appointments</Link>
        <Link to="/doctor/set-availability">Set Availability</Link>
      </div>
    </div>
  );
};

export default DoctorDashboard;