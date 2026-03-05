package com.example.healthcare_app.service;

import com.example.healthcare_app.dto.AppointmentRequestDto;
import com.example.healthcare_app.entity.Appointment;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    public Appointment createAppointment(AppointmentRequestDto request) {
        return null;
    }

    public List<Appointment> getAllAppointments() {
        return Collections.emptyList();
    }

    public void cancelAppointment(Long id) {
    }
}
