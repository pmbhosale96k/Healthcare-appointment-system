import React, { useEffect, useMemo, useState } from 'react';
import { deleteAvailabilitySlot, getMyAvailability, setAvailability } from '../../api/doctorApi';
import Loader from '../../components/Loader';

const SetAvailability = () => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
  });
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAvailability();
  }, []);

  const normalizeSlots = (data) => {
    if (Array.isArray(data)) {
      return data;
    }
    if (Array.isArray(data?.slots)) {
      return data.slots;
    }
    return [];
  };

  const fetchAvailability = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getMyAvailability();
      setSlots(normalizeSlots(data));
    } catch (err) {
      setError('Failed to load availability');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await setAvailability(formData);
      setSuccess('Availability set successfully!');
      setFormData({ date: '', startTime: '', endTime: '' });
      await fetchAvailability();
    } catch (err) {
      setError('Failed to set availability');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSlot = async (id) => {
    const confirmed = window.confirm('Delete this availability slot?');
    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setError('');
    setSuccess('');
    try {
      await deleteAvailabilitySlot(id);
      setSuccess('Availability slot removed.');
      await fetchAvailability();
    } catch (err) {
      setError('Failed to remove availability slot');
    } finally {
      setDeletingId(null);
    }
  };

  const sortedSlots = useMemo(() => {
    return [...slots].sort((a, b) => {
      const aDate = `${a?.date || ''}T${a?.startTime || '00:00'}`;
      const bDate = `${b?.date || ''}T${b?.startTime || '00:00'}`;
      return new Date(aDate).getTime() - new Date(bDate).getTime();
    });
  }, [slots]);

  return (
    <div className="set-availability">
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
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Add Availability Slot'}
        </button>
      </form>

      <section>
        <h3>My Availability Slots</h3>
        {loading ? (
          <Loader text="Loading availability..." />
        ) : sortedSlots.length === 0 ? (
          <p>No availability slots added yet.</p>
        ) : (
          <ul>
            {sortedSlots.map((slot, index) => {
              const slotId = slot.id ?? slot.availabilityId ?? `${slot.date}-${slot.startTime}-${index}`;
              return (
                <li key={slotId}>
                  {slot.date} | {slot.startTime} - {slot.endTime}
                  {slot.id || slot.availabilityId ? (
                    <button
                      type="button"
                      onClick={() => handleDeleteSlot(slot.id ?? slot.availabilityId)}
                      disabled={deletingId === (slot.id ?? slot.availabilityId)}
                    >
                      {deletingId === (slot.id ?? slot.availabilityId) ? 'Removing...' : 'Remove'}
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default SetAvailability;
