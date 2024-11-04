package com.dendai.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dendai.backend.entity.Reply;
import com.dendai.backend.entity.User;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    // 基本的なCRUD操作はJpaRepositoryによって提供されます
    void deleteByUser(User user);
}