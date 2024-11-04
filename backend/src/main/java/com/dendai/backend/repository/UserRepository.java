package com.dendai.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dendai.backend.dto.PostDtoImpl;
import com.dendai.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    @Query("SELECT new com.dendai.backend.dto.PostDtoImpl(p.postId, p.title, p.description, p.academicYear, " +
            "d.departmentId, d.name, p.grade, p.relatedPeriod, p.createdAt, p.updatedAt, " +
            "u.username, (SELECT COUNT(b) FROM Bookmark b WHERE b.post.postId = p.postId), u.userId) " +
            "FROM Post p " +
            "JOIN p.user u " +
            "JOIN p.department d " +
            "JOIN Bookmark bm ON bm.post = p " +
            "WHERE bm.user.userId = :userId")
    Page<PostDtoImpl> findUserBookmarks(@Param("userId") Integer userId, Pageable pageable);
}