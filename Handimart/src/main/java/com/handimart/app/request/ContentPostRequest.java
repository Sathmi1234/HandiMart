package com.handimart.app.request;

public class ContentPostRequest {
    
    private String title;
    private String description;
    private Long productId;
    
    // Constructors
    public ContentPostRequest() {}
    
    public ContentPostRequest(String title, String description, Long productId) {
        this.title = title;
        this.description = description;
        this.productId = productId;
    }
    
    // Getters and Setters
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
}