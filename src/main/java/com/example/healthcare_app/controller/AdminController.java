package com.example.healthcare_app.controller;

import com.example.healthcare_app.entity.Doctor;
import com.example.healthcare_app.service.DoctorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final DoctorService doctorService;

    public AdminController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    // Admin dashboard
    @GetMapping("/dashboard")
    public String dashboard() {
        return "Admin Dashboard Working";
    }

    // Add doctor
    @PostMapping("/add-doctor")
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return doctorService.addDoctor(doctor);
    }

    // Get all doctors
    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    // Get doctor by id
    @GetMapping("/doctors/{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }

    // Update doctor
    @PutMapping("/doctors/{id}")
    public Doctor updateDoctor(@PathVariable Long id, @RequestBody Doctor doctor) {
        return doctorService.updateDoctor(id, doctor);
    }

    // Delete doctor
    @DeleteMapping("/doctors/{id}")
    public String deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return "Doctor deleted successfully";
    }
}