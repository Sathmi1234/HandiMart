package com.handimart.app.repository;

import com.handimart.app.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySellerProductId(Long sellerId);
    List<Product> findByCategoryCategoryId(Long categoryId);
    List<Product> findByStatus(Product.ProductStatus status);
    List<Product> findByFeatured(boolean featured);
}