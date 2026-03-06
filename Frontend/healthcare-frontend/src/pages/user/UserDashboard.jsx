import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUserAppointments } from '../../api/appointmentApi';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';

const UserDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const data = await getUserAppointments();
        setAppointments(Array.isArray(data) ? data : []);
      } catch {
        setError('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  const { upcomingAppointments, pastAppointments } = useMemo(() => {
    const now = new Date();
    const upcoming = [];
    const past = [];

    appointments.forEach((appointment) => {
      const appointmentDateTime = new Date(
        `${appointment?.appointmentDate || ''}T${appointment?.appointmentTime || '00:00'}`
      );

      if (Number.isNaN(appointmentDateTime.getTime()) || appointmentDateTime >= now) {
        upcoming.push(appointment);
      } else {
        past.push(appointment);
      }
    });

    return { upcomingAppointments: upcoming, pastAppointments: past };
  }, [appointments]);

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.name || 'User'}!</h2>
      <div className="dashboard-options">
        <Link to="/user/doctors">Search Doctors</Link>
        <Link to="/user/appointments">My Appointments</Link>
      </div>
      {loading ? (
        <Loader text="Loading appointment overview..." />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <div className="dashboard-sections">
          <section>
            <h3>Upcoming Appointments</h3>
            {upcomingAppointments.length === 0 ? (
              <EmptyState message="No upcoming appointments." />
            ) : (
              <ul>
                {upcomingAppointments.map((appointment) => (
                  <li key={appointment.id}>
                    {appointment.appointmentDate} | {appointment.appointmentTime} | {appointment.status}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h3>Past Appointments</h3>
            {pastAppointments.length === 0 ? (
              <EmptyState message="No past appointments." />
            ) : (
              <ul>
                {pastAppointments.map((appointment) => (
                  <li key={appointment.id}>
                    {appointment.appointmentDate} | {appointment.appointmentTime} | {appointment.status}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
