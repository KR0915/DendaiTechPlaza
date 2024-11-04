package com.dendai.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dendai.backend.dto.UserRegistrationDto;
import com.dendai.backend.entity.User;
import com.dendai.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${registration.common.password.student}")
    private String studentCommonPassword;

    @Value("${registration.common.password.admin}")
    private String adminCommonPassword;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User registerUser(UserRegistrationDto registrationDto) {
        if (userRepository.findByUsername(registrationDto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.findByEmail(registrationDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Validate email domain
        if (!registrationDto.getEmail().endsWith("@ms.dendai.ac.jp")) {
            throw new RuntimeException("Email must be from @ms.dendai.ac.jp domain");
        }

        // 共通パスワードの検証
        if (!isValidCommonPassword(registrationDto.getRole(), registrationDto.getCommonPassword())) {
            throw new RuntimeException("Invalid common password for the specified role");
        }

        User newUser = new User();
        newUser.setUsername(registrationDto.getUsername());
        newUser.setEmail(registrationDto.getEmail());
        newUser.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        newUser.setRole(registrationDto.getRole());
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(newUser);
    }

    private boolean isValidCommonPassword(String role, String commonPassword) {
        switch (role) {
            case "student":
                return studentCommonPassword.equals(commonPassword);
            case "admin":
                return adminCommonPassword.equals(commonPassword);
            default:
                return false;
        }
    }
}