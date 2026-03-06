package com.example.healthcare_app.service;

import com.example.healthcare_app.entity.Doctor;
import com.example.healthcare_app.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public Doctor addDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public Doctor updateDoctor(Long id, Doctor doctor) {

        Doctor existing = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        existing.setName(doctor.getName());
        existing.setEmail(doctor.getEmail());
        existing.setSpecialization(doctor.getSpecialization());
        existing.setExperience(doctor.getExperience());

        return doctorRepository.save(existing);
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}