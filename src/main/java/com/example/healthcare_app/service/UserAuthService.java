package com.example.healthcare_app.service;

import com.example.healthcare_app.dto.UserLoginRequest;
import com.example.healthcare_app.dto.UserLoginResponse;
import com.example.healthcare_app.dto.UserRegisterRequest;
import com.example.healthcare_app.entity.User;
import com.example.healthcare_app.entity.UserToken;
import com.example.healthcare_app.repository.UserRepository;
import com.example.healthcare_app.repository.UserTokenRepository;
import com.example.healthcare_app.security.UserJwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserAuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserTokenRepository userTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserJwtUtil jwtUtil;

    public String register(UserRegisterRequest request){

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

    public UserLoginResponse login(UserLoginRequest request){

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        String accessToken = jwtUtil.generateAccessToken(user.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        LocalDateTime accessExpiry = jwtUtil.accessExpiry();
        LocalDateTime refreshExpiry = jwtUtil.refreshExpiry();

        UserToken token = userTokenRepository.findByEmail(user.getEmail())
                .orElse(UserToken.builder().email(user.getEmail()).build());

        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        token.setAccessExpiry(accessExpiry);
        token.setRefreshExpiry(refreshExpiry);

        userTokenRepository.save(token);

        return new UserLoginResponse(accessToken, refreshToken);
    }
    public UserLoginResponse refresh(String refreshToken){

        UserToken stored = userTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid refresh token"));

        if(stored.getRefreshExpiry().isBefore(LocalDateTime.now())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token expired");
        }

        String email = stored.getEmail();

        String newAccess = jwtUtil.generateAccessToken(email);
        String newRefresh = jwtUtil.generateRefreshToken(email);

        stored.setAccessToken(newAccess);
        stored.setRefreshToken(newRefresh);
        stored.setAccessExpiry(jwtUtil.accessExpiry());
        stored.setRefreshExpiry(jwtUtil.refreshExpiry());

        userTokenRepository.save(stored);

        return new UserLoginResponse(newAccess, newRefresh);
    }
}