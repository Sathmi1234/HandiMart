package com.handimart.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.handimart.app.model.SellerRating;
import com.handimart.app.model.User;

public interface SellerRatingRepository extends JpaRepository<SellerRating, Long>{
	Optional<SellerRating> findBySellerAndRater(User seller, User rater);
	List<SellerRating> findBySeller(User seller);
}
