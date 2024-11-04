package com.dendai.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@AllArgsConstructor
@NoArgsConstructor
@With
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

    // This constructor is needed for the query
    public PostDtoImpl(Long postId, String title, String description, Integer year,
            Long departmentId, String departmentName, Integer grade, String semester,
            LocalDateTime createdAt, LocalDateTime updatedAt, String username,
            Long likesCount, Integer userId) {
        this(postId, title, description, year, departmentId, departmentName, grade, semester,
                createdAt, updatedAt, username, likesCount, userId, null, null);
    }

    @Override
    public void setComments(Page<CommentDto> comments) {
        this.comments = comments;
    }
}