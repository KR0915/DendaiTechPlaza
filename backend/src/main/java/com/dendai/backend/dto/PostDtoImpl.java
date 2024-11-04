package com.dendai.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Data;

@Data
public class PostDtoImpl implements PostDto {
    private Long postId;
    private String title;
    private String description;
    private Integer year;
    private Long departmentId;
    private String departmentName;
    private Integer grade;
    private String semester;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String username;
    private Long likesCount;
    private Integer userId;
    private List<String> sharedUrls;
    private Page<CommentDto> comments;
}