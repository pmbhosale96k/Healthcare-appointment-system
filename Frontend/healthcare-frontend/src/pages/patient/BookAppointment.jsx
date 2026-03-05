import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookAppointment } from '../../api/appointmentApi';

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const [formData, setFormData] = useState({
    doctorId: doctor?.id || '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (doctor) {
      setFormData((prev) => ({ ...prev, doctorId: doctor.id }));
    }
  }, [doctor]);

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
    try {
      await bookAppointment(formData);
      setSuccess('Appointment booked successfully!');
      setTimeout(() => navigate('/patient/my-appointments'), 2000);
    } catch (err) {
      setError('Failed to book appointment');
    }
  };

  return (
    <div className="book-appointment">
      <h2>Book Appointment</h2>
      {doctor && <p>With Dr. {doctor.name}</p>}
      <form onSubmit={handleSubmit}>
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
        <div>
          <label>Reason:</label>
          <textarea
            name="reason"
            value={formData.reason}
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