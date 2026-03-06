import React from 'react';

const AppointmentCard = ({
  appointment,
  onCancel,
  onUpdateStatus,
  onComplete,
  isCancelling = false,
  isCompleting = false,
}) => {
  const canComplete = appointment.status !== 'APPROVED' && appointment.status !== 'REJECTED';

  return (
    <div className="appointment-card">
      <h3>
        {appointment.doctor?.name
          ? `Appointment with Dr. ${appointment.doctor.name}`
          : `Appointment for ${appointment.name || 'Patient'}`}
      </h3>
      {appointment.doctor?.specialization && <p>Specialization: {appointment.doctor.specialization}</p>}
      <p>Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
      <p>Time: {appointment.appointmentTime}</p>
      <p>Status: {appointment.status}</p>
      {appointment.user && <p>User: {appointment.user?.name}</p>}
      {onCancel && appointment.status === 'PENDING' && (
        <button type="button" onClick={() => onCancel(appointment.id)} disabled={isCancelling}>
          {isCancelling ? 'Cancelling...' : 'Cancel'}
        </button>
      )}
      {onComplete && canComplete && (
        <button type="button" onClick={() => onComplete(appointment.id)} disabled={isCompleting}>
          {isCompleting ? 'Marking...' : 'Mark Completed'}
        </button>
      )}
      {onUpdateStatus && (
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
  );
};

export default AppointmentCard;

