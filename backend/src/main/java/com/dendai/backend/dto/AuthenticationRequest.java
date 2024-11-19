package com.dendai.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class AuthenticationRequest {
    @Schema(description = "ユーザーのメールアドレス", example = "99FI999@ms.dendai.ac.jp")
    private String email;

    @Schema(description = "パスワード", example = "tuyotuyoPassword")
    private String password;
}