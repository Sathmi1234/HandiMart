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
@Table(name = "wish_list")
public class WishList {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wishListId;

	@OneToOne
	@JoinColumn(name = "owner_id", nullable = false, unique = true)
	private User owner;

	@Column(nullable = false)
	private LocalDateTime createdAt = LocalDateTime.now();

	public Long getWishListId() {
		return wishListId;
	}

	public void setWishListId(Long wishListId) {
		this.wishListId = wishListId;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User user) {
		this.owner = user;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	public WishList() {
		
	}
}
