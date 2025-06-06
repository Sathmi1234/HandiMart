package com.handimart.app.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductReviewResponse {
    
    private Long reviewId;
    private Integer rating;
    private String comment;
    private LocalDateTime reviewDate;
    private Integer helpfulVotes;
    private ProductSummary product;
    private UserSummary reviewer;
    
    // Constructors
    public ProductReviewResponse() {}
    
    // Getters and Setters
    public Long getReviewId() {
        return reviewId;
    }
    
    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
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
    
    public LocalDateTime getReviewDate() {
        return reviewDate;
    }
    
    public void setReviewDate(LocalDateTime reviewDate) {
        this.reviewDate = reviewDate;
    }
    
    public Integer getHelpfulVotes() {
        return helpfulVotes;
    }
    
    public void setHelpfulVotes(Integer helpfulVotes) {
        this.helpfulVotes = helpfulVotes;
    }
    
    public ProductSummary getProduct() {
        return product;
    }
    
    public void setProduct(ProductSummary product) {
        this.product = product;
    }
    
    public UserSummary getReviewer() {
        return reviewer;
    }
    
    public void setReviewer(UserSummary reviewer) {
        this.reviewer = reviewer;
    }
    
    // Inner classes for nested objects
    public static class ProductSummary {
        private Long productId;
        private String title;
        private BigDecimal price;
        
        // Constructors
        public ProductSummary() {}
        
        // Getters and Setters
        public Long getProductId() {
            return productId;
        }
        
        public void setProductId(Long productId) {
            this.productId = productId;
        }
        
        public String getTitle() {
            return title;
        }
        
        public void setTitle(String title) {
            this.title = title;
        }
        
        public BigDecimal getPrice() {
            return price;
        }
        
        public void setPrice(BigDecimal price) {
            this.price = price;
        }
    }
    
    public static class UserSummary {
        private Long userId;
        private String username;
        private String email;
        
        // Constructors
        public UserSummary() {}
        
        // Getters and Setters
        public Long getUserId() {
            return userId;
        }
        
        public void setUserId(Long userId) {
            this.userId = userId;
        }
        
        public String getUsername() {
            return username;
        }
        
        public void setUsername(String username) {
            this.username = username;
        }
        
        public String getEmail() {
            return email;
        }
        
        public void setEmail(String email) {
            this.email = email;
        }
    }
}