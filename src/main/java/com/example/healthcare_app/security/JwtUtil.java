package com.example.healthcare_app.security;

import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    public String generateToken(String subject) {
        return "";
    }

    public boolean validateToken(String token) {
        return false;
    }

    public String extractUsername(String token) {
        return "";
    }
}
