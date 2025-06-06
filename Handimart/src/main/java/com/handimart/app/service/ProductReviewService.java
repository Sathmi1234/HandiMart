package com.handimart.app.service;

import com.handimart.app.model.ProductReview;
import com.handimart.app.model.Product;
import com.handimart.app.model.User;
import com.handimart.app.request.ProductReviewRequest;
import com.handimart.app.response.ProductReviewResponse;
import com.handimart.app.repository.ProductReviewRepository;
import com.handimart.app.repository.ProductRepository;
import com.handimart.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductReviewService {
    
    @Autowired
    private ProductReviewRepository productReviewRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    // Read all
    public List<ProductReviewResponse> getAllProductReviews() {
        return productReviewRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    // Read by id
    public Optional<ProductReviewResponse> getProductReviewById(Long id) {
        return productReviewRepository.findById(id)
                .map(this::convertToResponse);
    }
    
    // Create
    public ProductReviewResponse createProductReview(ProductReviewRequest request) {
        // Fetch product and reviewer from database
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + request.getProductId()));
        
        User reviewer = userRepository.findById(request.getReviewerId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + request.getReviewerId()));
        
        
        // Create product review entity
        ProductReview productReview = new ProductReview();
        productReview.setProduct(product);
        productReview.setReviwer(reviewer);
        productReview.setRating(request.getRating());
        productReview.setComment(request.getComment());
        productReview.setReviewDate(LocalDateTime.now());
        productReview.setHelpfulVotes(0); // Initialize with 0 helpful votes
        
        // Save and return response
        ProductReview savedProductReview = productReviewRepository.save(productReview);
        return convertToResponse(savedProductReview);
    }
    
    // Update
    public Optional<ProductReviewResponse> updateProductReview(Long id, ProductReviewRequest request) {
        Optional<ProductReview> existingReviewOpt = productReviewRepository.findById(id);
        
        if (existingReviewOpt.isEmpty()) {
            return Optional.empty();
        }
        
        ProductReview existingReview = existingReviewOpt.get();
        
        // Update product if provided and different
        if (request.getProductId() != null && 
            !request.getProductId().equals(existingReview.getProduct().getProductId())) {
            Product product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + request.getProductId()));
            existingReview.setProduct(product);
        }
        
        // Update reviewer if provided and different
        if (request.getReviewerId() != null && 
            !request.getReviewerId().equals(existingReview.getReviwer().getUser_id())) {
            User reviewer = userRepository.findById(request.getReviewerId())
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + request.getReviewerId()));
            existingReview.setReviwer(reviewer);
        }
        
        // Update other fields
        if (request.getRating() != null) {
            existingReview.setRating(request.getRating());
        }
        if (request.getComment() != null) {
            existingReview.setComment(request.getComment());
        }
        if (request.getHelpfulVotes() != null) {
            existingReview.setHelpfulVotes(request.getHelpfulVotes());
        }
        
        // Save and return response
        ProductReview updatedReview = productReviewRepository.save(existingReview);
        return Optional.of(convertToResponse(updatedReview));
    }
    
    // Delete
    public boolean deleteProductReview(Long id) {
        if (productReviewRepository.existsById(id)) {
            productReviewRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Helper method to convert ProductReview entity to ProductReviewResponse DTO
    private ProductReviewResponse convertToResponse(ProductReview productReview) {
        ProductReviewResponse response = new ProductReviewResponse();
        response.setReviewId(productReview.getReviewId());
        response.setRating(productReview.getRating());
        response.setComment(productReview.getComment());
        response.setReviewDate(productReview.getReviewDate());
        response.setHelpfulVotes(productReview.getHelpfulVotes());
        
        // Set product summary
        if (productReview.getProduct() != null) {
            ProductReviewResponse.ProductSummary productSummary = new ProductReviewResponse.ProductSummary();
            productSummary.setProductId(productReview.getProduct().getProductId());
            productSummary.setTitle(productReview.getProduct().getTitle());
            productSummary.setPrice(productReview.getProduct().getPrice());
            response.setProduct(productSummary);
        }
        
        // Set reviewer summary
        if (productReview.getReviwer() != null) {
            ProductReviewResponse.UserSummary reviewerSummary = new ProductReviewResponse.UserSummary();
            reviewerSummary.setUserId(productReview.getReviwer().getUser_id());
            reviewerSummary.setUsername(productReview.getReviwer().getUsername());
            reviewerSummary.setEmail(productReview.getReviwer().getEmail());
            response.setReviewer(reviewerSummary);
        }
        
        return response;
    }
}