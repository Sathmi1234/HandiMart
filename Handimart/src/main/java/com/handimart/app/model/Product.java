package com.handimart.app.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
	private Long productId;
	private User seller;
	private String title;
	private String description;
	private BigDecimal price;
	private boolean bidEnabled = false;
	private BigDecimal startingBid;    
    private LocalDateTime bidEndTime;
    private String category;
    private String region;
    private Integer inventoryCount = 1;
    private String shippingDetails;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
    private boolean featured = false;
    private BigDecimal avgRating;
    private Integer totalReviews = 0;
    private Set<String> tags;
    private Set<String> imageUrls;
    private ProductStatus status = ProductStatus.DRAFT;
    
    public enum ProductStatus {
        DRAFT, ACTIVE, SOLD_OUT, ARCHIVED, UNDER_REVIEW
    }
}
