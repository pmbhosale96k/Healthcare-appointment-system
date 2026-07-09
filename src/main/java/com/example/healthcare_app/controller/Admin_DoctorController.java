package com.example.healthcare_app.controller;

import com.example.healthcare_app.entity.Appointment;
import com.example.healthcare_app.entity.Doctor;
import com.example.healthcare_app.repository.DoctorRepository;
import com.example.healthcare_app.security.JwtUtil;
import com.example.healthcare_app.service.AdminAppointmentService;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class Admin_DoctorController {

    private final AdminAppointmentService appointmentService;
    private final DoctorRepository doctorRepository;
    private final JwtUtil jwtUtil;

    public Admin_DoctorController(AdminAppointmentService appointmentService,
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
    public List<Appointment> getAppointments(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            Authentication authentication
    ) {
        String email = null;

        if (authentication != null && authentication.getName() != null && !authentication.getName().isBlank()) {
            email = authentication.getName();
        } else if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            email = jwtUtil.extractEmail(token);
        }

        if (email == null || email.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Doctor authentication required");
        }

        Doctor doctor = doctorRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor not found"));

        return appointmentService.getAppointmentsByDoctorId(doctor.getId());
    }

    // Doctor Profile
    @GetMapping("/profile")
    public Doctor getDoctorProfile(@RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        return doctorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }
}
