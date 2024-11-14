package com.dendai.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dendai.backend.dto.ChangePasswordDto;
import com.dendai.backend.dto.PostDtoImpl;
import com.dendai.backend.dto.UserInfoDto;
import com.dendai.backend.entity.User;
import com.dendai.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Tag(name = "User", description = "ユーザー管理API")
public class UserController {

    private final UserService userService;

    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "ユーザーがブックマークした投稿を取得", description = "現在のユーザーがブックマークした投稿を取得します")
    @GetMapping("/bookmarks")
    public ResponseEntity<Page<PostDtoImpl>> getUserBookmarks(
            @Parameter(description = "ページ番号") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "ページサイズ") @RequestParam(defaultValue = "10") int size) {
        Page<PostDtoImpl> bookmarks = userService.getUserBookmarks(getCurrentUserId(), page, size);
        return ResponseEntity.ok(bookmarks);
    }

    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "ユーザー情報を取得", description = "現在のユーザーの情報を取得します")
    @GetMapping("/info")
    public ResponseEntity<UserInfoDto> getUserInfo() {
        return ResponseEntity.ok(userService.getUserInfo(getCurrentUserId()));
    }

    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "パスワードを変更", description = "現在のユーザーのパスワードを変更します")
    @PutMapping("/password")
    public ResponseEntity<Void> changePassword(
            @Valid @RequestBody ChangePasswordDto changePasswordDto) {
        userService.changePassword(getCurrentUserId(), changePasswordDto);
        return ResponseEntity.ok().build();
    }

    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "アカウントを削除", description = "現在のユーザーのアカウントを削除します")
    @DeleteMapping("/account")
    public ResponseEntity<Void> deleteAccount() {
        userService.deleteAccount(getCurrentUserId());
        return ResponseEntity.ok().build();
    }

    private Integer getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("ユーザーが認証されていません");
        }
        if (!(authentication.getPrincipal() instanceof User)) {
            throw new RuntimeException("予期しないプリンシパルタイプです");
        }
        return ((User) authentication.getPrincipal()).getUserId();
    }
}