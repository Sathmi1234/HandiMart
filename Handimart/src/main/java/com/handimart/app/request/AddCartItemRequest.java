package com.handimart.app.request;

import lombok.Data;

@Data
public class AddCartItemRequest {

	private Long productId;
    private Integer quantity;
    
    public AddCartItemRequest() {
    	
    }

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
    
    
}
