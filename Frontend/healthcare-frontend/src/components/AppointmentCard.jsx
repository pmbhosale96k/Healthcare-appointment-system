import React from 'react';

const AppointmentCard = ({ appointment, onCancel, onUpdateStatus }) => {
  return (
    <div className="appointment-card">
      <h3>Appointment with {appointment.doctor?.name}</h3>
      <p>Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
      <p>Time: {appointment.appointmentTime}</p>
      <p>Status: {appointment.status}</p>
      {appointment.patient && <p>Patient: {appointment.patient.name}</p>}
      {onCancel && appointment.status === 'PENDING' && (
        <button onClick={() => onCancel(appointment.id)}>Cancel</button>
      )}
      {onUpdateStatus && (
        <select
          value={appointment.status}
          onChange={(e) => onUpdateStatus(appointment.id, e.target.value)}
        >
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="COMPLETED">Completed</option>
        </select>
      )}
    </div>
  );
};

export default AppointmentCard;