package com.dendai.backend.dto;

import java.time.LocalDateTime;

public interface PostDto {
    Integer getPostId();
    String getTitle();
    String getDescription();
    Integer getYear();
    String getDepartment();
    Integer getGrade();
    String getSemester();
    LocalDateTime getCreatedAt();
    String getUsername();
    Long getLikesCount();
    Integer getUserId();
}
