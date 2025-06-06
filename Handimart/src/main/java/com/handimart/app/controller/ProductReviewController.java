package com.handimart.app.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.handimart.app.request.ProductReviewRequest;
import com.handimart.app.response.ProductReviewResponse;
import com.handimart.app.service.ProductReviewService;

@Controller
@RequestMapping("/product-reviews")
public class ProductReviewController {
    
    @Autowired
    private ProductReviewService productReviewService;
    
    // Read all
    @GetMapping("/")
    public ResponseEntity<List<ProductReviewResponse>> getAllProductReviews() {
        return new ResponseEntity<>(productReviewService.getAllProductReviews(), HttpStatus.OK);
    }
    
    // Read by id
    @GetMapping("/{id}")
    public ResponseEntity<ProductReviewResponse> getProductReviewById(@PathVariable Long id) {
        Optional<ProductReviewResponse> review = productReviewService.getProductReviewById(id);
        if (review.isPresent()) {
            return new ResponseEntity<>(review.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Create
    @PostMapping("/")
    public ResponseEntity<ProductReviewResponse> createProductReview(@RequestBody ProductReviewRequest request) {
        try {
            ProductReviewResponse createdReview = productReviewService.createProductReview(request);
            return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Update
    @PutMapping("/{id}")
    public ResponseEntity<ProductReviewResponse> updateProductReview(@PathVariable Long id, 
                                                                   @RequestBody ProductReviewRequest request) {
        try {
            Optional<ProductReviewResponse> updatedReview = productReviewService.updateProductReview(id, request);
            if (updatedReview.isPresent()) {
                return new ResponseEntity<>(updatedReview.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Partial Update (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<ProductReviewResponse> partialUpdateProductReview(@PathVariable Long id, 
                                                                          @RequestBody ProductReviewRequest request) {
        try {
            Optional<ProductReviewResponse> updatedReview = productReviewService.updateProductReview(id, request);
            if (updatedReview.isPresent()) {
                return new ResponseEntity<>(updatedReview.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductReview(@PathVariable Long id) {
        boolean deleted = productReviewService.deleteProductReview(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}