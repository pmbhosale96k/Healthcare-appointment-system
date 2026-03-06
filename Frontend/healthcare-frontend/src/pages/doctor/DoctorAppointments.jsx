import React, { useEffect, useState } from 'react';
import { getDoctorAppointments, updateAppointmentStatus } from '../../api/doctorApi';
import AppointmentCard from '../../components/AppointmentCard';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getDoctorAppointments();
      setAppointments(Array.isArray(data) ? data : []);
    } catch {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    setUpdatingId(id);
    setError('');
    setSuccess('');
    try {
      await updateAppointmentStatus(id, status);
      setSuccess('Appointment status updated.');
      await fetchAppointments();
    } catch {
      setError('Failed to update appointment status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Loader text="Loading appointments..." />;

  return (
    <div className="doctor-appointments">
      <h2>Doctor Appointments</h2>
      {error && <ErrorState message={error} onRetry={fetchAppointments} />}
      {success && <p className="success">{success}</p>}
      <div className="appointments-list">
        {appointments.length === 0 ? (
          <EmptyState message="No appointments found." />
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onUpdateStatus={handleUpdateStatus}
              isCompleting={updatingId === appointment.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
