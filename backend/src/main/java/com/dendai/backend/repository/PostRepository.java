package com.dendai.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dendai.backend.dto.CommentDto;
import com.dendai.backend.dto.PostDto;
import com.dendai.backend.dto.ReplyDto;
import com.dendai.backend.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

        @Query(value = "SELECT p.post_id AS postId, p.title, p.description, " +
                        "p.academic_year AS year, d.department_id AS departmentId, d.name AS departmentName, p.grade, "
                        +
                        "p.related_period AS semester, p.created_at AS createdAt, p.updated_at AS updatedAt, " +
                        "u.username, COUNT(DISTINCT b.bookmark_id) AS likesCount, p.user_id AS userId, " +
                        "array_agg(DISTINCT s.link) AS sharedUrls " +
                        "FROM posts p " +
                        "LEFT JOIN bookmarks b ON p.post_id = b.post_id " +
                        "LEFT JOIN users u ON p.user_id = u.user_id " +
                        "LEFT JOIN departments d ON p.department_id = d.department_id " +
                        "LEFT JOIN shared_urls s ON p.post_id = s.post_id " +
                        "GROUP BY p.post_id, p.title, p.description, p.academic_year, d.department_id, d.name, p.grade, "
                        +
                        "p.related_period, p.created_at, p.updated_at, u.username, p.user_id " +
                        "ORDER BY likesCount DESC", countQuery = "SELECT COUNT(DISTINCT p.post_id) FROM posts p", nativeQuery = true)
        Page<PostDto> findPopularPosts(Pageable pageable);

        @Query(value = "SELECT p.post_id AS postId, p.title, p.description, " +
                        "p.academic_year AS year, d.department_id AS departmentId, d.name AS departmentName, p.grade, "
                        +
                        "p.related_period AS semester, p.created_at AS createdAt, p.updated_at AS updatedAt, " +
                        "u.username, COUNT(DISTINCT b.bookmark_id) AS likesCount, p.user_id AS userId, " +
                        "array_agg(DISTINCT s.link) AS sharedUrls " +
                        "FROM posts p " +
                        "LEFT JOIN bookmarks b ON p.post_id = b.post_id " +
                        "LEFT JOIN users u ON p.user_id = u.user_id " +
                        "LEFT JOIN departments d ON p.department_id = d.department_id " +
                        "LEFT JOIN shared_urls s ON p.post_id = s.post_id " +
                        "GROUP BY p.post_id, p.title, p.description, p.academic_year, d.department_id, d.name, p.grade, "
                        +
                        "p.related_period, p.created_at, p.updated_at, u.username, p.user_id " +
                        "ORDER BY p.created_at DESC", countQuery = "SELECT COUNT(*) FROM posts", nativeQuery = true)
        Page<PostDto> findAllPosts(Pageable pageable);

        @Query(value = "SELECT p.post_id AS postId, p.title, p.description, " +
                        "p.academic_year AS year, d.department_id AS departmentId, d.name AS departmentName, p.grade, "
                        +
                        "p.related_period AS semester, p.created_at AS createdAt, p.updated_at AS updatedAt, " +
                        "u.username, COUNT(DISTINCT b.bookmark_id) AS likesCount, p.user_id AS userId, " +
                        "array_agg(DISTINCT s.link) AS sharedUrls " +
                        "FROM posts p " +
                        "LEFT JOIN bookmarks b ON p.post_id = b.post_id " +
                        "LEFT JOIN users u ON p.user_id = u.user_id " +
                        "LEFT JOIN departments d ON p.department_id = d.department_id " +
                        "LEFT JOIN shared_urls s ON p.post_id = s.post_id " +
                        "WHERE p.user_id = :userId " +
                        "GROUP BY p.post_id, p.title, p.description, p.academic_year, d.department_id, d.name, p.grade, "
                        +
                        "p.related_period, p.created_at, p.updated_at, u.username, p.user_id " +
                        "ORDER BY p.created_at DESC", countQuery = "SELECT COUNT(*) FROM posts WHERE user_id = :userId", nativeQuery = true)
        Page<PostDto> findByUserIdOrderByCreatedAtDesc(@Param("userId") Integer userId, Pageable pageable);

        @Query(value = "SELECT p.post_id AS postId, p.title, p.description, " +
                        "p.academic_year AS year, d.department_id AS departmentId, d.name AS departmentName, p.grade, "
                        +
                        "p.related_period AS semester, p.created_at AS createdAt, p.updated_at AS updatedAt, " +
                        "u.username, COUNT(DISTINCT b.bookmark_id) AS likesCount, p.user_id AS userId, " +
                        "array_agg(DISTINCT s.link) AS sharedUrls " +
                        "FROM posts p " +
                        "LEFT JOIN bookmarks b ON p.post_id = b.post_id " +
                        "LEFT JOIN users u ON p.user_id = u.user_id " +
                        "LEFT JOIN departments d ON p.department_id = d.department_id " +
                        "LEFT JOIN shared_urls s ON p.post_id = s.post_id " +
                        "WHERE (:keyword IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
                        "    OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
                        "AND (:year IS NULL OR p.academic_year = :year) " +
                        "AND (:grade IS NULL OR p.grade = :grade) " +
                        "AND (:department IS NULL OR d.name = :department) " +
                        "AND (:semester IS NULL OR p.related_period = :semester) " +
                        "GROUP BY p.post_id, p.title, p.description, p.academic_year, d.department_id, d.name, p.grade, "
                        +
                        "p.related_period, p.created_at, p.updated_at, u.username, p.user_id " +
                        "ORDER BY likesCount DESC, p.created_at DESC", countQuery = "SELECT COUNT(DISTINCT p.post_id) FROM posts p "
                                        +
                                        "LEFT JOIN departments d ON p.department_id = d.department_id " +
                                        "WHERE (:keyword IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) "
                                        +
                                        "    OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
                                        "AND (:year IS NULL OR p.academic_year = :year) " +
                                        "AND (:grade IS NULL OR p.grade = :grade) " +
                                        "AND (:department IS NULL OR d.name = :department) " +
                                        "AND (:semester IS NULL OR p.related_period = :semester)", nativeQuery = true)
        Page<PostDto> searchPostsByKeywordAndFilters(
                        @Param("keyword") String keyword,
                        @Param("year") Integer year,
                        @Param("grade") Integer grade,
                        @Param("department") String department,
                        @Param("semester") String semester,
                        Pageable pageable);

        @Query(value = "SELECT p.post_id AS postId, p.title, p.description, " +
                        "p.academic_year AS year, d.department_id AS departmentId, d.name AS departmentName, p.grade, "
                        +
                        "p.related_period AS semester, p.created_at AS createdAt, p.updated_at AS updatedAt, " +
                        "u.username, COUNT(DISTINCT b.bookmark_id) AS likesCount, p.user_id AS userId, " +
                        "array_agg(DISTINCT s.link) AS sharedUrls " +
                        "FROM posts p " +
                        "LEFT JOIN bookmarks b ON p.post_id = b.post_id " +
                        "LEFT JOIN users u ON p.user_id = u.user_id " +
                        "LEFT JOIN departments d ON p.department_id = d.department_id " +
                        "LEFT JOIN shared_urls s ON p.post_id = s.post_id " +
                        "WHERE p.post_id = :postId " +
                        "GROUP BY p.post_id, p.title, p.description, p.academic_year, d.department_id, d.name, p.grade, "
                        +
                        "p.related_period, p.created_at, p.updated_at, u.username, p.user_id", nativeQuery = true)
        PostDto findPostById(@Param("postId") Long postId);

        @Query(value = "SELECT c.comment_id AS commentId, c.content, c.created_at AS createdAt, " +
                        "u.username, c.user_id AS userId " +
                        "FROM comments c " +
                        "JOIN users u ON c.user_id = u.user_id " +
                        "WHERE c.post_id = :postId " +
                        "ORDER BY c.created_at ASC", countQuery = "SELECT COUNT(*) FROM comments WHERE post_id = :postId", nativeQuery = true)
        Page<CommentDto> findCommentsByPostId(@Param("postId") Long postId, Pageable pageable);

        @Query(value = "SELECT r.reply_id AS replyId, r.content, r.created_at AS createdAt, " +
                        "u.username, r.user_id AS userId, r.parent_comment_id AS commentId " +
                        "FROM replies r " +
                        "JOIN users u ON r.user_id = u.user_id " +
                        "WHERE r.parent_comment_id IN " +
                        "(SELECT comment_id FROM comments WHERE post_id = :postId) " +
                        "ORDER BY r.created_at ASC", countQuery = "SELECT COUNT(*) FROM replies r " +
                                        "WHERE r.parent_comment_id IN (SELECT comment_id FROM comments WHERE post_id = :postId)", nativeQuery = true)
        Page<ReplyDto> findRepliesByPostId(@Param("postId") Long postId, Pageable pageable);
}