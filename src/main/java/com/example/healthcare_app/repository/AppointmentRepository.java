package com.example.healthcare_app.repository;

import com.example.healthcare_app.entity.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByEmail(String email);

    boolean existsByAppointmentDateAndAppointmentTime(LocalDate date, LocalTime time);
    
}