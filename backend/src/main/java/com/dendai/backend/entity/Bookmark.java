package com.dendai.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bookmarks")
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bookmarks_bookmark_id_seq")
    @SequenceGenerator(name = "bookmarks_bookmark_id_seq", sequenceName = "bookmarks_bookmark_id_seq", allocationSize = 1)
    @Column(name = "bookmark_id")
    private Long bookmarkId;

    @Column(name = "post_id", nullable = false)
    private Long postId;  // Changed from Integer to Long

    @Column(name = "user_id", nullable = false)
    private Integer userId;
}