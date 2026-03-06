import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookAppointment } from '../../api/appointmentApi';
import { useAuth } from '../../context/AuthContext';

const BookAppointment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: '',
    appointmentDate: '',
    appointmentTime: '',
  });
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBooking(true);
    setError('');
    setSuccess('');
    try {
      await bookAppointment({
        ...formData,
        age: Number(formData.age),
      });
      setSuccess('Appointment booked successfully!');
      setTimeout(() => navigate('/user/appointments'), 1200);
    } catch {
      setError('Failed to book appointment');
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="book-appointment">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" min="1" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Appointment Date:</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Appointment Time:</label>
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
        <button type="submit" disabled={booking}>
          {booking ? 'Booking...' : 'Confirm Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
