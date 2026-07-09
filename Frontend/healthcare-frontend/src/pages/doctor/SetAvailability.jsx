import React, { useState } from 'react';
import { setAvailability } from '../../api/doctorApi';

const SetAvailability = () => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
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
    try {
      await setAvailability(formData);
      setSuccess('Availability set successfully!');
      setFormData({ date: '', startTime: '', endTime: '' });
    } catch {
      setError('Failed to set availability');
    }
  };

  return (
    <div className="set-availability page-shell">
      <div className="section-head">
        <p className="eyebrow">Schedule Control</p>
      </div>
      <h2>Set Availability</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Set Availability</button>
      </form>
    </div>
  );
};

export default SetAvailability;
