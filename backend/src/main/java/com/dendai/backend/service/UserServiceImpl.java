package com.dendai.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dendai.backend.dto.ChangePasswordDto;
import com.dendai.backend.dto.PostDtoImpl;
import com.dendai.backend.dto.UserInfoDto;
import com.dendai.backend.dto.UserRegistrationDto;
import com.dendai.backend.entity.User;
import com.dendai.backend.repository.BookmarkRepository;
import com.dendai.backend.repository.CommentRepository;
import com.dendai.backend.repository.PostRepository;
import com.dendai.backend.repository.ReplyRepository;
import com.dendai.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final PasswordEncoder passwordEncoder;
        private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;
    private final BookmarkRepository bookmarkRepository;

    @Value("${registration.common.password.student}")
    private String studentCommonPassword;

    @Value("${registration.common.password.admin}")
    private String adminCommonPassword;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User registerUser(UserRegistrationDto registrationDto) {
        if (userRepository.findByUsername(registrationDto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.findByEmail(registrationDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        if (!registrationDto.getEmail().endsWith("@ms.dendai.ac.jp")) {
            throw new RuntimeException("Email must be from @ms.dendai.ac.jp domain");
        }

        if (!isValidCommonPassword(registrationDto.getRole(), registrationDto.getCommonPassword())) {
            throw new RuntimeException("Invalid common password for the specified role");
        }

        User newUser = new User();
        newUser.setUsername(registrationDto.getUsername());
        newUser.setEmail(registrationDto.getEmail());
        newUser.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        newUser.setRole(registrationDto.getRole());

        return userRepository.save(newUser);
    }

    private boolean isValidCommonPassword(String role, String commonPassword) {
        return switch (role) {
            case "student" -> studentCommonPassword.equals(commonPassword);
            case "admin" -> adminCommonPassword.equals(commonPassword);
            default -> false;
        };
    }

    @Override
    public UserInfoDto getUserInfo(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserInfoDto(user.getUserId(), user.getUsername(), user.getEmail());
    }

    @Override
    public UserInfoDto updateUserInfo(Integer userId, UserInfoDto userInfoDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getUsername().equals(userInfoDto.getUsername()) &&
                userRepository.findByUsername(userInfoDto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        if (!user.getEmail().equals(userInfoDto.getEmail()) &&
                userRepository.findByEmail(userInfoDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        user.setUsername(userInfoDto.getUsername());
        user.setEmail(userInfoDto.getEmail());
        user.setUpdatedAt(LocalDateTime.now());

        User updatedUser = userRepository.save(user);
        return new UserInfoDto(updatedUser.getUserId(), updatedUser.getUsername(), updatedUser.getEmail());
    }

    @Override
    public void changePassword(Integer userId, ChangePasswordDto changePasswordDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(changePasswordDto.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteAccount(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Delete all replies by the user
        replyRepository.deleteByUser(user);

        // Delete all comments by the user
        commentRepository.deleteByUser(user);

        bookmarkRepository.deleteByUser(user);

        postRepository.deleteByUser(user);
        userRepository.delete(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PostDtoImpl> getUserBookmarks(Integer userId, Pageable pageable) {
        return userRepository.findUserBookmarks(userId, pageable);
    }
}