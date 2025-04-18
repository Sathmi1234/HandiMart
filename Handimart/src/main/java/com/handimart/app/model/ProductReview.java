package com.handimart.app.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product_review")
public class ProductReview {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewId;
	
	@OneToOne
	@JoinColumn(name = "productId", nullable = false, unique = true)
	private Product product;
	
	@OneToOne
	@JoinColumn(name = "userId", nullable = false, unique = true)
	private User reviwer;
	
	@Column(nullable = false)
	private Integer rating;
	
	@Column(columnDefinition = "TEXT")
	private String comment;
	
	@Column(nullable = false)
	private LocalDateTime reviewDate = LocalDateTime.now();
	
	private Integer helpfulVotes;
}
