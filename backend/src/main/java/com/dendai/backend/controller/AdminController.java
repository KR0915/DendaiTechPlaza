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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('admin')")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearer-jwt")
@Tag(name = "Admin", description = "管理者用API")
public class AdminController {

    private final AdminService adminService;

    @Operation(summary = "ユーザー検索", description = "クエリ文字列に基づいてユーザーを検索します")
    @GetMapping("/users/search")
    public ResponseEntity<Page<UserInfoDto>> searchUsers(
            @Parameter(description = "検索クエリ") @RequestParam String query,
            @Parameter(description = "ページネーション情報") Pageable pageable) {
        Page<UserInfoDto> users = adminService.searchUsers(query, pageable);
        return ResponseEntity.ok(users);
    }

    @Operation(summary = "ユーザーの強制削除", description = "ユーザーと関連するすべてのデータを強制的に削除します")
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> forceDeleteUser(
            @Parameter(description = "削除するユーザーのID") @PathVariable Integer userId) {
        adminService.forceDeleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "投稿の強制削除", description = "投稿を強制的に削除します")
    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<Void> forceDeletePost(
            @Parameter(description = "削除する投稿のID") @PathVariable Long postId) {
        adminService.forceDeletePost(postId);
        return ResponseEntity.noContent().build();
    }
}