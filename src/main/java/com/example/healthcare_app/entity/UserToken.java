package com.example.healthcare_app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @Column(length = 500)
    private String accessToken;

    @Column(length = 500)
    private String refreshToken;

    private LocalDateTime accessExpiry;

    private LocalDateTime refreshExpiry;

}