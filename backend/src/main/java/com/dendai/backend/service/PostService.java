package com.dendai.backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dendai.backend.dto.PostDto;
import com.dendai.backend.dto.PostSubmissionDto;
import com.dendai.backend.entity.Bookmark;
import com.dendai.backend.entity.Post;
import com.dendai.backend.entity.SharedURL;
import com.dendai.backend.repository.BookmarkRepository;
import com.dendai.backend.repository.PostRepository;
import com.dendai.backend.repository.SharedURLRepository;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final BookmarkRepository bookmarkRepository;
    private final SharedURLRepository sharedURLRepository;

    @Autowired
    public PostService(PostRepository postRepository, BookmarkRepository bookmarkRepository,
            SharedURLRepository sharedURLRepository) {
        this.postRepository = postRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.sharedURLRepository = sharedURLRepository;
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

    public PostDto getPostById(Long postId) {
        PostDto postDto = postRepository.findPostById(postId);
        if (postDto == null) {
            throw new RuntimeException("Post not found with id: " + postId);
        }
        return postDto;
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

        Post savedPost = postRepository.save(newPost);

        if (submissionDto.getSharedUrls() != null && !submissionDto.getSharedUrls().isEmpty()) {
            List<SharedURL> sharedURLs = new ArrayList<>();
            for (String url : submissionDto.getSharedUrls()) {
                SharedURL sharedURL = new SharedURL();
                sharedURL.setPost(savedPost);
                sharedURL.setLink(url);
                sharedURLs.add(sharedURL);
            }
            sharedURLRepository.saveAll(sharedURLs);
        }

        return savedPost;
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
    public String deletePost(Long postId, Integer userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getUserId().equals(userId)) {
            throw new RuntimeException("User is not authorized to delete this post");
        }

        postRepository.deleteById(postId);
        return "Post successfully deleted";
    }

    public boolean isPostBookmarkedByUser(Long postId, Integer userId) {
        if (userId == null) {
            return false;
        }
        return bookmarkRepository.findByPostIdAndUserId(postId, userId).isPresent();
    }
}