package com.dendai.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dendai.backend.dto.UserInfoDto;

public interface AdminService {
    Page<UserInfoDto> searchUsers(String query, Pageable pageable);
    void forceDeleteUser(Integer userId);
    void forceDeletePost(Long postId);
}