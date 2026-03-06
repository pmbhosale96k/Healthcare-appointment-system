package com.example.healthcare_app.controller;

import com.example.healthcare_app.dto.*;
import com.example.healthcare_app.enums.AppointmentStatus;
import com.example.healthcare_app.service.AppointmentService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    /**
     * Book appointment (email automatically taken from logged-in user)
     */
    @PostMapping("/book")
    public String bookAppointment(
            @RequestBody UserAppointmentRequest request,
            Authentication authentication
    ){

        String email = authentication.getName();

        request.setEmail(email);

        appointmentService.bookAppointment(request);

        return "Appointment booked successfully";
    }


    /**
     * Get appointments for logged-in user
     */
    @GetMapping("/my")
    public List<UserAppointmentResponse> getMyAppointments(Authentication authentication){

        String email = authentication.getName();

        return appointmentService.getAppointmentsByEmail(email);
    }


    /**
     * Doctor updates appointment status
     */
    @PutMapping("/{id}/status")
    public String updateStatus(
            @PathVariable Long id,
            @RequestParam AppointmentStatus status
    ){

        appointmentService.updateStatus(id, status);

        return "Appointment status updated";
    }

}