package com.example.healthcare_app.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Date;

@Component
public class JwtUtil {

    // MUST be at least 32 characters
    private static final String SECRET =
            "healthcare-secret-key-healthcare-secret-key";

    private static final long ACCESS_EXPIRATION = 1000 * 60 * 15; // 15 min
    private static final long REFRESH_EXPIRATION = 1000 * 60 * 60 * 24; // 24 hours

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));



    // Generate Access Token
    public String generateAccessToken(String email){

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }



    // Generate Refresh Token
    public String generateRefreshToken(String email){

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }



    // Extract Email
    public String extractEmail(String token){

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }



    // Access Token Expiry Time (for DB)
    public LocalDateTime accessExpiry(){
        return LocalDateTime.now().plusMinutes(15);
    }



    // Refresh Token Expiry Time (for DB)
    public LocalDateTime refreshExpiry(){
        return LocalDateTime.now().plusDays(1);
    }

}