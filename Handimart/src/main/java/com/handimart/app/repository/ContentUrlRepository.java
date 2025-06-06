package com.handimart.app.repository;

import com.handimart.app.model.ContentUrl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContentUrlRepository extends JpaRepository<ContentUrl, Long> {
    
    // Find all URLs for a specific content post
    List<ContentUrl> findByContentPostContentPostId(Long contentPostId);
    
    // Custom query to find URLs by content post ID
    @Query("SELECT cu FROM ContentUrl cu WHERE cu.contentPost.contentPostId = :contentPostId")
    List<ContentUrl> findUrlsByContentPostId(@Param("contentPostId") Long contentPostId);
}