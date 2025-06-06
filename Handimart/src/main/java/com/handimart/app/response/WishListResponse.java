package com.handimart.app.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WishListResponse {
    private Long wishListId;
    private Long userId;
    private LocalDateTime createdAt;
	public Long getWishListId() {
		return wishListId;
	}
	public void setWishListId(Long wishListId) {
		this.wishListId = wishListId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
    
    public WishListResponse() {
    	
    }

}
