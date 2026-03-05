package com.example.healthcare_app.controller;

import com.example.healthcare_app.dto.LoginRequest;
import com.example.healthcare_app.dto.LoginResponse;
import com.example.healthcare_app.dto.RefreshTokenRequest;
import com.example.healthcare_app.dto.RegisterRequest;
import com.example.healthcare_app.entity.User;
import com.example.healthcare_app.repository.UserRepository;

import com.example.healthcare_app.security.JwtUtil;
import com.example.healthcare_app.service.UserAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserAuthController {

    @Autowired
    private UserAuthService userAuthService;

    @Autowired
    private UserRepository userRepository;


    // REGISTER USER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        String response = userAuthService.register(request);
        return ResponseEntity.ok(response);
    }


    // LOGIN USER
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String response = String.valueOf(userAuthService.login(request));
        return ResponseEntity.ok(response);
    }


    // GET USER BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {

        Optional<User> user = userRepository.findById(id);

        if(user.isPresent()){
            return ResponseEntity.ok(user.get());
        }

        return ResponseEntity.status(404).body("User not found");
    }


    // GET ALL USERS
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){

        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }


    // DELETE USER
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){

        if(!userRepository.existsById(id)){
            return ResponseEntity.status(404).body("User not found");
        }

        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PostMapping("/refresh")
    public LoginResponse refreshToken(@RequestBody RefreshTokenRequest request){

        String email = JwtUtil.extractEmail(request.getRefreshToken());

        String newAccessToken = JwtUtil.generateAccessToken(email);

        return new LoginResponse(newAccessToken, request.getRefreshToken());
    }

}