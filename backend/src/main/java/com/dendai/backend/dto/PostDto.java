package com.dendai.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public interface PostDto {
    Integer getPostId();
    String getTitle();
    String getDescription();
    Integer getYear();
    String getDepartment();
    Integer getGrade();
    String getSemester();
    LocalDateTime getCreatedAt();
    LocalDateTime getUpdatedAt();
    String getUsername();
    Long getLikesCount();
    Integer getUserId();
    List<String> getSharedUrls(); // 文字列のリストとして定義
}
