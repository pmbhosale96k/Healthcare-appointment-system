package com.example.healthcare_app.service;

import com.example.healthcare_app.dto.AdminLoginRequest;
import com.example.healthcare_app.entity.Admin;
import com.example.healthcare_app.entity.Doctor;
import com.example.healthcare_app.repository.AdminRepository;
import com.example.healthcare_app.repository.DoctorRepository;
import com.example.healthcare_app.security.AdminJwtUtil;
import org.springframework.stereotype.Service;

@Service
public class AdminAuthService {

    private final AdminRepository adminRepository;
    private final DoctorRepository doctorRepository;
    private final AdminJwtUtil jwtUtil;

    public AdminAuthService(AdminRepository adminRepository,
                       DoctorRepository doctorRepository,
                       AdminJwtUtil jwtUtil) {

        this.adminRepository = adminRepository;
        this.doctorRepository = doctorRepository;
        this.jwtUtil = jwtUtil;
    }

    public String adminLogin(AdminLoginRequest request) {

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!admin.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(admin.getEmail());
    }

    public String doctorLogin(AdminLoginRequest request) {

        Doctor doctor = doctorRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        if (!doctor.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(doctor.getEmail());
    }
}