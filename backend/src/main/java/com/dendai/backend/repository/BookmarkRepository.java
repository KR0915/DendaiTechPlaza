package com.dendai.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dendai.backend.entity.Bookmark;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Optional<Bookmark> findByPostIdAndUserId(Long postId, Integer userId);
    void deleteByPostIdAndUserId(Long postId, Integer userId);
}