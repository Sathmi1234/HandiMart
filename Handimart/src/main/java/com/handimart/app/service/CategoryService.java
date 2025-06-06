package com.handimart.app.service;

import com.handimart.app.model.Category;
import com.handimart.app.repository.CategoryRepository;
import com.handimart.app.request.CategoryRequest;
import com.handimart.app.response.CategoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    // Read all
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    // Read by id
    public Optional<CategoryResponse> getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(this::convertToResponse);
    }
    
    // Read by name
    public Optional<CategoryResponse> getCategoryByName(String name) {
        return categoryRepository.findByName(name)
                .map(this::convertToResponse);
    }
    
    // Create
    public CategoryResponse createCategory(CategoryRequest request) {
        // Check if category with same name already exists
        if (categoryRepository.existsByName(request.getName())) {
            throw new RuntimeException("Category with name '" + request.getName() + "' already exists");
        }
        
        // Create category entity
        Category category = new Category();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setIconUrl(request.getIconUrl());
        category.setDisplayOrder(request.getDisplayOrder());
        category.setCreatedAt(LocalDateTime.now());
        category.setUpdatedAt(LocalDateTime.now());
        
        // Save and return response
        Category savedCategory = categoryRepository.save(category);
        return convertToResponse(savedCategory);
    }
    
    // Update
    public Optional<CategoryResponse> updateCategory(Long id, CategoryRequest request) {
        Optional<Category> existingCategoryOpt = categoryRepository.findById(id);
        
        if (existingCategoryOpt.isEmpty()) {
            return Optional.empty();
        }
        
        Category existingCategory = existingCategoryOpt.get();
        
        // Check if name is being changed and if new name already exists
        if (request.getName() != null && 
            !request.getName().equals(existingCategory.getName()) && 
            categoryRepository.existsByName(request.getName())) {
            throw new RuntimeException("Category with name '" + request.getName() + "' already exists");
        }
        
        // Update fields
        if (request.getName() != null) {
            existingCategory.setName(request.getName());
        }
        if (request.getDescription() != null) {
            existingCategory.setDescription(request.getDescription());
        }
        if (request.getIconUrl() != null) {
            existingCategory.setIconUrl(request.getIconUrl());
        }
        if (request.getDisplayOrder() != null) {
            existingCategory.setDisplayOrder(request.getDisplayOrder());
        }
        
        existingCategory.setUpdatedAt(LocalDateTime.now());
        
        // Save and return response
        Category updatedCategory = categoryRepository.save(existingCategory);
        return Optional.of(convertToResponse(updatedCategory));
    }
    
    // Delete
    public boolean deleteCategory(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Helper method to convert Category entity to CategoryResponse DTO
    private CategoryResponse convertToResponse(Category category) {
        CategoryResponse response = new CategoryResponse();
        response.setCategoryId(category.getCategoryId());
        response.setName(category.getName());
        response.setDescription(category.getDescription());
        response.setIconUrl(category.getIconUrl());
        response.setDisplayOrder(category.getDisplayOrder());
        response.setCreatedAt(category.getCreatedAt());
        response.setUpdatedAt(category.getUpdatedAt());
        
        return response;
    }
}