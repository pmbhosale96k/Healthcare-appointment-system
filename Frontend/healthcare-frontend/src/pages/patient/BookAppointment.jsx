import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookAppointment } from '../../api/appointmentApi';
import { useAuth } from '../../context/AuthContext';

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: '',
    email: user?.email || '',
    doctorId: doctor?.id || '',
    appointmentDate: '',
    appointmentTime: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!formData.doctorId) {
      setError('Please select a doctor from Search Doctors before booking.');
      return;
    }
    try {
      await bookAppointment(formData);
      setSuccess('Appointment booked successfully!');
      setTimeout(() => navigate('/patient/my-appointments'), 2000);
    } catch {
      setError('Failed to book appointment');
    }
  };

  return (
    <div className="book-appointment page-shell">
      <div className="section-head">
        <p className="eyebrow">Booking Desk</p>
      </div>
      <h2>Book Appointment</h2>
      {doctor && <p>With Dr. {doctor.name}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            min="1"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookAppointment;
