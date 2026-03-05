package com.example.healthcare_app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendRegistrationEmail(String email,String name){

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Registration Successful");

        message.setText(
                "Hello "+name+
                        "\n\nYour registration is successful in Healthcare Appointment System."
        );

        mailSender.send(message);
    }
}