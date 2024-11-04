package com.dendai.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public interface CommentDto {
    Long getCommentId();
    String getContent();
    LocalDateTime getCreatedAt();
    String getUsername();
    Integer getUserId();
    List<ReplyDto> getReplies();
    void setReplies(List<ReplyDto> replies);
}