package com.dendai.backend.dto;

import java.util.List;

import lombok.Data;

@Data
public class DeletePostsDto {
    private List<Long> postIds;
}