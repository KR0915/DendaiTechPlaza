package com.dendai.backend.dto;

import java.time.LocalDateTime;

public interface ReplyDto {
    Long getReplyId();
    String getContent();
    LocalDateTime getCreatedAt();
    String getUsername();
    Integer getUserId();
}
