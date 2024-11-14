package com.dendai.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dendai.backend.dto.AuthenticationRequest;
import com.dendai.backend.dto.AuthenticationResponse;
import com.dendai.backend.dto.UserRegistrationDto;
import com.dendai.backend.entity.User;
import com.dendai.backend.security.JwtUtil;
import com.dendai.backend.service.CustomUserDetailsService;
import com.dendai.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "認証API")
public class AuthController {
    private final UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Operation(
        summary = "ログイン", 
        description = "ユーザーを認証し、JWTトークンを返します",
        requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "ログイン情報",
            required = true,
            content = @Content(schema = @Schema(implementation = AuthenticationRequest.class))
        ),
        responses = {
            @ApiResponse(
                responseCode = "200", 
                description = "認証成功", 
                content = @Content(schema = @Schema(implementation = AuthenticationResponse.class))
            ),
            @ApiResponse(responseCode = "401", description = "認証失敗")
        }
    )
    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
            throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
                            authenticationRequest.getPassword()));
        } catch (Exception e) {
            throw new Exception("メールアドレスまたはパスワードが正しくありません", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @Operation(summary = "ユーザー登録", description = "新しいユーザーを登録します")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationDto registrationDto) {
        User registeredUser = userService.registerUser(registrationDto);
        return ResponseEntity.ok(registeredUser);
    }


    @Operation(
        summary = "管理者権限チェック",
        description = "現在のユーザーが管理者権限を持っているかどうかをチェックします",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "チェック成功",
                content = @Content(schema = @Schema(implementation = Boolean.class))
            ),
            @ApiResponse(responseCode = "401", description = "認証されていないユーザー")
        }
    )
    @SecurityRequirement(name = "bearer-jwt")
    @GetMapping("/isAdmin")
    public ResponseEntity<Boolean> isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok(authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("admin")));
        }
        return ResponseEntity.ok(false);
    }
}