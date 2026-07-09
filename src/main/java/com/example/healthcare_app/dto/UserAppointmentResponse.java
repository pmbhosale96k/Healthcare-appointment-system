package com.example.healthcare_app.dto;

import com.example.healthcare_app.enums.AppointmentStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class UserAppointmentResponse {

    private Long id;

    private String name;

    private LocalDate appointmentDate;

    private LocalTime appointmentTime;

    private AppointmentStatus status;

}
