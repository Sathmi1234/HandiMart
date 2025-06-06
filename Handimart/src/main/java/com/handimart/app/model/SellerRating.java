package com.handimart.app.model;

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

@Entity
@Table(name = "seller_ratings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellerRating {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ratingID;
	
	@ManyToOne
	@JoinColumn(name = "seller_id", nullable = false)
	private User seller;
	
	@ManyToOne
	@JoinColumn(name = "rater_id", nullable = false)
	private User rater;
	
	@Column(nullable = false)
	private Integer rating;
	
	@Column(nullable = false)
	private LocalDateTime ratedAt = LocalDateTime.now();

	public Long getRatingID() {
		return ratingID;
	}

	public void setRatingID(Long ratingID) {
		this.ratingID = ratingID;
	}

	public User getSeller() {
		return seller;
	}

	public void setSeller(User seller) {
		this.seller = seller;
	}

	public User getRater() {
		return rater;
	}

	public void setRater(User rater) {
		this.rater = rater;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public LocalDateTime getRatedAt() {
		return ratedAt;
	}

	public void setRatedAt(LocalDateTime ratedAt) {
		this.ratedAt = ratedAt;
	}


	
	
}
