import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctors } from '../../api/doctorApi';
import DoctorCard from '../../components/DoctorCard';

const SearchDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (err) {
      setError('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctor) => {
    navigate('/patient/book-appointment', { state: { doctor } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="search-doctors">
      <h2>Search Doctors</h2>
      <div className="doctors-list">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onBookAppointment={handleBookAppointment}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchDoctors;