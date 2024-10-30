package com.dendai.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PostSubmissionDto {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Academic year is required")
    private Integer academicYear;

    @NotBlank(message = "Department is required")
    private String department;

    @NotNull(message = "Grade is required")
    private Integer grade;

    @NotBlank(message = "Related period is required")
    private String relatedPeriod;
}