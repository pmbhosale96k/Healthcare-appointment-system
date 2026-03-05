import React from 'react';

const DoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="doctor-card">
      <h3>{doctor.name}</h3>
      <p>Specialization: {doctor.specialization}</p>
      <p>Hospital: {doctor.hospital?.name}</p>
      <p>Email: {doctor.email}</p>
      <button onClick={() => onBookAppointment(doctor)}>Book Appointment</button>
    </div>
  );
};

export default DoctorCard;