package com.dendai.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dendai.backend.dto.PostDto;
import com.dendai.backend.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(value = "SELECT p.post_id AS postId, p.title, p.description, " +
            "p.academic_year AS year, p.department, p.grade, " +
            "p.related_period AS semester, p.created_at AS createdAt, " +
            "u.username, COUNT(b.post_id) AS likesCount, p.user_id AS userId " +
            "FROM Posts p " +
            "LEFT JOIN Bookmarks b ON p.post_id = b.post_id " +
            "LEFT JOIN Users u ON p.user_id = u.user_id " +
            "GROUP BY p.post_id, u.username " +
            "ORDER BY likesCount DESC",
            countQuery = "SELECT COUNT(DISTINCT p.post_id) FROM Posts p",
            nativeQuery = true)
    Page<PostDto> findPopularPosts(Pageable pageable);

    @Query(value = "SELECT p.post_id AS postId, p.title, p.description, " +
            "p.academic_year AS year, p.department, p.grade, " +
            "p.related_period AS semester, p.created_at AS createdAt, " +
            "u.username, COUNT(b.post_id) AS likesCount, p.user_id AS userId " +
            "FROM Posts p " +
            "LEFT JOIN Bookmarks b ON p.post_id = b.post_id " +
            "LEFT JOIN Users u ON p.user_id = u.user_id " +
            "GROUP BY p.post_id, u.username " +
            "ORDER BY p.created_at DESC",
            countQuery = "SELECT COUNT(*) FROM Posts",
            nativeQuery = true)
    Page<PostDto> findAllPosts(Pageable pageable);

    @Query(value = "SELECT p.post_id AS postId, p.title, p.description, " +
            "p.academic_year AS year, p.department, p.grade, " +
            "p.related_period AS semester, p.created_at AS createdAt, " +
            "u.username, COUNT(b.post_id) AS likesCount, p.user_id AS userId " +
            "FROM Posts p " +
            "LEFT JOIN Bookmarks b ON p.post_id = b.post_id " +
            "LEFT JOIN Users u ON p.user_id = u.user_id " +
            "WHERE p.user_id = :userId " +
            "GROUP BY p.post_id, u.username " +
            "ORDER BY p.created_at DESC",
            countQuery = "SELECT COUNT(*) FROM Posts WHERE user_id = :userId",
            nativeQuery = true)
    Page<PostDto> findByUserIdOrderByCreatedAtDesc(@Param("userId") Integer userId, Pageable pageable);

    @Query(value = "SELECT p.post_id AS postId, p.title, p.description, " +
            "p.academic_year AS year, p.department, p.grade, " +
            "p.related_period AS semester, p.created_at AS createdAt, " +
            "u.username, COUNT(b.post_id) AS likesCount, p.user_id AS userId " +
            "FROM Posts p " +
            "LEFT JOIN Bookmarks b ON p.post_id = b.post_id " +
            "LEFT JOIN Users u ON p.user_id = u.user_id " +
            "WHERE (:keyword IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "    OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:year IS NULL OR p.academic_year = :year) " +
            "AND (:grade IS NULL OR p.grade = :grade) " +
            "AND (:department IS NULL OR p.department = :department) " +
            "AND (:semester IS NULL OR p.related_period = :semester) " +
            "GROUP BY p.post_id, u.username " +
            "ORDER BY likesCount DESC, createdAt DESC",
            countQuery = "SELECT COUNT(DISTINCT p.post_id) FROM Posts p " +
                    "WHERE (:keyword IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
                    "    OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
                    "AND (:year IS NULL OR p.academic_year = :year) " +
                    "AND (:grade IS NULL OR p.grade = :grade) " +
                    "AND (:department IS NULL OR p.department = :department) " +
                    "AND (:semester IS NULL OR p.related_period = :semester)",
            nativeQuery = true)
    Page<PostDto> searchPostsByKeywordAndFilters(
            @Param("keyword") String keyword,
            @Param("year") Integer year,
            @Param("grade") Integer grade,
            @Param("department") String department,
            @Param("semester") String semester,
            Pageable pageable);

    @Query(value = "SELECT p.post_id AS postId, p.title, p.description, " +
            "p.academic_year AS year, p.department, p.grade, " +
            "p.related_period AS semester, p.created_at AS createdAt, " +
            "u.username, COUNT(b.post_id) AS likesCount, p.user_id AS userId " +
            "FROM Posts p " +
            "LEFT JOIN Bookmarks b ON p.post_id = b.post_id " +
            "LEFT JOIN Users u ON p.user_id = u.user_id " +
            "WHERE p.post_id = :postId " +
            "GROUP BY p.post_id, u.username",
            nativeQuery = true)
    Optional<PostDto> findPostById(@Param("postId") Long postId);
}