package com.dendai.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dendai.backend.dto.UserInfoDto;
import com.dendai.backend.entity.User;

@Repository
public interface AdminRepository extends JpaRepository<User, Integer> {
    @Query("SELECT new com.dendai.backend.dto.UserInfoDto(u.userId, u.username, u.email) " +
            "FROM User u WHERE LOWER(u.username) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<UserInfoDto> searchUsers(@Param("query") String query, Pageable pageable);
}