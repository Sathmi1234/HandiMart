package com.handimart.app.request;

import lombok.Data;

@Data
public class SellerRatingRequest {

	private Long sellerId;
	private Long raterId;
	private Integer rating;
	public Long getSellerId() {
		return sellerId;
	}
	public void setSellerId(Long sellerId) {
		this.sellerId = sellerId;
	}
	public Long getRaterId() {
		return raterId;
	}
	public void setRaterId(Long raterId) {
		this.raterId = raterId;
	}
	public Integer getRating() {
		return rating;
	}
	public void setRating(Integer rating) {
		this.rating = rating;
	}
	
	public SellerRatingRequest() {
		
	}
}
