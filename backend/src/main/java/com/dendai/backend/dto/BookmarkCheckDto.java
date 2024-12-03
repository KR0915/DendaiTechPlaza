package com.dendai.backend.dto;

import java.util.List;

import lombok.Data;

@Data
public class BookmarkCheckDto {
    private List<Long> postIds;
}