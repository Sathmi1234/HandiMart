package com.handimart.app.service;

import com.handimart.app.model.Product;
import com.handimart.app.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Read all
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    // Read by id
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // Create
    public Product createProduct(Product product) {
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

}