package com.example.healthcare_app.controller;

import com.example.healthcare_app.entity.DoctorAppointment;
import com.example.healthcare_app.entity.Doctor;
import com.example.healthcare_app.repository.DoctorRepository;
import com.example.healthcare_app.security.AdminJwtUtil;
import com.example.healthcare_app.service.AdminAppointmentService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class Admin_DoctorController {

    private final AdminAppointmentService appointmentService;
    private final DoctorRepository doctorRepository;
    private final AdminJwtUtil jwtUtil;

    public Admin_DoctorController(AdminAppointmentService appointmentService,
                            DoctorRepository doctorRepository,
                            AdminJwtUtil jwtUtil) {

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
    public List<DoctorAppointment> getAppointments() {
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