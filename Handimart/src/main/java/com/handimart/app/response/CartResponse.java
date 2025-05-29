package com.handimart.app.response;

import java.time.LocalDateTime;

import com.handimart.app.model.User;

public class CartResponse {

	private Long cartId;
    private User cartOwner;
    private LocalDateTime addedAt;
    private LocalDateTime updatedAt;
    
    public CartResponse() {
    	
    }

	public Long getCartId() {
		return cartId;
	}

	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}

	public User getCartOwner() {
		return cartOwner;
	}

	public void setCartOwner(User cartOwner) {
		this.cartOwner = cartOwner;
	}

	public LocalDateTime getAddedAt() {
		return addedAt;
	}

	public void setAddedAt(LocalDateTime addedAt) {
		this.addedAt = addedAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
    
    
}
