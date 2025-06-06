package com.handimart.app.response;

import lombok.Data;

@Data
public class CartItemResponse {

	private Long cartItemId;
    private Long productId;
    private String productName;
    private Integer quantity;
    
    public CartItemResponse() {
    	
    }

	public Long getCartItemId() {
		return cartItemId;
	}

	public void setCartItemId(Long cartItemId) {
		this.cartItemId = cartItemId;
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

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	
    
    
}
