package com.dendai.backend.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ReplyDtoImpl implements ReplyDto {
    private Long replyId;
    private String content;
    private LocalDateTime createdAt;
    private String username;
    private Integer userId;
    private Long commentId;
}