package com.dendai.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dendai.backend.dto.PostDto;
import com.dendai.backend.dto.PostSubmissionDto;
import com.dendai.backend.entity.Post;
import com.dendai.backend.service.PostService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/popular")
    public ResponseEntity<Page<PostDto>> getPopularPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<PostDto> popularPosts = postService.getPopularPosts(PageRequest.of(page, size));
        return ResponseEntity.ok(popularPosts);
    }

    @GetMapping("/recent")
    public ResponseEntity<Page<PostDto>> getRecentPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<PostDto> recentPosts = postService.getRecentPosts(PageRequest.of(page, size));
        return ResponseEntity.ok(recentPosts);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<PostDto>> getRecentPostsByUser(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<PostDto> userPosts = postService.getRecentPostsByUser(userId, PageRequest.of(page, size));
        return ResponseEntity.ok(userPosts);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<PostDto>> searchPosts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer grade,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String semester,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<PostDto> searchResults = postService.searchPosts(keyword, year, grade, department, semester, PageRequest.of(page, size));
        return ResponseEntity.ok(searchResults);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Long postId) {
        return postService.getPostById(postId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getPostCount() {
        long count = postService.getPostCount();
        return ResponseEntity.ok(count);
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@Valid @RequestBody PostSubmissionDto submissionDto) {
        // TODO: 認証されたユーザーのIDを取得する。ここでは仮のユーザーIDを使用
        Integer userId = 1; // この部分は実際の認証システムに合わせて変更する必要があります
        Post createdPost = postService.createPost(submissionDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    // エラーハンドリング
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred: " + e.getMessage());
    }
}