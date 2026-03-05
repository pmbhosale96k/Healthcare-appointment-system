package com.example.healthcare_app.repository;

import com.example.healthcare_app.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByEmail(String email);

}
