package com.dendai.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dendai.backend.entity.Bookmark;
import com.dendai.backend.entity.User;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Optional<Bookmark> findByPost_PostIdAndUser_UserId(Long postId, Integer userId);

    void deleteByPost_PostIdAndUser_UserId(Long postId, Integer userId);

    void deleteByUser(User user);

    @Query("SELECT b.post.postId FROM Bookmark b WHERE b.user.userId = :userId AND b.post.postId IN :postIds")
    List<Long> findBookmarkedPostIds(Integer userId, List<Long> postIds);
}