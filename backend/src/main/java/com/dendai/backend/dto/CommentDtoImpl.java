package com.dendai.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class CommentDtoImpl implements CommentDto {
    private Long commentId;
    private String content;
    private LocalDateTime createdAt;
    private String username;
    private Integer userId;
    private List<ReplyDto> replies;
}