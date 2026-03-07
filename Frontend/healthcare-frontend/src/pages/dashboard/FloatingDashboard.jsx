import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Calendar, CheckCircle2, Clock3, AlertCircle, User, Users, BriefcaseMedical } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getPatientAppointments, getAllAppointments } from '../../api/appointmentApi';
import { getDoctorAppointments } from '../../api/doctorApi';
import { getAllDoctors } from '../../api/adminApi';
import './FloatingDashboard.css';

const getRoleLinks = (role) => {
  if (role === 'PATIENT') {
    return [
      { to: '/patient/search-doctors', label: 'Search Doctors' },
      { to: '/patient/book-appointment', label: 'Book Appointment' },
      { to: '/patient/my-appointments', label: 'My Appointments' },
    ];
  }

  if (role === 'DOCTOR') {
    return [
      { to: '/doctor/appointments', label: 'Review Appointments' },
      { to: '/doctor/set-availability', label: 'Set Availability' },
    ];
  }

  return [
    { to: '/admin/manage-doctors', label: 'Manage Doctors' },
    { to: '/admin/all-appointments', label: 'All Appointments' },
  ];
};

const normalizeDate = (item) => {
  if (!item?.appointmentDate) return null;
  const rawDate = String(item.appointmentDate);
  const rawTime = item.appointmentTime ? String(item.appointmentTime) : '00:00';

  if (rawDate.includes('T')) {
    return new Date(rawDate);
  }

  return new Date(`${rawDate}T${rawTime}`);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="fc-tooltip">
        <div className="fc-tooltip-label">{label}</div>
        <div className="fc-tooltip-value">{payload[0].value} appointments</div>
      </div>
    );
  }

  return null;
};

const FloatingDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingAppts, setLoadingAppts] = useState(true);
  const [error, setError] = useState('');

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setError('');
        setLoadingAppts(true);

        let data = [];

        if (user?.role === 'PATIENT') {
          data = await getPatientAppointments(user.email);
        } else if (user?.role === 'DOCTOR') {
          data = await getDoctorAppointments();
        } else if (user?.role === 'ADMIN') {
          data = await getAllAppointments();
          const allDoctors = await getAllDoctors();
          setDoctors(allDoctors || []);
        }

        setAppointments(data || []);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoadingAppts(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const statusCounts = useMemo(() => {
    return appointments.reduce(
      (acc, item) => {
        const key = String(item.status || 'PENDING').toUpperCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      { PENDING: 0, APPROVED: 0, REJECTED: 0 }
    );
  }, [appointments]);

  const trendData = useMemo(() => {
    const labels = Array.from({ length: 7 }).map((_, index) => {
      const day = new Date();
      day.setDate(day.getDate() - (6 - index));
      return {
        key: day.toISOString().slice(0, 10),
        label: day.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        count: 0,
      };
    });

    const byDate = Object.fromEntries(labels.map((d) => [d.key, d]));

    appointments.forEach((item) => {
      const date = normalizeDate(item);
      if (!date || Number.isNaN(date.getTime())) return;

      const key = date.toISOString().slice(0, 10);
      if (byDate[key]) {
        byDate[key].count += 1;
      }
    });

    return labels.map((l) => byDate[l.key]);
  }, [appointments]);

  const upcomingAppointment = useMemo(() => {
    const now = new Date();

    const future = appointments
      .map((item) => ({ ...item, parsedDate: normalizeDate(item) }))
      .filter((item) => item.parsedDate && item.parsedDate >= now)
      .sort((a, b) => a.parsedDate - b.parsedDate);

    return future[0] || null;
  }, [appointments]);

  const recentAppointments = useMemo(() => {
    return appointments
      .map((item) => ({ ...item, parsedDate: normalizeDate(item) }))
      .sort((a, b) => (b.parsedDate?.getTime() || 0) - (a.parsedDate?.getTime() || 0))
      .slice(0, 5);
  }, [appointments]);

  const fallbackName = user?.name || 'Registered User';
  const roleDisplay = user?.role || 'Guest';
  const roleLinks = getRoleLinks(roleDisplay);

  return (
    <div className="fc-dashboard-container">
      <div className="fc-main-content">
        <div className="fc-header">
          <div>
            <h1>{roleDisplay} Dashboard</h1>
            <p className="fc-subtitle">Live operational data from your account activity</p>
          </div>
          <span className="fc-status-pill">{loadingAppts ? 'Syncing' : 'Live Data'}</span>
        </div>

        {error && <div className="fc-error">{error}</div>}

        <div className="fc-bento-grid">
          <div className="fc-glass-card card-profile">
            <div className="fc-card-title"><User size={16} /> Profile</div>
            <div className="patient-profile">
              <div className="patient-avatar">{getInitials(user?.name)}</div>
              <div className="patient-details">
                <h3>{fallbackName}</h3>
                <p>{user?.email}</p>
              </div>
            </div>
            <div className="vitals-grid">
              <div className="vital-item">
                <span className="label">Role</span>
                <span className="value">{roleDisplay}</span>
              </div>
              <div className="vital-item">
                <span className="label">Appointments</span>
                <span className="value">{loadingAppts ? '...' : appointments.length}</span>
              </div>
            </div>
          </div>

          <div className="fc-glass-card card-summary">
            <div className="fc-card-title"><Clock3 size={16} /> Status Summary</div>
            <div className="fc-stats-row">
              <div className="fc-stat-block">
                <div className="fc-stat-label">Pending</div>
                <div className="fc-stat-value">{statusCounts.PENDING || 0}</div>
              </div>
              <div className="fc-stat-block">
                <div className="fc-stat-label">Approved</div>
                <div className="fc-stat-value approved">{statusCounts.APPROVED || 0}</div>
              </div>
              <div className="fc-stat-block">
                <div className="fc-stat-label">Rejected</div>
                <div className="fc-stat-value rejected">{statusCounts.REJECTED || 0}</div>
              </div>
            </div>
          </div>

          <div className="fc-glass-card card-next">
            <div className="fc-card-title"><Calendar size={16} /> Next Appointment</div>
            {upcomingAppointment ? (
              <div className="fc-next-wrap">
                <div className="fc-next-date">
                  {upcomingAppointment.parsedDate.toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <div className="fc-next-time">
                  {upcomingAppointment.parsedDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div className="fc-next-name">
                  {upcomingAppointment.name || upcomingAppointment.patientName || upcomingAppointment.email || 'Appointment'}
                </div>
                <span className={`fc-status-indicator ${String(upcomingAppointment.status || '').toLowerCase()}`}>
                  {upcomingAppointment.status || 'PENDING'}
                </span>
              </div>
            ) : (
              <div className="fc-empty">No upcoming appointments</div>
            )}
          </div>

          <div className="fc-glass-card card-chart">
            <div className="fc-card-title"><Calendar size={16} /> Last 7 Days Trend</div>
            <div className="fc-chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAppt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-line)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--chart-line)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: 'var(--muted-text)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: 'var(--muted-text)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="count" stroke="var(--chart-line)" strokeWidth={2} fillOpacity={1} fill="url(#colorAppt)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="fc-glass-card card-approved">
            <div className="fc-card-title"><CheckCircle2 size={16} /> Approved</div>
            <div className="fc-value-large">{statusCounts.APPROVED || 0}</div>
            <div className="fc-mini-label">Successfully confirmed appointments</div>
          </div>

          <div className="fc-glass-card card-pending">
            <div className="fc-card-title"><AlertCircle size={16} /> Pending</div>
            <div className="fc-value-large">{statusCounts.PENDING || 0}</div>
            <div className="fc-mini-label">Need action from doctor or admin</div>
          </div>

          <div className="fc-glass-card card-doctors">
            <div className="fc-card-title"><Users size={16} /> Doctors</div>
            <div className="fc-value-large">{roleDisplay === 'ADMIN' ? doctors.length : '-'}</div>
            <div className="fc-mini-label">{roleDisplay === 'ADMIN' ? 'Current doctor records' : 'Visible to admin only'}</div>
          </div>

          <div className="fc-glass-card card-actions">
            <div className="fc-card-title"><BriefcaseMedical size={16} /> Quick Actions</div>
            <div className="fc-actions-grid">
              {roleLinks.map((item) => (
                <Link key={item.to} to={item.to} className="fc-link-btn">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="fc-glass-card card-recent">
            <div className="fc-card-title"><Clock3 size={16} /> Recent Appointments</div>
            {recentAppointments.length === 0 ? (
              <div className="fc-empty">No appointments available</div>
            ) : (
              <div className="fc-list">
                {recentAppointments.map((item) => (
                  <div key={item.id} className="fc-list-row">
                    <div>
                      <strong>{item.name || item.patientName || item.email || 'Appointment'}</strong>
                      <p>
                        {item.parsedDate
                          ? item.parsedDate.toLocaleString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Date unavailable'}
                      </p>
                    </div>
                    <span className={`fc-status-indicator ${String(item.status || '').toLowerCase()}`}>
                      {item.status || 'PENDING'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingDashboard;
