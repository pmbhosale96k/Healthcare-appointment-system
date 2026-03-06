package com.example.healthcare_app.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class AdminJwtUtil {

    // must be at least 256 bits (32+ chars)
    private static final String SECRET =
            "mysecurejwtsecretkeymysecurejwtsecretkey123456";

    private SecretKey getSignKey() {
        byte[] keyBytes = SECRET.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // 🔑 GENERATE TOKEN
    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(getSignKey())
                .compact();
    }

    // 🔎 EXTRACT USERNAME FROM TOKEN
    public String extractUsername(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

    // ✔️ TOKEN VALIDATION
    public boolean validateToken(String token, String email) {

        String extractedUsername = extractUsername(token);
        return extractedUsername.equals(email);
    }
}