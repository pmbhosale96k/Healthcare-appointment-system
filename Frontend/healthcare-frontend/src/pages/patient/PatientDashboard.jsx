import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard page-shell">
      <div className="dashboard-hero">
        <p className="eyebrow">Patient Portal</p>
        <h2>Welcome back, {user.name}!</h2>
        <p className="hero-subtitle">Manage consultations, discover specialists, and track every appointment in one view.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Profile Type</p>
          <h3>Patient</h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Priority</p>
          <h3>Routine Care</h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Quick Tip</p>
          <h3>Book early slots</h3>
        </div>
      </div>

      <div className="dashboard-options dashboard-grid">
        <Link to="/patient/search-doctors" className="action-card">
          <h4>Search Doctors</h4>
          <p>Filter and select the right specialist.</p>
        </Link>
        <Link to="/patient/book-appointment" className="action-card">
          <h4>Book Appointment</h4>
          <p>Schedule a new consultation in minutes.</p>
        </Link>
        <Link to="/patient/my-appointments" className="action-card">
          <h4>My Appointments</h4>
          <p>Review status and update pending requests.</p>
        </Link>
      </div>
    </div>
  );
};

export default PatientDashboard;
