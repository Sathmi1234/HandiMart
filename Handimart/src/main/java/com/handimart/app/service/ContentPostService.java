package com.handimart.app.service;

import com.handimart.app.model.ContentPost;
import com.handimart.app.model.Product;
import com.handimart.app.repository.ContentPostRepository;
import com.handimart.app.repository.ProductRepository;
import com.handimart.app.request.ContentPostRequest;
import com.handimart.app.response.ContentPostResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ContentPostService {
    
    @Autowired
    private ContentPostRepository contentPostRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    // Read all
    public List<ContentPostResponse> getAllContentPosts() {
        return contentPostRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    // Read by id
    public Optional<ContentPostResponse> getContentPostById(Long id) {
        return contentPostRepository.findById(id)
                .map(this::convertToResponse);
    }
    
    // Create
    public ContentPostResponse createContentPost(ContentPostRequest request) {
        // Check if product exists
        Optional<Product> productOpt = productRepository.findById(request.getProductId());
        if (productOpt.isEmpty()) {
            throw new RuntimeException("Product with id '" + request.getProductId() + "' not found");
        }
        

        
        // Create content post entity
        ContentPost contentPost = new ContentPost();
        contentPost.setTitle(request.getTitle());
        contentPost.setDescription(request.getDescription());
        contentPost.setProduct(productOpt.get());
        contentPost.setCreatedAt(LocalDateTime.now());
        
        // Save and return response
        ContentPost savedContentPost = contentPostRepository.save(contentPost);
        return convertToResponse(savedContentPost);
    }
    
    // Update
    public Optional<ContentPostResponse> updateContentPost(Long id, ContentPostRequest request) {
        Optional<ContentPost> existingContentPostOpt = contentPostRepository.findById(id);
        
        if (existingContentPostOpt.isEmpty()) {
            return Optional.empty();
        }
        
        ContentPost existingContentPost = existingContentPostOpt.get();
        
        // Check if product is being changed and if it exists
        if (request.getProductId() != null && 
            !request.getProductId().equals(existingContentPost.getProduct().getProductId())) {
            
            Optional<Product> productOpt = productRepository.findById(request.getProductId());
            if (productOpt.isEmpty()) {
                throw new RuntimeException("Product with id '" + request.getProductId() + "' not found");
            }
            
            existingContentPost.setProduct(productOpt.get());
        }
        
        // Update fields
        if (request.getTitle() != null) {
            existingContentPost.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            existingContentPost.setDescription(request.getDescription());
        }
        
        // Save and return response
        ContentPost updatedContentPost = contentPostRepository.save(existingContentPost);
        return Optional.of(convertToResponse(updatedContentPost));
    }
    
    // Delete
    public boolean deleteContentPost(Long id) {
        if (contentPostRepository.existsById(id)) {
            contentPostRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Helper method to convert ContentPost entity to ContentPostResponse DTO
    private ContentPostResponse convertToResponse(ContentPost contentPost) {
        ContentPostResponse response = new ContentPostResponse();
        response.setContentPostId(contentPost.getContentPostId());
        response.setTitle(contentPost.getTitle());
        response.setDescription(contentPost.getDescription());
        response.setProductId(contentPost.getProduct().getProductId());
        response.setCreatedAt(contentPost.getCreatedAt());
        
        return response;
    }
}