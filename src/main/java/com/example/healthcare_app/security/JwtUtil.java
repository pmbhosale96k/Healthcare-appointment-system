package com.example.healthcare_app.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Date;

@Component
public class JwtUtil {

    // 1. Single source of truth for the Secret Key
    private static final String SECRET = "my-very-long-secure-healthcare-app-secret-key-12345";
    
    // Expiration Constants
    private static final long ACCESS_EXPIRATION = 1000 * 60 * 60 * 10; // 10 Hours (Matches your Admin setting)
    private static final long REFRESH_EXPIRATION = 1000 * 60 * 60 * 24 * 30; // 30 Days

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    // --- TOKEN GENERATION ---

    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION))
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION))
                .signWith(key)
                .compact();
    }

    // --- EXTRACTION & VALIDATION ---

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    public boolean validateToken(String token, String email) {
        final String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(email) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    // --- DB HELPERS ---

    public LocalDateTime accessExpiry() {
        return LocalDateTime.now().plusHours(10);
    }

    public LocalDateTime refreshExpiry() {
        return LocalDateTime.now().plusDays(30);
    }
}