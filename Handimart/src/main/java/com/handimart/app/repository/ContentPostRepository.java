package com.handimart.app.repository;

import com.handimart.app.model.ContentPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentPostRepository extends JpaRepository<ContentPost, Long> {

}