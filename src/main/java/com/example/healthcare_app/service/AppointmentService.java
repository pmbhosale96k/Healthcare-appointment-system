package com.example.healthcare_app.service;

import com.example.healthcare_app.dto.*;
import com.example.healthcare_app.entity.Appointment;
import com.example.healthcare_app.enums.AppointmentStatus;
import com.example.healthcare_app.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public void bookAppointment(UserAppointmentRequest request){

        if(request.getAppointmentTime().isBefore(LocalTime.of(10,0)) ||
           request.getAppointmentTime().isAfter(LocalTime.of(22,0))){
            throw new RuntimeException("Appointments are allowed only between 10:00 AM and 10:00 PM");
        }

        boolean exists = appointmentRepository
                .existsByAppointmentDateAndAppointmentTime(
                        request.getAppointmentDate(),
                        request.getAppointmentTime()
                );

        if(exists){
            throw new RuntimeException(
                    "Appointmet is already booked at this time. please select a time after 10 minutes."
            );
        }

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

    public List<UserAppointmentResponse> getAppointmentsByEmail(String email){

        return appointmentRepository.findByEmail(email)
                .stream()
                .map(a -> UserAppointmentResponse.builder()
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