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
public class UserJwtUtil {

    // Must be at least 32 characters
    private static final String SECRET =
            "healthcare-secret-key-healthcare-secret-key";

    private static final long ACCESS_EXPIRATION = 1000 * 60 * 15; // 15 minutes
    private static final long REFRESH_EXPIRATION = 1000 * 60 * 60 * 24 * 30; // 30 days

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));


    // Generate Access Token
    public String generateAccessToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION))
                .signWith(key)
                .compact();
    }


    // Generate Refresh Token
    public String generateRefreshToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION))
                .signWith(key)
                .compact();
    }


    // Extract Email from Token
    public String extractEmail(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }


    // Check if token expired
    public boolean isTokenExpired(String token) {

        Date expiration = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();

        return expiration.before(new Date());
    }


    // Access Token Expiry (for DB)
    public LocalDateTime accessExpiry() {
        return LocalDateTime.now().plusMinutes(15);
    }


    // Refresh Token Expiry (for DB)
    public LocalDateTime refreshExpiry() {
        return LocalDateTime.now().plusDays(30);
    }
}