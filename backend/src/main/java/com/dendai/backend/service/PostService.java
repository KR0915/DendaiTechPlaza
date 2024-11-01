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
import com.dendai.backend.entity.Bookmark;
import com.dendai.backend.entity.Post;
import com.dendai.backend.repository.BookmarkRepository;
import com.dendai.backend.repository.PostRepository;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final BookmarkRepository bookmarkRepository;

    @Autowired
    public PostService(PostRepository postRepository, BookmarkRepository bookmarkRepository) {
        this.postRepository = postRepository;
        this.bookmarkRepository = bookmarkRepository;
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

    @Transactional
    public void addBookmark(Long postId, Integer userId) {
        if (bookmarkRepository.findByPostIdAndUserId(postId, userId).isPresent()) {
            throw new RuntimeException("Bookmark already exists");
        }

        Bookmark bookmark = new Bookmark();
        bookmark.setPostId(postId);
        bookmark.setUserId(userId);
        bookmarkRepository.save(bookmark);
    }

    @Transactional
    public void removeBookmark(Long postId, Integer userId) {
        bookmarkRepository.deleteByPostIdAndUserId(postId, userId);
    }

    @Transactional
    public void deletePost(Long postId, Integer userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getUserId().equals(userId)) {
            throw new RuntimeException("User is not authorized to delete this post");
        }

        postRepository.deleteById(postId);
    }
}