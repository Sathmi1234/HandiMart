package com.handimart.app.response;

import java.time.LocalDateTime;

public class ContentPostResponse {
    
    private Long contentPostId;
    private String title;
    private String description;
    private Long productId;
    private LocalDateTime createdAt;
    
    // Constructors
    public ContentPostResponse() {}
    
    public ContentPostResponse(Long contentPostId, String title, String description, 
                             Long productId, LocalDateTime createdAt) {
        this.contentPostId = contentPostId;
        this.title = title;
        this.description = description;
        this.productId = productId;
        this.createdAt = createdAt;
    }
    
    // Getters and Setters
    public Long getContentPostId() {
        return contentPostId;
    }
    
    public void setContentPostId(Long contentPostId) {
        this.contentPostId = contentPostId;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Long getProductId() {
        return productId;
    }
    
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}