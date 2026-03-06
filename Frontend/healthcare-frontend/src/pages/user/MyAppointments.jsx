import React, { useEffect, useMemo, useState } from 'react';
import { getUserAppointments } from '../../api/appointmentApi';
import AppointmentCard from '../../components/AppointmentCard';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import { useAuth } from '../../context/AuthContext';

const MyAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const sortedAppointments = useMemo(() => {
    return [...appointments].sort((a, b) => {
      const aDate = new Date(`${a.appointmentDate}T${a.appointmentTime || '00:00'}`).getTime();
      const bDate = new Date(`${b.appointmentDate}T${b.appointmentTime || '00:00'}`).getTime();
      return bDate - aDate;
    });
  }, [appointments]);

  if (loading) return <Loader text="Loading appointments..." />;

  return (
    <div className="my-appointments">
      <h2>My Appointments</h2>
      {error && <ErrorState message={error} onRetry={fetchAppointments} />}
      <div className="appointments-list">
        {sortedAppointments.length === 0 ? (
          <EmptyState message="No appointments found." />
        ) : (
          sortedAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
