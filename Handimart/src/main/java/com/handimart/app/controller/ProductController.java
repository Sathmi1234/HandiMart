package com.handimart.app.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.handimart.app.request.ProductRequest;
import com.handimart.app.response.ProductResponse;
import com.handimart.app.service.ProductService;

@Controller
@RequestMapping("/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    // Read all
    @GetMapping("/")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }
    
    // Read by id
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        Optional<ProductResponse> product = productService.getProductById(id);
        if (product.isPresent()) {
            return new ResponseEntity<>(product.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // Create
    @PostMapping("/")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductRequest request) {
        try {
            ProductResponse createdProduct = productService.createProduct(request);
            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Update
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id, 
                                                       @RequestBody ProductRequest request) {
        try {
            Optional<ProductResponse> updatedProduct = productService.updateProduct(id, request);
            if (updatedProduct.isPresent()) {
                return new ResponseEntity<>(updatedProduct.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Partial Update (PATCH)
    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<ProductResponse> partialUpdateProduct(@PathVariable Long id, 
                                                              @RequestBody ProductRequest request) {
        try {
            Optional<ProductResponse> updatedProduct = productService.updateProduct(id, request);
            if (updatedProduct.isPresent()) {
                return new ResponseEntity<>(updatedProduct.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Delete
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        boolean deleted = productService.deleteProduct(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}