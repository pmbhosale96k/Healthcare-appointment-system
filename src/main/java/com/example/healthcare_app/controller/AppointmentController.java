package com.example.healthcare_app.controller;
import com.example.healthcare_app.dto.*;
import com.example.healthcare_app.enums.AppointmentStatus;
import com.example.healthcare_app.entity.Appointment;
import com.example.healthcare_app.service.AppointmentService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import org.springframework.http.HttpStatus;

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

        if (authentication != null && authentication.getName() != null && !authentication.getName().isBlank()) {
            request.setEmail(authentication.getName());
        }

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
        }

        appointmentService.bookAppointment(request);

        return "Appointment booked successfully";
    }


    /**
     * Get appointments for logged-in user
     */
    @GetMapping("/my")
    public List<UserAppointmentResponse> getMyAppointments(
            @RequestParam(required = false) String email,
            Authentication authentication
    ){

        String resolvedEmail = (authentication != null && authentication.getName() != null && !authentication.getName().isBlank())
                ? authentication.getName()
                : email;

        if (resolvedEmail == null || resolvedEmail.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
        }

        return appointmentService.getAppointmentsByEmail(resolvedEmail);
    }

    @GetMapping("/all")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
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

    @PutMapping("/{id}/cancel")
    public String cancelAppointment(@PathVariable Long id) {
        appointmentService.updateStatus(id, AppointmentStatus.REJECTED);
        return "Appointment cancelled";
    }

}
