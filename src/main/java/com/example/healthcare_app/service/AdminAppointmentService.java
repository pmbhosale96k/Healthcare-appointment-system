package com.example.healthcare_app.service;

import com.example.healthcare_app.entity.DoctorAppointment;
import com.example.healthcare_app.repository.DoctorAppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminAppointmentService {

    private final DoctorAppointmentRepository appointmentRepository;

    public AdminAppointmentService(DoctorAppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<DoctorAppointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }
}