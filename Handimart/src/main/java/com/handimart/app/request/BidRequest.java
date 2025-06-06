package com.handimart.app.request;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class BidRequest {

	private Long productId;
	private Long bidderId;
	private BigDecimal bidAmount;
	
	public BidRequest() {
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Long getBidderId() {
		return bidderId;
	}

	public void setBidderId(Long bidderId) {
		this.bidderId = bidderId;
	}

	public BigDecimal getBidAmount() {
		return bidAmount;
	}

	public void setBidAmount(BigDecimal bidAmount) {
		this.bidAmount = bidAmount;
	}
	
	
}
