package com.example.healthcare_app.controller;

import com.example.healthcare_app.entity.Appointment;
import com.example.healthcare_app.entity.Doctor;
import com.example.healthcare_app.repository.DoctorRepository;
import com.example.healthcare_app.security.JwtUtil;
import com.example.healthcare_app.service.AppointmentService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

    private final AppointmentService appointmentService;
    private final DoctorRepository doctorRepository;
    private final JwtUtil jwtUtil;

    public DoctorController(AppointmentService appointmentService,
                            DoctorRepository doctorRepository,
                            JwtUtil jwtUtil) {

        this.appointmentService = appointmentService;
        this.doctorRepository = doctorRepository;
        this.jwtUtil = jwtUtil;
    }

    // Doctor Dashboard
    @GetMapping("/dashboard")
    public String doctorDashboard() {
        return "Doctor Dashboard Working";
    }

    // Doctor Appointments
    @GetMapping("/appointments")
    public List<Appointment> getAppointments() {
        return appointmentService.getAllAppointments();
    }

    // Doctor Profile
    @GetMapping("/profile")
    public Doctor getDoctorProfile(@RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        return doctorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }
}