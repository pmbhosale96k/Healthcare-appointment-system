import React, { useEffect, useMemo, useState } from 'react';
import { getAllDoctors, addDoctor, updateDoctor, deleteDoctor } from '../../api/adminApi';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';

const INITIAL_FORM = {
  name: '',
  email: '',
  specialization: '',
  experience: '',
  password: '',
};

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const fetchDoctors = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllDoctors();
      setDoctors(Array.isArray(data) ? data : []);
    } catch {
      setError('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    const payload = {
      name: formData.name,
      email: formData.email,
      specialization: formData.specialization,
      experience: Number(formData.experience),
      password: formData.password,
    };

    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor.id, payload);
        setSuccess('Doctor updated successfully.');
      } else {
        await addDoctor(payload);
        setSuccess('Doctor added successfully.');
      }
      setFormData(INITIAL_FORM);
      setEditingDoctor(null);
      await fetchDoctors();
    } catch {
      setError('Failed to save doctor');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name || '',
      email: doctor.email || '',
      specialization: doctor.specialization || '',
      experience: String(doctor.experience ?? ''),
      password: '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) {
      return;
    }

    setDeletingId(id);
    setError('');
    setSuccess('');
    try {
      await deleteDoctor(id);
      setSuccess('Doctor deleted successfully.');
      await fetchDoctors();
    } catch {
      setError('Failed to delete doctor');
    } finally {
      setDeletingId(null);
    }
  };

  const visibleDoctors = useMemo(() => doctors.slice(0, visibleCount), [doctors, visibleCount]);
  const hasMore = doctors.length > visibleCount;

  if (loading) return <Loader text="Loading doctors..." />;

  return (
    <div className="manage-doctors">
      <h2>Manage Doctors</h2>
      {error && <ErrorState message={error} onRetry={fetchDoctors} />}
      {success && <p className="success">{success}</p>}

      <section>
        <h3>1. Add Doctor</h3>
        <p>Admin can manually create doctor accounts.</p>
      </section>

      <section>
        <h3>2. Update Doctor</h3>
        <p>Use the Update Doctor button on any doctor card to edit details.</p>
      </section>

      <section>
        <h3>3. Get All Doctors</h3>
        <p>Doctors are listed below with pagination (5 at a time).</p>
      </section>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Specialization:</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Experience (years):</label>
          <input
            type="number"
            min="0"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : editingDoctor ? 'Update Doctor' : 'Add Doctor'}
        </button>
      </form>

      <div className="doctors-list">
        {visibleDoctors.length === 0 ? (
          <EmptyState message="No doctors found." />
        ) : (
          visibleDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <h3>{doctor.name}</h3>
              <p>Email: {doctor.email}</p>
              <p>Specialization: {doctor.specialization}</p>
              <p>Experience: {doctor.experience ?? 0} years</p>
              <button type="button" onClick={() => handleEdit(doctor)}>
                Update Doctor
              </button>
              <button
                type="button"
                onClick={() => handleDelete(doctor.id)}
                disabled={deletingId === doctor.id}
              >
                {deletingId === doctor.id ? 'Deleting...' : 'Delete Doctor'}
              </button>
            </div>
          ))
        )}
      </div>

      {hasMore && (
        <button type="button" onClick={() => setVisibleCount((prev) => prev + 5)}>
          Show More
        </button>
      )}
    </div>
  );
};

export default ManageDoctors;
