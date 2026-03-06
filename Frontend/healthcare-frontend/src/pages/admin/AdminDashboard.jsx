import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getHealthStatus } from '../../api/adminApi';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [health, setHealth] = useState('Checking backend...');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await getHealthStatus();
        setHealth(typeof response === 'string' ? response : 'Backend is up');
      } catch {
        setHealth('Backend health check failed');
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}!</h2>
      <p>{health}</p>
      <div className="dashboard-options">
        <Link to="/admin/add-doctor">Manage Doctor</Link>
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/appointments">All Appointments</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
