package com.dendai.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChangePasswordDto {
    @NotBlank
    private String currentPassword;
    @NotBlank
    private String newPassword;
}