package com.dendai.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dendai.backend.dto.UserRegistrationDto;
import com.dendai.backend.entity.User;
import com.dendai.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")//重要！
public class UserController {
    private final UserService userService;

    @GetMapping
    public List<User> getUsers() {
        return userService.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationDto registrationDto) {
        User registeredUser = userService.registerUser(registrationDto);
        return ResponseEntity.ok(registeredUser);
    }
}