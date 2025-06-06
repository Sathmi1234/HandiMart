package com.handimart.app.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.handimart.app.request.CategoryRequest;
import com.handimart.app.response.CategoryResponse;
import com.handimart.app.service.CategoryService;

@Controller
@RequestMapping("/categories")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;
    
    // Read all
    @GetMapping("/")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
    }
    
    // Read by id
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long id) {
        Optional<CategoryResponse> category = categoryService.getCategoryById(id);
        if (category.isPresent()) {
            return new ResponseEntity<>(category.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // Read by name
    @GetMapping("/name/{name}")
    public ResponseEntity<CategoryResponse> getCategoryByName(@PathVariable String name) {
        Optional<CategoryResponse> category = categoryService.getCategoryByName(name);
        if (category.isPresent()) {
            return new ResponseEntity<>(category.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    

    // Create
    @PostMapping("/")
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody CategoryRequest request) {
        try {
            CategoryResponse createdCategory = categoryService.createCategory(request);
            return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Update
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable Long id, 
                                                         @RequestBody CategoryRequest request) {
        try {
            Optional<CategoryResponse> updatedCategory = categoryService.updateCategory(id, request);
            if (updatedCategory.isPresent()) {
                return new ResponseEntity<>(updatedCategory.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Partial Update (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<CategoryResponse> partialUpdateCategory(@PathVariable Long id, 
                                                                @RequestBody CategoryRequest request) {
        try {
            Optional<CategoryResponse> updatedCategory = categoryService.updateCategory(id, request);
            if (updatedCategory.isPresent()) {
                return new ResponseEntity<>(updatedCategory.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
   
    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        boolean deleted = categoryService.deleteCategory(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}