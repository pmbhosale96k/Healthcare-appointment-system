package com.example.healthcare_app.controller;

import com.example.healthcare_app.dto.AdminLoginRequest;
import com.example.healthcare_app.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
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