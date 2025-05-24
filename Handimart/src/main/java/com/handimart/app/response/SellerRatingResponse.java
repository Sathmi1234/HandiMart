package com.handimart.app.response;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class SellerRatingResponse {

	private Long ratingId;
	private Long sellerId;
	private Long raterId;
	private Integer rating;
	private LocalDateTime ratedAt;
	public Long getRatingId() {
		return ratingId;
	}
	public void setRatingId(Long ratingId) {
		this.ratingId = ratingId;
	}
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
	public LocalDateTime getRatedAt() {
		return ratedAt;
	}
	public void setRatedAt(LocalDateTime ratedAt) {
		this.ratedAt = ratedAt;
	}
	
	public SellerRatingResponse() {
		
	}
}
