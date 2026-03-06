import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getDoctorAppointments } from '../../api/doctorApi';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getDoctorAppointments();
        setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load today appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const todaysAppointments = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter((appointment) => {
      const dateValue = appointment?.appointmentDate;
      if (!dateValue) {
        return false;
      }
      return dateValue.toString().slice(0, 10) === today;
    });
  }, [appointments]);

  return (
    <div className="dashboard">
      <h2>Welcome, Dr. {user?.name || 'Doctor'}!</h2>
      <div className="dashboard-options">
        <Link to="/doctor/appointments">View Appointments</Link>
        <Link to="/doctor/availability">Set Availability</Link>
      </div>
      <section>
        <h3>Today's Appointments</h3>
        {loading ? (
          <Loader text="Loading today's appointments..." />
        ) : error ? (
          <ErrorState message={error} />
        ) : todaysAppointments.length === 0 ? (
          <EmptyState message="No appointments scheduled for today." />
        ) : (
          <ul>
            {todaysAppointments.map((appointment) => (
              <li key={appointment.id}>
                {appointment.appointmentTime} - {appointment.user?.name || 'Unknown User'}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DoctorDashboard;

