import React from 'react';

const AppointmentCard = ({ appointment, onCancel, onUpdateStatus }) => {
  const appointmentName = appointment.doctor?.name || appointment.name || 'N/A';
  const dateValue = appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : 'N/A';
  const timeValue = appointment.appointmentTime || 'N/A';
  const statusClass = `status-badge status-${String(appointment.status || '').toLowerCase()}`;

  return (
    <div className="appointment-card">
      <div className="card-head">
        <h3>Appointment with {appointmentName}</h3>
        <span className={statusClass}>{appointment.status}</span>
      </div>
      <p><strong>Date:</strong> {dateValue}</p>
      <p><strong>Time:</strong> {timeValue}</p>
      {appointment.patient && <p>Patient: {appointment.patient.name}</p>}
      <div className="card-actions">
        {onCancel && appointment.id && appointment.status === 'PENDING' && (
          <button onClick={() => onCancel(appointment.id)}>Cancel</button>
        )}
        {onUpdateStatus && appointment.id && (
          <select
            value={appointment.status}
            onChange={(e) => onUpdateStatus(appointment.id, e.target.value)}
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
