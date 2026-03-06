package com.example.healthcare_app.service;

import com.example.healthcare_app.dto.LoginRequest;
import com.example.healthcare_app.entity.Admin;
import com.example.healthcare_app.entity.Doctor;
import com.example.healthcare_app.repository.AdminRepository;
import com.example.healthcare_app.repository.DoctorRepository;
import com.example.healthcare_app.security.JwtUtil;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminRepository adminRepository;
    private final DoctorRepository doctorRepository;
    private final JwtUtil jwtUtil;

    public AuthService(AdminRepository adminRepository,
                       DoctorRepository doctorRepository,
                       JwtUtil jwtUtil) {

        this.adminRepository = adminRepository;
        this.doctorRepository = doctorRepository;
        this.jwtUtil = jwtUtil;
    }

    // ADMIN LOGIN
    public String adminLogin(LoginRequest request) {

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!admin.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid admin password");
        }

        return jwtUtil.generateToken(admin.getEmail());
    }


    // DOCTOR LOGIN
    public String doctorLogin(LoginRequest request) {

        Doctor doctor = doctorRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        if (!doctor.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid doctor password");
        }

        return jwtUtil.generateToken(doctor.getEmail());
    }
}