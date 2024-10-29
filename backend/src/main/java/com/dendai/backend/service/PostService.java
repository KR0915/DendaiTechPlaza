package com.dendai.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dendai.backend.dto.PopularPostDto;
import com.dendai.backend.repository.PostRepository;

@Service
public class PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<PopularPostDto> getPopularPosts() {
        return postRepository.findTop10PopularPosts();
    }
}
