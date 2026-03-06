import React from 'react';

const DoctorCard = ({ doctor, onBookAppointment, isBooking = false }) => {
  return (
    <div className="doctor-card">
      <h3>{doctor.name}</h3>
      <p>Specialization: {doctor.specialization}</p>
      <p>Email: {doctor.email}</p>
      <p>Experience: {doctor.experience ?? 0} years</p>
      <button type="button" onClick={() => onBookAppointment(doctor)} disabled={isBooking}>
        {isBooking ? 'Opening...' : 'Book Appointment'}
      </button>
    </div>
  );
};

export default DoctorCard;
