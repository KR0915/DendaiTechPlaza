package com.dendai.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;

public interface PostDto {
    Long getPostId();
    String getTitle();
    String getDescription();
    Integer getYear();
    Long getDepartmentId();
    String getDepartmentName();
    Integer getGrade();
    String getSemester();
    LocalDateTime getCreatedAt();
    LocalDateTime getUpdatedAt();
    String getUsername();
    Long getLikesCount();
    Integer getUserId();
    List<String> getSharedUrls();
    Page<CommentDto> getComments();
    void setComments(Page<CommentDto> comments);
}