package com.dendai.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dendai.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findOneByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}