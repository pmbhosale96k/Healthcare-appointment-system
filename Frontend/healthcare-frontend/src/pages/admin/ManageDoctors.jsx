import React, { useState, useEffect } from 'react';
import { getAllDoctors, addDoctor, updateDoctor, deleteDoctor } from '../../api/adminApi';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    hospitalId: '',
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await getAllDoctors();
      setDoctors(data);
    } catch (err) {
      setError('Failed to load doctors');
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
    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor.id, formData);
      } else {
        await addDoctor(formData);
      }
      fetchDoctors();
      setShowForm(false);
      setEditingDoctor(null);
      setFormData({ name: '', email: '', specialization: '', hospitalId: '' });
    } catch (err) {
      setError('Failed to save doctor');
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      specialization: doctor.specialization,
      hospitalId: doctor.hospital?.id || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await deleteDoctor(id);
        fetchDoctors();
      } catch (err) {
        setError('Failed to delete doctor');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="manage-doctors">
      <h2>Manage Doctors</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Doctor'}
      </button>
      {showForm && (
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
            <label>Hospital ID:</label>
            <input
              type="text"
              name="hospitalId"
              value={formData.hospitalId}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">{editingDoctor ? 'Update' : 'Add'} Doctor</button>
        </form>
      )}
      <div className="doctors-list">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-item">
            <h3>{doctor.name}</h3>
            <p>Email: {doctor.email}</p>
            <p>Specialization: {doctor.specialization}</p>
            <button onClick={() => handleEdit(doctor)}>Edit</button>
            <button onClick={() => handleDelete(doctor.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDoctors;