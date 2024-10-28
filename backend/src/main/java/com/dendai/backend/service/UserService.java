package com.dendai.backend.service;

import java.util.List;

import com.dendai.backend.entity.User;

public interface UserService {
    /**
     * ユーザー全件取得
     *
     * @return List<User>
     */
    List<User> findAll();
}