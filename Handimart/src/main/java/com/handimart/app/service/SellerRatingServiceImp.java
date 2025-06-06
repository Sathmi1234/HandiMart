package com.handimart.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handimart.app.model.SellerProfile;
import com.handimart.app.model.SellerRating;
import com.handimart.app.model.User;
import com.handimart.app.repository.SellerProfileRepository;
import com.handimart.app.repository.SellerRatingRepository;
import com.handimart.app.repository.UserRepository;
import com.handimart.app.request.SellerRatingRequest;
import com.handimart.app.response.SellerRatingResponse;

@Service
public class SellerRatingServiceImp  implements SellerRatingService{

	@Autowired
	private SellerRatingRepository sellerRatingRepository;
	
	@Autowired
	private SellerProfileRepository sellerProfileRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public SellerRatingResponse rateSeller(SellerRatingRequest request) {
		  User seller = userRepository.findById(request.getSellerId())
		            .orElseThrow(() -> new RuntimeException("Seller not found"));
		        User rater = userRepository.findById(request.getRaterId())
		            .orElseThrow(() -> new RuntimeException("Rater not found"));

		        SellerRating rating = sellerRatingRepository.findBySellerAndRater(seller, rater)
		            .map(existing -> {
		                existing.setRating(request.getRating());
		                return existing;
		            }).orElseGet(() -> {
		                SellerRating newRating = new SellerRating();
		                newRating.setSeller(seller);
		                newRating.setRater(rater);
		                newRating.setRating(request.getRating());
		                return newRating;
		            });

		        SellerRating saved = sellerRatingRepository.save(rating);
		        recalculateSellerRating(seller);
		        return toResponse(saved);
	}

	@Override
	public SellerRatingResponse getRatingById(Long ratingId) {
		SellerRating rating = sellerRatingRepository.findById(ratingId)
	            .orElseThrow(() -> new RuntimeException("Rating not found"));
	        return toResponse(rating);
	}

	@Override
	public List<SellerRatingResponse> getRatingsBySeller(Long sellerId) {
		 User seller = userRepository.findById(sellerId)
		            .orElseThrow(() -> new RuntimeException("Seller not found"));
		        return sellerRatingRepository.findBySeller(seller).stream()
		            .map(this::toResponse)
		            .collect(Collectors.toList());
	}

	@Override
	public List<SellerRatingResponse> getAllRatings() {
		 return sellerRatingRepository.findAll().stream()
		            .map(this::toResponse)
		            .collect(Collectors.toList());
	}

	@Override
	public SellerRatingResponse updateRating(Long ratingId, Integer newRating) {
		SellerRating rating = sellerRatingRepository.findById(ratingId)
	            .orElseThrow(() -> new RuntimeException("Rating not found"));

	        rating.setRating(newRating);
	        SellerRating updated = sellerRatingRepository.save(rating);

	        recalculateSellerRating(rating.getSeller());
	        return toResponse(updated);
	}

	@Override
	public void deleteRating(Long ratingId) {
		 SellerRating rating = sellerRatingRepository.findById(ratingId)
		            .orElseThrow(() -> new RuntimeException("Rating not found"));

		        User seller = rating.getSeller();
		        sellerRatingRepository.delete(rating);
		        recalculateSellerRating(seller);
	}
	
	 private void recalculateSellerRating(User seller) {
	        List<SellerRating> ratings = sellerRatingRepository.findBySeller(seller);

	        double avg = ratings.stream()
	            .mapToInt(SellerRating::getRating)
	            .average()
	            .orElse(0.0);

	        SellerProfile profile = sellerProfileRepository.findByUser(seller)
	            .orElseThrow(() -> new RuntimeException("Seller profile not found"));

	        profile.setRating(avg);
	        profile.setRatingCount(ratings.size());
	        sellerProfileRepository.save(profile);
	    }
	 
	 private SellerRatingResponse toResponse(SellerRating rating) {
	        SellerRatingResponse res = new SellerRatingResponse();
	        res.setRatingId(rating.getRatingID());
	        res.setSellerId(rating.getSeller().getUser_id());
	        res.setRaterId(rating.getRater().getUser_id());
	        res.setRating(rating.getRating());
	        res.setRatedAt(rating.getRatedAt());
	        return res;
	    }


}
