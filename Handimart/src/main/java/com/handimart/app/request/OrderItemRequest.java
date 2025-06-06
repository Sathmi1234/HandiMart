package com.handimart.app.request;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class OrderItemRequest {

	private Long productId;
	private Integer quantity;
	private BigDecimal unitPrice;
	
	public OrderItemRequest() {
		
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

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}
	
	
}
