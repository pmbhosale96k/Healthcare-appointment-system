package com.example.healthcare_app.service;

import com.example.healthcare_app.entity.Appointment;
import com.example.healthcare_app.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminAppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AdminAppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }
}
