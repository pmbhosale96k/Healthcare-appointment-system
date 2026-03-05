package com.example.healthcare_app.service;

import com.example.healthcare_app.dto.*;
import com.example.healthcare_app.entity.Appointment;
import com.example.healthcare_app.enums.AppointmentStatus;
import com.example.healthcare_app.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public void bookAppointment(AppointmentRequest request){

        Appointment appointment = Appointment.builder()
                .name(request.getName())
                .age(request.getAge())
                .email(request.getEmail())
                .appointmentDate(request.getAppointmentDate())
                .appointmentTime(request.getAppointmentTime())
                .status(AppointmentStatus.PENDING)
                .build();

        appointmentRepository.save(appointment);
    }

    public List<AppointmentResponse> getAppointmentsByEmail(String email){

        return appointmentRepository.findByEmail(email)
                .stream()
                .map(a -> AppointmentResponse.builder()
                        .name(a.getName())
                        .appointmentDate(a.getAppointmentDate())
                        .appointmentTime(a.getAppointmentTime())
                        .status(a.getStatus())
                        .build())
                .collect(Collectors.toList());
    }

    public void updateStatus(Long id, AppointmentStatus status){

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(status);

        appointmentRepository.save(appointment);
    }

}