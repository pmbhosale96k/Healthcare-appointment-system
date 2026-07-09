import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard page-shell">
      <div className="dashboard-hero">
        <p className="eyebrow">Admin Control Center</p>
        <h2>Welcome, {user.name}!</h2>
        <p className="hero-subtitle">Coordinate platform operations, optimize staffing, and monitor appointment flow.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Access Level</p>
          <h3>Administrator</h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Ops Focus</p>
          <h3>Capacity Planning</h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Health Signal</p>
          <h3>System Stable</h3>
        </div>
      </div>

      <div className="dashboard-options dashboard-grid">
        <Link to="/admin/manage-doctors" className="action-card">
          <h4>Manage Doctors</h4>
          <p>Add, update, and maintain doctor records.</p>
        </Link>
        <Link to="/admin/all-appointments" className="action-card">
          <h4>All Appointments</h4>
          <p>Monitor lifecycle and clinic-wide activity.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
