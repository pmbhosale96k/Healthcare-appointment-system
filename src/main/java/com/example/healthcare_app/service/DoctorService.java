package com.example.healthcare_app.service;

import com.example.healthcare_app.entity.Doctor;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {

    public List<Doctor> getAllDoctors() {
        return Collections.emptyList();
    }

    public Doctor getDoctorById(Long id) {
        return null;
    }
}
