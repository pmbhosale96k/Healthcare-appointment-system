import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctors, getDoctorById } from '../../api/doctorApi';
import DoctorCard from '../../components/DoctorCard';
import SearchBar from '../../components/SearchBar';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';

const SearchDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [bookingDoctorId, setBookingDoctorId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getDoctors();
      setDoctors(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctor) => {
    setBookingDoctorId(doctor.id);
    getDoctorById(doctor.id)
      .then((doctorDetails) => {
        navigate(`/user/book/${doctor.id}`, { state: { doctor: doctorDetails || doctor } });
      })
      .catch(() => {
        navigate(`/user/book/${doctor.id}`, { state: { doctor } });
      })
      .finally(() => {
        setBookingDoctorId(null);
      });
  };

  const specializationOptions = [
    'ALL',
    ...new Set(
      doctors
        .map((doctor) => doctor.specialization)
        .filter((specialization) => typeof specialization === 'string' && specialization.trim() !== '')
    ),
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const doctorName = (doctor.name || '').toLowerCase();
    const doctorSpecialization = doctor.specialization || '';
    const matchesName = doctorName.includes(searchQuery.toLowerCase());
    const matchesSpecialization =
      specializationFilter === 'ALL' || doctorSpecialization === specializationFilter;
    return matchesName && matchesSpecialization;
  });

  if (loading) return <Loader text="Loading doctors..." />;
  if (error) return <ErrorState message={error} onRetry={fetchDoctors} />;

  return (
    <div className="search-doctors">
      <h2>Search Doctors</h2>
      <SearchBar placeholder="Search by doctor name" onSearch={setSearchQuery} />
      <div>
        <label htmlFor="specialization-filter">Filter by specialization: </label>
        <select
          id="specialization-filter"
          value={specializationFilter}
          onChange={(e) => setSpecializationFilter(e.target.value)}
        >
          {specializationOptions.map((specialization) => (
            <option key={specialization} value={specialization}>
              {specialization === 'ALL' ? 'All Specializations' : specialization}
            </option>
          ))}
        </select>
      </div>
      <div className="doctors-list">
        {filteredDoctors.length === 0 ? (
          <EmptyState message="No doctors found for the selected filters." />
        ) : (
          filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={handleBookAppointment}
              isBooking={bookingDoctorId === doctor.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchDoctors;

