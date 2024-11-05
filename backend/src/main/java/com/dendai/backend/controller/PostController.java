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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/posts")
@Tag(name = "Post", description = "投稿管理API")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @Operation(summary = "人気の投稿を取得", description = "人気の投稿のページを取得します")
    @GetMapping("/popular")
    public ResponseEntity<Page<PostDto>> getPopularPosts(
            @Parameter(description = "ページ番号") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "ページサイズ") @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(postService.getPopularPosts(PageRequest.of(page, size)));
    }

    @Operation(summary = "最近の投稿を取得", description = "最近の投稿のページを取得します")
    @GetMapping("/recent")
    public ResponseEntity<Page<PostDto>> getRecentPosts(
            @Parameter(description = "ページ番号") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "ページサイズ") @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(postService.getRecentPosts(PageRequest.of(page, size)));
    }

    @Operation(summary = "特定ユーザーの最近の投稿を取得", description = "特定のユーザーの最近の投稿のページを取得します")
    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<PostDto>> getRecentPostsByUser(
            @Parameter(description = "ユーザーID") @PathVariable Integer userId,
            @Parameter(description = "ページ番号") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "ページサイズ") @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(postService.getRecentPostsByUser(userId, PageRequest.of(page, size)));
    }

    @Operation(summary = "投稿を検索", description = "様々な条件に基づいて投稿を検索します")
    @GetMapping("/search")
    public ResponseEntity<Page<PostDto>> searchPosts(
            @Parameter(description = "検索キーワード") @RequestParam(required = false) String keyword,
            @Parameter(description = "学年") @RequestParam(required = false) Integer year,
            @Parameter(description = "学年") @RequestParam(required = false) Integer grade,
            @Parameter(description = "学科") @RequestParam(required = false) String department,
            @Parameter(description = "学期") @RequestParam(required = false) String semester,
            @Parameter(description = "ページ番号") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "ページサイズ") @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(postService.searchPosts(keyword, year, grade, department, semester,
                PageRequest.of(page, size)));
    }

    @Operation(summary = "IDで投稿を取得", description = "特定のIDの投稿を取得します")
    @GetMapping("/{postId}")
    public ResponseEntity<PostDto> getPostById(
            @Parameter(description = "投稿のID") @PathVariable Long postId,
            @Parameter(description = "コメントのページ番号") @RequestParam(defaultValue = "0") int commentPage,
            @Parameter(description = "コメントのページサイズ") @RequestParam(defaultValue = "10") int commentSize,
            @Parameter(description = "返信のページ番号") @RequestParam(defaultValue = "0") int replyPage,
            @Parameter(description = "返信のページサイズ") @RequestParam(defaultValue = "10") int replySize) {
        return ResponseEntity.ok(postService.getPostById(postId, PageRequest.of(commentPage, commentSize),
                PageRequest.of(replyPage, replySize)));
    }

    @Operation(summary = "投稿数を取得", description = "総投稿数を取得します")
    @GetMapping("/count")
    public ResponseEntity<Long> getPostCount() {
        return ResponseEntity.ok(postService.getPostCount());
    }

    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "投稿を作成", description = "新しい投稿を作成します")
    @PostMapping
    public ResponseEntity<PostDto> createPost(@Valid @RequestBody PostSubmissionDto submissionDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(postService.createPost(submissionDto, getCurrentUserId()));
    }

    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "投稿を削除", description = "IDで指定された投稿を削除します")
    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(@Parameter(description = "削除する投稿のID") @PathVariable Long postId) {
        return ResponseEntity.ok(postService.deletePost(postId, getCurrentUserId()));
    }

    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "投稿がブックマークされているか確認", description = "現在のユーザーが特定の投稿をブックマークしているかどうかを確認します")
    @GetMapping("/{postId}/isBookmark")
    public ResponseEntity<Boolean> getIsBookmark(@Parameter(description = "投稿のID") @PathVariable Long postId) {
        return ResponseEntity.ok(postService.isPostBookmarkedByUser(postId, getCurrentUserId()));
    }

    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "ブックマークを追加", description = "現在のユーザーの投稿をブックマークします")
    @PostMapping("/{postId}/bookmark")
    public ResponseEntity<Void> addBookmark(@Parameter(description = "ブックマークする投稿のID") @PathVariable Long postId) {
        postService.addBookmark(postId, getCurrentUserId());
        return ResponseEntity.ok().build();
    }

    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "ブックマークを削除", description = "現在のユーザーの投稿のブックマークを削除します")
    @DeleteMapping("/{postId}/bookmark")
    public ResponseEntity<Void> removeBookmark(@Parameter(description = "ブックマークを削除する投稿のID") @PathVariable Long postId) {
        postService.removeBookmark(postId, getCurrentUserId());
        return ResponseEntity.ok().build();
    }

    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "コメントを作成", description = "投稿に新しいコメントを作成します")
    @PostMapping("/{postId}/comments")
    public ResponseEntity<CommentDto> createComment(
            @Parameter(description = "コメントする投稿のID") @PathVariable Long postId,
            @Valid @RequestBody CommentSubmissionDto submissionDto) {
        submissionDto.setPostId(postId);
        CommentDto createdComment = postService.createComment(submissionDto, getCurrentUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }

    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "返信を作成", description = "コメントに新しい返信を作成します")
    @PostMapping("/comments/{commentId}/replies")
    public ResponseEntity<ReplyDto> createReply(
            @Parameter(description = "返信するコメントのID") @PathVariable Long commentId,
            @Valid @RequestBody ReplySubmissionDto submissionDto) {
        submissionDto.setCommentId(commentId);
        ReplyDto createdReply = postService.createReply(submissionDto, getCurrentUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReply);
    }

    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "コメントを削除", description = "IDで指定されたコメントを削除します")
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@Parameter(description = "削除するコメントのID") @PathVariable Long commentId) {
        postService.deleteComment(commentId, getCurrentUserId());
        return ResponseEntity.noContent().build();
    }

    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "返信を削除", description = "IDで指定された返信を削除します")
    @DeleteMapping("/replies/{replyId}")
    public ResponseEntity<Void> deleteReply(@Parameter(description = "削除する返信のID") @PathVariable Long replyId) {
        postService.deleteReply(replyId, getCurrentUserId());
        return ResponseEntity.noContent().build();
    }

    private Integer getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("ユーザーが認証されていません");
        }
        if (!(authentication.getPrincipal() instanceof User)) {
            throw new RuntimeException("予期しないプリンシパルタイプです");
        }
        return ((User) authentication.getPrincipal()).getUserId();
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}