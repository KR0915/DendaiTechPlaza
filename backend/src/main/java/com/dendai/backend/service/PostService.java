package com.dendai.backend.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dendai.backend.dto.PostDto;
import com.dendai.backend.dto.PostSubmissionDto;
import com.dendai.backend.entity.Post;
import com.dendai.backend.repository.PostRepository;

@Service
public class PostService {
    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Page<PostDto> getPopularPosts(Pageable pageable) {
        return postRepository.findPopularPosts(pageable);
    }

    public Page<PostDto> getRecentPosts(Pageable pageable) {
        return postRepository.findAllPosts(pageable);
    }

    public Page<PostDto> getRecentPostsByUser(Integer userId, Pageable pageable) {
        return postRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
    }

    public Page<PostDto> searchPosts(String keyword, Integer year, Integer grade, String department, String semester,
            Pageable pageable) {
        return postRepository.searchPostsByKeywordAndFilters(keyword, year, grade, department, semester, pageable);
    }

    public Optional<PostDto> getPostById(Long postId) {
        return postRepository.findPostById(postId);
    }

    public long getPostCount() {
        return postRepository.count();
    }

    @Transactional
    public Post createPost(PostSubmissionDto submissionDto, Integer userId) {
        Post newPost = new Post();
        newPost.setUserId(userId);
        newPost.setTitle(submissionDto.getTitle());
        newPost.setDescription(submissionDto.getDescription());
        newPost.setAcademicYear(submissionDto.getAcademicYear());
        newPost.setDepartment(submissionDto.getDepartment());
        newPost.setGrade(submissionDto.getGrade());
        newPost.setRelatedPeriod(submissionDto.getRelatedPeriod());
        newPost.setCreatedAt(LocalDateTime.now());
        newPost.setUpdatedAt(LocalDateTime.now());

        return postRepository.save(newPost);
    }
}