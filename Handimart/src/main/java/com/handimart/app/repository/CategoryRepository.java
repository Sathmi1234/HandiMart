package com.handimart.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.handimart.app.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
