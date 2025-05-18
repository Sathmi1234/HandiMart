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
    
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
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

    
	public Product() {
		
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public User getSeller() {
		return seller;
	}

	public void setSeller(User seller) {
		this.seller = seller;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public boolean isBidEnabled() {
		return bidEnabled;
	}

	public void setBidEnabled(boolean bidEnabled) {
		this.bidEnabled = bidEnabled;
	}

	public BigDecimal getStartingBid() {
		return startingBid;
	}

	public void setStartingBid(BigDecimal startingBid) {
		this.startingBid = startingBid;
	}

	public LocalDateTime getBidEndTime() {
		return bidEndTime;
	}

	public void setBidEndTime(LocalDateTime bidEndTime) {
		this.bidEndTime = bidEndTime;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public Integer getInventoryCount() {
		return inventoryCount;
	}

	public void setInventoryCount(Integer inventoryCount) {
		this.inventoryCount = inventoryCount;
	}

	public String getShippingDetails() {
		return shippingDetails;
	}

	public void setShippingDetails(String shippingDetails) {
		this.shippingDetails = shippingDetails;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public boolean isFeatured() {
		return featured;
	}

	public void setFeatured(boolean featured) {
		this.featured = featured;
	}

	public BigDecimal getAvgRating() {
		return avgRating;
	}

	public void setAvgRating(BigDecimal avgRating) {
		this.avgRating = avgRating;
	}

	public Integer getTotalReviews() {
		return totalReviews;
	}

	public void setTotalReviews(Integer totalReviews) {
		this.totalReviews = totalReviews;
	}

	public Set<String> getTags() {
		return tags;
	}

	public void setTags(Set<String> tags) {
		this.tags = tags;
	}

	public Set<String> getImageUrls() {
		return imageUrls;
	}

	public void setImageUrls(Set<String> imageUrls) {
		this.imageUrls = imageUrls;
	}

	public ProductStatus getStatus() {
		return status;
	}

	public void setStatus(ProductStatus status) {
		this.status = status;
	}
    
    
}
