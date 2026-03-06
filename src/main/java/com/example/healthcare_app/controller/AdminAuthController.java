package com.example.healthcare_app.controller;

import com.example.healthcare_app.dto.AdminLoginRequest;
import com.example.healthcare_app.service.AdminAuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AdminAuthController {

    private final AdminAuthService authService;

    public AdminAuthController(AdminAuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/admin/login")
    public String adminLogin(@RequestBody AdminLoginRequest request) {
        return authService.adminLogin(request);
    }

    @PostMapping("/doctor/login")
    public String doctorLogin(@RequestBody AdminLoginRequest request) {
        return authService.doctorLogin(request);
    }
}