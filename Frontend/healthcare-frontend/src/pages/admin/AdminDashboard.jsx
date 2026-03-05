import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}!</h2>
      <div className="dashboard-options">
        <Link to="/admin/manage-doctors">Manage Doctors</Link>
        <Link to="/admin/all-appointments">All Appointments</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;