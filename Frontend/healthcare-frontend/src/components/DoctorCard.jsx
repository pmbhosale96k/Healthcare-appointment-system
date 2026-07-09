import React from 'react';

const DoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="doctor-card">
      <div className="card-head">
        <h3>{doctor.name}</h3>
        <span className="pill">{doctor.specialization}</span>
      </div>
      <p><strong>Experience:</strong> {doctor.experience ?? 0} years</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <button onClick={() => onBookAppointment(doctor)}>Book Appointment</button>
    </div>
  );
};

export default DoctorCard;
