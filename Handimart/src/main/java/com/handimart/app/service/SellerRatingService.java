package com.handimart.app.service;

import java.util.List;

import com.handimart.app.request.SellerRatingRequest;
import com.handimart.app.response.SellerRatingResponse;

public interface SellerRatingService {

	SellerRatingResponse rateSeller(SellerRatingRequest request);
	SellerRatingResponse getRatingById(Long ratingId);
	List<SellerRatingResponse> getRatingsBySeller(Long sellerId);
	List<SellerRatingResponse> getAllRatings();
	SellerRatingResponse updateRating(Long ratingId, Integer newRating);
	void deleteRating(Long ratingId);
}
