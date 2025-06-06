package com.handimart.app.request;

public class ProductReviewRequest {
    
    private Long productId;
    private Long reviewerId;
    private Integer rating;
    private String comment;
    private Integer helpfulVotes;
    
    // Constructors
    public ProductReviewRequest() {}
    
    public ProductReviewRequest(Long productId, Long reviewerId, Integer rating, String comment) {
        this.productId = productId;
        this.reviewerId = reviewerId;
        this.rating = rating;
        this.comment = comment;
        this.helpfulVotes = 0;
    }
    
    // Getters and Setters
    public Long getProductId() {
        return productId;
    }
    
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    
    public Long getReviewerId() {
        return reviewerId;
    }
    
    public void setReviewerId(Long reviewerId) {
        this.reviewerId = reviewerId;
    }
    
    public Integer getRating() {
        return rating;
    }
    
    public void setRating(Integer rating) {
        this.rating = rating;
    }
    
    public String getComment() {
        return comment;
    }
    
    public void setComment(String comment) {
        this.comment = comment;
    }
    
    public Integer getHelpfulVotes() {
        return helpfulVotes;
    }
    
    public void setHelpfulVotes(Integer helpfulVotes) {
        this.helpfulVotes = helpfulVotes;
    }
}