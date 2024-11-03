package com.dendai.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dendai.backend.entity.SharedURL;

@Repository
public interface SharedURLRepository extends JpaRepository<SharedURL, Long> {
}