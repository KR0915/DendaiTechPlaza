package com.dendai.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dendai.backend.dto.CommentDto;
import com.dendai.backend.dto.CommentSubmissionDto;
import com.dendai.backend.dto.PostDto;
import com.dendai.backend.dto.PostSubmissionDto;
import com.dendai.backend.dto.ReplyDto;
import com.dendai.backend.dto.ReplySubmissionDto;
import com.dendai.backend.entity.User;
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
        return ResponseEntity.ok(postService.getPopularPosts(PageRequest.of(page, size)));
    }

    @GetMapping("/recent")
    public ResponseEntity<Page<PostDto>> getRecentPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(postService.getRecentPosts(PageRequest.of(page, size)));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<PostDto>> getRecentPostsByUser(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(postService.getRecentPostsByUser(userId, PageRequest.of(page, size)));
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
        return ResponseEntity.ok(postService.searchPosts(keyword, year, grade, department, semester,
                PageRequest.of(page, size)));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDto> getPostById(
            @PathVariable Long postId,
            @RequestParam(defaultValue = "0") int commentPage,
            @RequestParam(defaultValue = "10") int commentSize,
            @RequestParam(defaultValue = "0") int replyPage,
            @RequestParam(defaultValue = "10") int replySize) {
        return ResponseEntity.ok(postService.getPostById(postId, PageRequest.of(commentPage, commentSize),
                PageRequest.of(replyPage, replySize)));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getPostCount() {
        return ResponseEntity.ok(postService.getPostCount());
    }

    @PostMapping
    public ResponseEntity<PostDto> createPost(@Valid @RequestBody PostSubmissionDto submissionDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(postService.createPost(submissionDto, getCurrentUserId()));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.deletePost(postId, getCurrentUserId()));
    }

    @GetMapping("/{postId}/isBookmark")
    public ResponseEntity<Boolean> getIsBookmark(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.isPostBookmarkedByUser(postId, getCurrentUserId()));
    }

    @PostMapping("/{postId}/bookmark")
    public ResponseEntity<Void> addBookmark(@PathVariable Long postId) {
        postService.addBookmark(postId, getCurrentUserId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}/bookmark")
    public ResponseEntity<Void> removeBookmark(@PathVariable Long postId) {
        postService.removeBookmark(postId, getCurrentUserId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<CommentDto> createComment(@PathVariable Long postId,
            @Valid @RequestBody CommentSubmissionDto submissionDto) {
        submissionDto.setPostId(postId);
        CommentDto createdComment = postService.createComment(submissionDto, getCurrentUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }

    @PostMapping("/comments/{commentId}/replies")
    public ResponseEntity<ReplyDto> createReply(@PathVariable Long commentId,
            @Valid @RequestBody ReplySubmissionDto submissionDto) {
        submissionDto.setCommentId(commentId);
        ReplyDto createdReply = postService.createReply(submissionDto, getCurrentUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReply);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        postService.deleteComment(commentId, getCurrentUserId());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/replies/{replyId}")
    public ResponseEntity<Void> deleteReply(@PathVariable Long replyId) {
        postService.deleteReply(replyId, getCurrentUserId());
        return ResponseEntity.noContent().build();
    }

    private Integer getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }
        if (!(authentication.getPrincipal() instanceof User)) {
            throw new RuntimeException("Unexpected principal type");
        }
        return ((User) authentication.getPrincipal()).getUserId();
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}