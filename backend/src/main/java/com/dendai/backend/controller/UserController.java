package com.dendai.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dendai.backend.dto.ChangePasswordDto;
import com.dendai.backend.dto.PostDtoImpl;
import com.dendai.backend.dto.UserInfoDto;
import com.dendai.backend.entity.User;
import com.dendai.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/bookmarks")
    public ResponseEntity<Page<PostDtoImpl>> getUserBookmarks(Pageable pageable) {
        Page<PostDtoImpl> bookmarks = userService.getUserBookmarks(getCurrentUserId(), pageable);
        return ResponseEntity.ok(bookmarks);
    }

    @GetMapping("/info")
    public ResponseEntity<UserInfoDto> getUserInfo() {
        return ResponseEntity.ok(userService.getUserInfo(getCurrentUserId()));
    }

    @PutMapping("/password")
    public ResponseEntity<Void> changePassword(
            @Valid @RequestBody ChangePasswordDto changePasswordDto) {
        userService.changePassword(getCurrentUserId(), changePasswordDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/account")
    public ResponseEntity<Void> deleteAccount() {
        userService.deleteAccount(getCurrentUserId());
        return ResponseEntity.ok().build();
    }

    private Integer getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }
        if (!(authentication.getPrincipal() instanceof User)) {
            throw new RuntimeException("Unexpected principal type");
        }
        return ((User) authentication.getPrincipal()).getUserId();
    }
}