package com.handimart.app.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "categories")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    private Long categoryId;
    private String name;
    private String description;
    private String iconUrl;
    private Integer displayOrder;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;
    
}
