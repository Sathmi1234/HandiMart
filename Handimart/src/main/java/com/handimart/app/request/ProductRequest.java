package com.handimart.app.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import com.handimart.app.model.Product.ProductStatus;

public class ProductRequest {
    
    private Long sellerId;
    private String title;
    private String description;
    private BigDecimal price;
    private boolean bidEnabled = false;
    private BigDecimal startingBid;
    private LocalDateTime bidEndTime;
    private Long categoryId;
    private String region;
    private Integer inventoryCount = 1;
    private String shippingDetails;
    private boolean featured = false;
    private Set<String> tags;
    private Set<String> imageUrls;
    private ProductStatus status = ProductStatus.DRAFT;

    // Constructors
    public ProductRequest() {}

    // Getters and Setters
    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
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

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
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