package com.dendai.backend.service;

import java.time.LocalDateTime;
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
import com.dendai.backend.dto.CommentSubmissionDto;
import com.dendai.backend.dto.PostDto;
import com.dendai.backend.dto.PostDtoImpl;
import com.dendai.backend.dto.PostSubmissionDto;
import com.dendai.backend.dto.ReplyDto;
import com.dendai.backend.dto.ReplyDtoImpl;
import com.dendai.backend.dto.ReplySubmissionDto;
import com.dendai.backend.entity.Bookmark;
import com.dendai.backend.entity.Comment;
import com.dendai.backend.entity.Department;
import com.dendai.backend.entity.Post;
import com.dendai.backend.entity.Reply;
import com.dendai.backend.entity.SharedURL;
import com.dendai.backend.entity.User;
import com.dendai.backend.repository.BookmarkRepository;
import com.dendai.backend.repository.CommentRepository;
import com.dendai.backend.repository.DepartmentRepository;
import com.dendai.backend.repository.PostRepository;
import com.dendai.backend.repository.ReplyRepository;
import com.dendai.backend.repository.SharedURLRepository;
import com.dendai.backend.repository.UserRepository;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final BookmarkRepository bookmarkRepository;
    private final SharedURLRepository sharedURLRepository;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;

    @Autowired
    public PostService(PostRepository postRepository, BookmarkRepository bookmarkRepository,
            SharedURLRepository sharedURLRepository, UserRepository userRepository,
            DepartmentRepository departmentRepository,CommentRepository commentRepository,ReplyRepository replyRepository) {
        this.postRepository = postRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.sharedURLRepository = sharedURLRepository;
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.commentRepository = commentRepository;
        this.replyRepository =replyRepository;
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

        // Create a mutable copy of the PostDto
        PostDtoImpl mutablePostDto = new PostDtoImpl();
        copyProperties(postDto, mutablePostDto);

        Page<CommentDto> commentPage = postRepository.findCommentsByPostId(postId, commentPageable);
        Page<ReplyDto> replyPage = postRepository.findRepliesByPostId(postId, replyPageable);

        Map<Long, List<ReplyDto>> repliesByCommentId = replyPage.getContent().stream()
                .map(this::createMutableReplyDto)
                .collect(Collectors.groupingBy(ReplyDto::getCommentId));

        List<CommentDto> commentsWithReplies = commentPage.getContent().stream()
                .map(this::createMutableCommentDto)
                .peek(comment -> comment.setReplies(repliesByCommentId.getOrDefault(comment.getCommentId(), List.of())))
                .collect(Collectors.toList());

        Page<CommentDto> updatedCommentPage = new PageImpl<>(
                commentsWithReplies,
                commentPageable,
                commentPage.getTotalElements());

        mutablePostDto.setComments(updatedCommentPage);

        return mutablePostDto;
    }

    private CommentDto createMutableCommentDto(CommentDto immutableDto) {
        CommentDtoImpl mutableDto = new CommentDtoImpl();
        copyProperties(immutableDto, mutableDto);
        return mutableDto;
    }

    private ReplyDto createMutableReplyDto(ReplyDto immutableDto) {
        ReplyDtoImpl mutableDto = new ReplyDtoImpl();
        copyProperties(immutableDto, mutableDto);
        return mutableDto;
    }

    private void copyProperties(Object source, Object target) {
        org.springframework.beans.BeanUtils.copyProperties(source, target);
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

    public long getPostCount() {
        return postRepository.count();
    }


    @Transactional
    public CommentDto createComment(CommentSubmissionDto submissionDto, Integer userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(submissionDto.getPostId())
            .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = new Comment();
        comment.setContent(submissionDto.getContent());
        comment.setUser(user);
        comment.setPost(post);
        comment.setCreatedAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);
        return convertToCommentDto(savedComment);
    }

    @Transactional
    public ReplyDto createReply(ReplySubmissionDto submissionDto, Integer userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Comment comment = commentRepository.findById(submissionDto.getCommentId())
            .orElseThrow(() -> new RuntimeException("Comment not found"));

        Reply reply = new Reply();
        reply.setContent(submissionDto.getContent());
        reply.setUser(user);
        reply.setParentComment(comment);
        reply.setCreatedAt(LocalDateTime.now());

        Reply savedReply = replyRepository.save(reply);
        return convertToReplyDto(savedReply);
    }

    @Transactional
    public void deleteComment(Long commentId, Integer userId) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("User is not authorized to delete this comment");
        }

        commentRepository.delete(comment);
    }

    @Transactional
    public void deleteReply(Long replyId, Integer userId) {
        Reply reply = replyRepository.findById(replyId)
            .orElseThrow(() -> new RuntimeException("Reply not found"));

        if (!reply.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("User is not authorized to delete this reply");
        }

        replyRepository.delete(reply);
    }

    private CommentDto convertToCommentDto(Comment comment) {
        CommentDtoImpl dto = new CommentDtoImpl();
        dto.setCommentId(comment.getCommentId());
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setUsername(comment.getUser().getUsername());
        dto.setUserId(comment.getUser().getUserId());
        return dto;
    }

    private ReplyDto convertToReplyDto(Reply reply) {
        ReplyDtoImpl dto = new ReplyDtoImpl();
        dto.setReplyId(reply.getReplyId());
        dto.setContent(reply.getContent());
        dto.setCreatedAt(reply.getCreatedAt());
        dto.setUsername(reply.getUser().getUsername());
        dto.setUserId(reply.getUser().getUserId());
        dto.setCommentId(reply.getParentComment().getCommentId());
        return dto;
    }
}