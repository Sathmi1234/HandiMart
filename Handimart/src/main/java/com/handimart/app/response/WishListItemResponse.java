package com.handimart.app.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WishListItemResponse {
    private Long wishListItemId;
    private Long wishListId;
    private Long productId;
    private String productName;
    private LocalDateTime addedAt;
	public Long getWishListItemId() {
		return wishListItemId;
	}
	public void setWishListItemId(Long wishListItemId) {
		this.wishListItemId = wishListItemId;
	}
	public Long getWishListId() {
		return wishListId;
	}
	public void setWishListId(Long wishListId) {
		this.wishListId = wishListId;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public LocalDateTime getAddedAt() {
		return addedAt;
	}
	public void setAddedAt(LocalDateTime addedAt) {
		this.addedAt = addedAt;
	}
    
    public WishListItemResponse() {
    	
    }
}
