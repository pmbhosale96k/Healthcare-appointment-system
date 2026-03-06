package com.example.healthcare_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Auth & Patient/User paths
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/api/user/**").permitAll() // Srujan's path
                .requestMatchers("/patient/**").permitAll()  // Your patient path
                
                // Admin & Doctor paths
                .requestMatchers("/admin/**").permitAll()
                .requestMatchers("/doctor/**").permitAll()
                
                // Catch-all
                .anyRequest().permitAll()
            );

        return http.build();
    }
}
