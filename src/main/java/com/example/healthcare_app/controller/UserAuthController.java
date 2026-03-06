package com.example.healthcare_app.controller;

import com.example.healthcare_app.dto.*;
import com.example.healthcare_app.entity.User;
import com.example.healthcare_app.repository.UserRepository;
import com.example.healthcare_app.service.UserAuthService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserAuthController {

    private final UserAuthService userAuthService;
    private final UserRepository userRepository;


    // REGISTER USER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterRequest request) {

        String response = userAuthService.register(request);

        return ResponseEntity.ok(response);
    }


    // LOGIN USER
    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest request) {

        UserLoginResponse response = userAuthService.login(request);

        return ResponseEntity.ok(response);
    }


    // REFRESH TOKEN
    @PostMapping("/refresh")
    public ResponseEntity<UserLoginResponse> refreshToken(@RequestBody UserRefreshTokenRequest request) {

        UserLoginResponse response = userAuthService.refresh(request.getRefreshToken());

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

}