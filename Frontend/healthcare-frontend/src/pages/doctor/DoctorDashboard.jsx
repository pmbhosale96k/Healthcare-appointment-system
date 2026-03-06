import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DoctorDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard page-shell">
      <div className="dashboard-hero">
        <p className="eyebrow">Doctor Workspace</p>
        <h2>Welcome, Dr. {user.name}!</h2>
        <p className="hero-subtitle">Track your day, manage consultation outcomes, and control available slots.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Role</p>
          <h3>Doctor</h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Mode</p>
          <h3>Clinical Review</h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Reminder</p>
          <h3>Update statuses daily</h3>
        </div>
      </div>

      <div className="dashboard-options dashboard-grid">
        <Link to="/doctor/appointments" className="action-card">
          <h4>View Appointments</h4>
          <p>Approve, reject, and monitor patient requests.</p>
        </Link>
        <Link to="/doctor/set-availability" className="action-card">
          <h4>Set Availability</h4>
          <p>Configure your upcoming consultation windows.</p>
        </Link>
      </div>
    </div>
  );
};

export default DoctorDashboard;
