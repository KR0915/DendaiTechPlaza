package com.dendai.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dendai.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}
