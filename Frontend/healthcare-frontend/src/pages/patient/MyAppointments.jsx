import React, { useState, useEffect, useCallback } from 'react';
import { getPatientAppointments, cancelAppointment } from '../../api/appointmentApi';
import AppointmentCard from '../../components/AppointmentCard';
import { useAuth } from '../../context/AuthContext';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchAppointments = useCallback(async () => {
    try {
      const data = await getPatientAppointments(user?.email);
      setAppointments(data);
    } catch {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      fetchAppointments();
    }
  }, [user?.email, fetchAppointments]);

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      fetchAppointments(); // Refresh the list
    } catch {
      setError('Failed to cancel appointment');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="my-appointments page-shell">
      <div className="section-head">
        <p className="eyebrow">Patient Timeline</p>
      </div>
      <h2>My Appointments</h2>
      <div className="appointments-list">
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={handleCancel}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
