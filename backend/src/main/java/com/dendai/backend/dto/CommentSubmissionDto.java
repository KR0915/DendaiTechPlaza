package com.dendai.backend.dto;

import lombok.Data;

@Data
public class CommentSubmissionDto {
    private String content;
    private Long postId;
}