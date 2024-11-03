package com.dendai.backend.service;

import java.util.List;

import com.dendai.backend.dto.UserRegistrationDto;
import com.dendai.backend.entity.User;

public interface UserService {
    /**
     * ユーザー全件取得
     *
     * @return List<User>
     */
    List<User> findAll();

    /**
     * ユーザー登録
     *
     * @param registrationDto ユーザー登録情報
     * @return 登録されたユーザー
     */
    User registerUser(UserRegistrationDto registrationDto);
}