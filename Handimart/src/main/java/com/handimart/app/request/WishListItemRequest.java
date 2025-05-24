package com.handimart.app.request;

import lombok.Data;

@Data
public class WishListItemRequest {
    private Long wishListId;
    private Long productId;
    
    public WishListItemRequest() {
    	
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
    
    
}
