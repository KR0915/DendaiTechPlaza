package com.dendai.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.dendai.backend.dto.ChangePasswordDto;
import com.dendai.backend.dto.PostDtoImpl;
import com.dendai.backend.dto.UserInfoDto;
import com.dendai.backend.dto.UserRegistrationDto;
import com.dendai.backend.entity.User;

public interface UserService {
    List<User> findAll();
    User registerUser(UserRegistrationDto registrationDto);
    UserInfoDto getUserInfo(Integer userId);
    UserInfoDto updateUserInfo(Integer userId, UserInfoDto userInfoDto);
    void changePassword(Integer userId, ChangePasswordDto changePasswordDto);
    void deleteAccount(Integer userId);
    Page<PostDtoImpl> getUserBookmarks(Integer userId, int page, int size);
    List<Boolean> checkUserBookmarks(Integer userId, List<Long> postIds);
}