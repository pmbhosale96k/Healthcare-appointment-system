import React, { useState, useEffect } from 'react';
import { getPatientAppointments, cancelAppointment } from '../../api/appointmentApi';
import AppointmentCard from '../../components/AppointmentCard';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getPatientAppointments();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      fetchAppointments(); // Refresh the list
    } catch (err) {
      setError('Failed to cancel appointment');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="my-appointments">
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