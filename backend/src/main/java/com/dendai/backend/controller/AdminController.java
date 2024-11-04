package com.dendai.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dendai.backend.dto.UserInfoDto;
import com.dendai.backend.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('admin')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users/search")
    public ResponseEntity<Page<UserInfoDto>> searchUsers(@RequestParam String query, Pageable pageable) {
        Page<UserInfoDto> users = adminService.searchUsers(query, pageable);
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> forceDeleteUser(@PathVariable Integer userId) {
        adminService.forceDeleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<Void> forceDeletePost(@PathVariable Long postId) {
        adminService.forceDeletePost(postId);
        return ResponseEntity.noContent().build();
    }


}