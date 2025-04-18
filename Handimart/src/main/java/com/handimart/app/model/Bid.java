package com.handimart.app.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bids")
public class Bid {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bidId;
	
	@ManyToOne
	@JoinColumn(name = "productId", nullable = false)
	private Product product;
	
	@ManyToOne
	@JoinColumn(name = "bidderId", nullable = false)
	private User bidder;
	
	@Column(nullable = false)
	private BigDecimal bidAmount;
	
	@Column(nullable = false)
	private LocalDateTime bidTime = LocalDateTime.now();
}
