package com.handimart.app.service;

import com.handimart.app.model.Product;
import com.handimart.app.model.User;
import com.handimart.app.model.Category;
import com.handimart.app.request.ProductRequest;
import com.handimart.app.response.ProductResponse;
import com.handimart.app.repository.ProductRepository;
import com.handimart.app.repository.UserRepository;
import com.handimart.app.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    // Read all
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    // Read by id
    public Optional<ProductResponse> getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::convertToResponse);
    }
    
    // Create
    public ProductResponse createProduct(ProductRequest request) {
        // Fetch seller and category from database
        User seller = userRepository.findById(request.getSellerId())
                .orElseThrow(() -> new RuntimeException("Seller not found with id: " + request.getSellerId()));
        
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));
        
        // Create product entity
        Product product = new Product();
        product.setSeller(seller);
        product.setCategory(category);
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setBidEnabled(request.isBidEnabled());
        product.setStartingBid(request.getStartingBid());
        product.setBidEndTime(request.getBidEndTime());
        product.setRegion(request.getRegion());
        product.setInventoryCount(request.getInventoryCount());
        product.setShippingDetails(request.getShippingDetails());
        product.setFeatured(request.isFeatured());
        product.setTags(request.getTags());
        product.setImageUrls(request.getImageUrls());
        product.setStatus(request.getStatus());
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        
        // Save and return response
        Product savedProduct = productRepository.save(product);
        return convertToResponse(savedProduct);
    }
    
    // Helper method to convert Product entity to ProductResponse DTO
    private ProductResponse convertToResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setProductId(product.getProductId());
        response.setTitle(product.getTitle());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setBidEnabled(product.isBidEnabled());
        response.setStartingBid(product.getStartingBid());
        response.setBidEndTime(product.getBidEndTime());
        response.setRegion(product.getRegion());
        response.setInventoryCount(product.getInventoryCount());
        response.setShippingDetails(product.getShippingDetails());
        response.setCreatedAt(product.getCreatedAt());
        response.setUpdatedAt(product.getUpdatedAt());
        response.setFeatured(product.isFeatured());
        response.setAvgRating(product.getAvgRating());
        response.setTotalReviews(product.getTotalReviews());
        response.setTags(product.getTags());
        response.setImageUrls(product.getImageUrls());
        response.setStatus(product.getStatus());
        
        // Set seller summary
        if (product.getSeller() != null) {
            ProductResponse.UserSummary sellerSummary = new ProductResponse.UserSummary();
            sellerSummary.setUserId(product.getSeller().getUser_id());
            sellerSummary.setUsername(product.getSeller().getUsername());
            sellerSummary.setEmail(product.getSeller().getEmail());
            response.setSeller(sellerSummary);
        }
        
        // Set category summary
        if (product.getCategory() != null) {
            ProductResponse.CategorySummary categorySummary = new ProductResponse.CategorySummary();
            categorySummary.setCategoryId(product.getCategory().getCategoryId());
            categorySummary.setName(product.getCategory().getName());
            categorySummary.setDescription(product.getCategory().getDescription());
            response.setCategory(categorySummary);
        }
        
        return response;
    }
}