package com.handimart.app.response;

public class ContentUrlResponse {
    
    private Long contentUrlId;
    private String url;
    private Long contentPostId;
    
    // Constructors
    public ContentUrlResponse() {}
    
    public ContentUrlResponse(Long contentUrlId, String url, Long contentPostId) {
        this.contentUrlId = contentUrlId;
        this.url = url;
        this.contentPostId = contentPostId;
    }
    
    // Getters and Setters
    public Long getContentUrlId() {
        return contentUrlId;
    }
    
    public void setContentUrlId(Long contentUrlId) {
        this.contentUrlId = contentUrlId;
    }
    
    public String getUrl() {
        return url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }
    
    public Long getContentPostId() {
        return contentPostId;
    }
    
    public void setContentPostId(Long contentPostId) {
        this.contentPostId = contentPostId;
    }
}