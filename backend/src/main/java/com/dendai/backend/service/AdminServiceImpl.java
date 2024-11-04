package com.dendai.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dendai.backend.dto.UserInfoDto;
import com.dendai.backend.entity.Post;
import com.dendai.backend.entity.User;
import com.dendai.backend.repository.AdminRepository;
import com.dendai.backend.repository.BookmarkRepository;
import com.dendai.backend.repository.CommentRepository;
import com.dendai.backend.repository.PostRepository;
import com.dendai.backend.repository.ReplyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;
    private final BookmarkRepository bookmarkRepository;

    @Override
    public Page<UserInfoDto> searchUsers(String query, Pageable pageable) {
        return adminRepository.searchUsers(query, pageable);
    }

    @Override
    @Transactional
    public void forceDeleteUser(Integer userId) {
        User user = adminRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Delete all replies by the user
        replyRepository.deleteByUser(user);

        // Delete all comments by the user
        commentRepository.deleteByUser(user);

        bookmarkRepository.deleteByUser(user);

        // Delete all posts by the user
        postRepository.deleteByUser(user);

        // Delete the user
        adminRepository.delete(user);
    }

    @Override
    @Transactional
    public void forceDeletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Delete the post
        postRepository.delete(post);
    }
}