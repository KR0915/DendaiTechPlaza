package com.dendai.backend.dto;

import lombok.Data;

@Data
public class ReplySubmissionDto {
    private String content;
    private Long commentId;
}