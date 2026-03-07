package com.example.healthcare_app.config;

import com.example.healthcare_app.security.UserJwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserJwtAuthenticationFilter userJwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Public auth and health endpoints
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/api/user/register", "/api/user/login", "/api/user/refresh").permitAll()
                .requestMatchers("/api/health", "/actuator/health").permitAll()
                // All other endpoints require a valid token
                .anyRequest().authenticated()
            )
            .addFilterBefore(userJwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
