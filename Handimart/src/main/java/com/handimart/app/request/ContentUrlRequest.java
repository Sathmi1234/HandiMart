package com.handimart.app.request;

public class ContentUrlRequest {
    
    private String url;
    private Long contentPostId;
    
    public ContentUrlRequest() {}
    
    public ContentUrlRequest(String url, Long contentPostId) {
        this.url = url;
        this.contentPostId = contentPostId;
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