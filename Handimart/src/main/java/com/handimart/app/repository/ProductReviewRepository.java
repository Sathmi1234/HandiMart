package com.handimart.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.handimart.app.model.ProductReview;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {

}
