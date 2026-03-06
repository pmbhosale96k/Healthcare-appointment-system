package com.example.healthcare_app.repository;

import com.example.healthcare_app.entity.DoctorAppointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorAppointmentRepository extends JpaRepository<DoctorAppointment, Long> {
    List<DoctorAppointment> findByEmail(String email);

    boolean existsByAppointmentDateAndAppointmentTime(LocalDate date, LocalTime time);
    
}