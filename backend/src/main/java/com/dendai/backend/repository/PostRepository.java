package com.dendai.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dendai.backend.dto.PopularPostDto;
import com.dendai.backend.entity.Post;

@Repository
public interface PostRepository extends CrudRepository<Post, Long> {
    @Query(value = "SELECT " +
            "p.post_id AS postId, " +
            "p.title AS title, " +
            "p.description AS description, " +
            "p.academic_year AS year, " +
            "p.department AS department, " +
            "p.grade AS grade, " +
            "p.related_period AS semester, " +
            "p.created_at AS createdAt, " +
            "u.username AS username, " +
            "COUNT(b.post_id) AS likesCount " +
            "FROM Posts p " +
            "LEFT JOIN Bookmarks b ON p.post_id = b.post_id " +
            "LEFT JOIN Users u ON p.user_id = u.user_id " +
            "GROUP BY p.post_id, u.username " +
            "ORDER BY likesCount DESC " +
            "LIMIT 10", nativeQuery = true)
    List<PopularPostDto> findTop10PopularPosts();
}
