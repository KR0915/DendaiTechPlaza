package com.dendai.backend.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dendai.backend.dto.CommentDto;
import com.dendai.backend.dto.CommentDtoImpl;
import com.dendai.backend.dto.PostDto;
import com.dendai.backend.dto.PostDtoImpl;
import com.dendai.backend.dto.PostSubmissionDto;
import com.dendai.backend.dto.ReplyDto;
import com.dendai.backend.entity.Bookmark;
import com.dendai.backend.entity.Department;
import com.dendai.backend.entity.Post;
import com.dendai.backend.entity.SharedURL;
import com.dendai.backend.entity.User;
import com.dendai.backend.repository.BookmarkRepository;
import com.dendai.backend.repository.DepartmentRepository;
import com.dendai.backend.repository.PostRepository;
import com.dendai.backend.repository.SharedURLRepository;
import com.dendai.backend.repository.UserRepository;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final BookmarkRepository bookmarkRepository;
    private final SharedURLRepository sharedURLRepository;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;

    @Autowired
    public PostService(PostRepository postRepository, BookmarkRepository bookmarkRepository,
            SharedURLRepository sharedURLRepository, UserRepository userRepository,
            DepartmentRepository departmentRepository) {
        this.postRepository = postRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.sharedURLRepository = sharedURLRepository;
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
    }

    public Page<PostDto> getPopularPosts(Pageable pageable) {
        return postRepository.findPopularPosts(pageable);
    }

    public Page<PostDto> getRecentPosts(Pageable pageable) {
        return postRepository.findAllPosts(pageable);
    }

    public Page<PostDto> getRecentPostsByUser(Integer userId, Pageable pageable) {
        return postRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
    }

    public Page<PostDto> searchPosts(String keyword, Integer year, Integer grade, String department, String semester,
            Pageable pageable) {
        return postRepository.searchPostsByKeywordAndFilters(keyword, year, grade, department, semester, pageable);
    }

    @Transactional(readOnly = true)
    public PostDto getPostById(Long postId, Pageable commentPageable, Pageable replyPageable) {
        PostDto postDto = postRepository.findPostById(postId);
        if (postDto == null) {
            throw new RuntimeException("Post not found with id: " + postId);
        }

        Page<CommentDto> commentPage = postRepository.findCommentsByPostId(postId, commentPageable);
        Page<ReplyDto> replyPage = postRepository.findRepliesByPostId(postId, replyPageable);

        // Group replies by parent comment ID
        Map<Long, List<ReplyDto>> repliesByCommentId = replyPage.getContent().stream()
                .collect(Collectors.groupingBy(ReplyDto::getCommentId));

        // Assign replies to their respective comments
        List<CommentDto> commentsWithReplies = commentPage.getContent().stream()
                .map(comment -> {
                    List<ReplyDto> commentReplies = repliesByCommentId.get(comment.getCommentId());
                    if (commentReplies != null) {
                        ((CommentDtoImpl) comment).setReplies(commentReplies);
                    }
                    return comment;
                })
                .collect(Collectors.toList());

        // Create a new Page object with the updated comment content
        Page<CommentDto> updatedCommentPage = new PageImpl<>(commentsWithReplies, commentPageable, commentPage.getTotalElements());

        // Assign comments to the post
        ((PostDtoImpl) postDto).setComments(updatedCommentPage);

        return postDto;
    }

    @Transactional
    public PostDto createPost(PostSubmissionDto submissionDto, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Department department = departmentRepository.findByName(submissionDto.getDepartment())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        Post newPost = new Post();
        newPost.setUser(user);
        newPost.setDepartment(department);
        newPost.setTitle(submissionDto.getTitle());
        newPost.setDescription(submissionDto.getDescription());
        newPost.setAcademicYear(submissionDto.getAcademicYear());
        newPost.setGrade(submissionDto.getGrade());
        newPost.setRelatedPeriod(submissionDto.getRelatedPeriod());


        if (submissionDto.getSharedUrls() != null && !submissionDto.getSharedUrls().isEmpty()) {
            for (String url : submissionDto.getSharedUrls()) {
                SharedURL sharedURL = new SharedURL();
                sharedURL.setPost(newPost);
                sharedURL.setLink(url);
                sharedURLRepository.save(sharedURL);
                newPost.addSharedUrl(sharedURL);
            }
        }

        Post savedPost = postRepository.save(newPost);
        return postRepository.findPostById(savedPost.getPostId());
    }

    @Transactional
    public void addBookmark(Long postId, Integer userId) {
        if (bookmarkRepository.findByPost_PostIdAndUser_UserId(postId, userId).isPresent()) {
            throw new RuntimeException("Bookmark already exists");
        }

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Bookmark bookmark = new Bookmark();
        bookmark.setPost(post);
        bookmark.setUser(user);
        bookmarkRepository.save(bookmark);
    }

    @Transactional
    public void removeBookmark(Long postId, Integer userId) {
        Bookmark bookmark = bookmarkRepository.findByPost_PostIdAndUser_UserId(postId, userId)
                .orElseThrow(() -> new RuntimeException("Bookmark not found"));
        bookmarkRepository.delete(bookmark);
    }

    @Transactional
    public String deletePost(Long postId, Integer userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("User is not authorized to delete this post");
        }

        postRepository.delete(post);
        return "Post successfully deleted";
    }

    public boolean isPostBookmarkedByUser(Long postId, Integer userId) {
        if (userId == null) {
            return false;
        }
        return bookmarkRepository.findByPost_PostIdAndUser_UserId(postId, userId).isPresent();
    }
}