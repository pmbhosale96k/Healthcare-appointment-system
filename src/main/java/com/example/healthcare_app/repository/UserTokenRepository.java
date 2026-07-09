package com.example.healthcare_app.repository;

import com.example.healthcare_app.entity.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserTokenRepository extends JpaRepository<UserToken, Long> {

    Optional<UserToken> findByEmail(String email);

    Optional<UserToken> findByRefreshToken(String refreshToken);

}