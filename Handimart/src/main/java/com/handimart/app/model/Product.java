package com.handimart.app.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
@Table(name = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    
    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    private boolean bidEnabled = false;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal startingBid;
    
    private LocalDateTime bidEndTime;
    
    @Column(nullable = false)
    private String category;
    
    private String region;
    
    @Column(nullable = false)
    private Integer inventoryCount = 1;
    
    @Column(columnDefinition = "TEXT")
    private String shippingDetails;
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    private boolean featured = false;
    
    @Column(precision = 3, scale = 2)
    private BigDecimal avgRating;
    
    private Integer totalReviews = 0;

    @ElementCollection
    @CollectionTable(
        name = "product_tags",
        joinColumns = @JoinColumn(name = "product_id")
    )
    @Column(name = "tag")
    private Set<String> tags;
    
    @ElementCollection
    @CollectionTable(
        name = "product_images",
        joinColumns = @JoinColumn(name = "product_id")
    )
    @Column(name = "image_url")
    private Set<String> imageUrls;
    
    @Enumerated(EnumType.STRING)
    private ProductStatus status = ProductStatus.DRAFT;
    
    public enum ProductStatus {
        DRAFT, ACTIVE, SOLD_OUT, ARCHIVED, UNDER_REVIEW
    }
}
