package com.example.healthcare_app.service;

import com.example.healthcare_app.dto.LoginRequest;
import com.example.healthcare_app.dto.LoginResponse;
import com.example.healthcare_app.dto.RegisterRequest;
import com.example.healthcare_app.entity.User;
import com.example.healthcare_app.repository.UserRepository;
import com.example.healthcare_app.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserAuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(RegisterRequest request){

        Optional<User> existing = userRepository.findByEmail(request.getEmail());

        if(existing.isPresent()){
            return "Email already exists";
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getName(),
                request.getEmail(),
                encodedPassword
        );

        userRepository.save(user);

        emailService.sendRegistrationEmail(user.getEmail(),user.getName());

        return "User Registered Successfully";
    }

    public LoginResponse login(LoginRequest request){

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        String accessToken = jwtUtil.generateAccessToken(user.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        return new LoginResponse(accessToken, refreshToken);
    }

}