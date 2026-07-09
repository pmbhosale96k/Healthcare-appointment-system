package com.example.healthcare_app.repository;

import com.example.healthcare_app.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Get appointments for a specific patient
    List<Appointment> findByEmail(String email);

    // Get appointments for a specific doctor
    List<Appointment> findByDoctorId(Long doctorId);

    // Prevent duplicate bookings for same slot
    boolean existsByDoctorIdAndAppointmentDateAndAppointmentTime(Long doctorId, LocalDate appointmentDate, LocalTime appointmentTime);
}
