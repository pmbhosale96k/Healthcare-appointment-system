import React, { useState, useEffect } from 'react';
import { getDoctorAppointments, updateAppointmentStatus } from '../../api/doctorApi';
import AppointmentCard from '../../components/AppointmentCard';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getDoctorAppointments();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      fetchAppointments(); // Refresh the list
    } catch (err) {
      setError('Failed to update appointment status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="doctor-appointments">
      <h2>My Appointments</h2>
      <div className="appointments-list">
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onUpdateStatus={handleUpdateStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;