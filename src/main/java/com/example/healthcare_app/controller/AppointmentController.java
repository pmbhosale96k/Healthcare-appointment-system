package com.example.healthcare_app.controller;

import com.example.healthcare_app.dto.*;
import com.example.healthcare_app.enums.AppointmentStatus;
import com.example.healthcare_app.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;


    @PostMapping("/book")
    public String bookAppointment(@RequestBody AppointmentRequest request){

        appointmentService.bookAppointment(request);

        return "Appointment booked successfully";
    }


    @GetMapping("/user/{email}")
    public List<AppointmentResponse> getAppointments(@PathVariable String email){

        return appointmentService.getAppointmentsByEmail(email);
    }


    @PutMapping("/{id}/status")
    public String updateStatus(
            @PathVariable Long id,
            @RequestParam AppointmentStatus status
    ){

        appointmentService.updateStatus(id, status);

        return "Appointment status updated";
    }

}