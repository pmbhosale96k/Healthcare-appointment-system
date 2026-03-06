import React, { useState, useEffect } from 'react';
import { getAllAppointments } from '../../api/adminApi';
import AppointmentCard from '../../components/AppointmentCard';

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAllAppointments();
      setAppointments(data);
    } catch {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="all-appointments page-shell">
      <div className="section-head">
        <p className="eyebrow">Operations Feed</p>
      </div>
      <h2>All Appointments</h2>
      <div className="appointments-list">
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
