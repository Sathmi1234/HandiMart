package com.handimart.app.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "content_post")
public class ContentPost {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long contentPostId;
	
	@OneToMany(mappedBy = "contentPost", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ContentUrl> urls = new ArrayList<>();
	
	@OneToOne
	@JoinColumn(name = "productId", nullable = false, unique = true)
	private Product product;
	
	@Column(nullable = false)
	private String title;
	
	@Column(columnDefinition = "TEXT")
	private String description;
	
	@Column(nullable = false)
	private LocalDateTime createdAt = LocalDateTime.now();
	
	
}
