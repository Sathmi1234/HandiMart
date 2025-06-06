package com.handimart.app.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "wish_list_items")
public class WishListItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wishListItemId;
	
	@ManyToOne
	@JoinColumn(name = "wishListId", nullable = false)
	private WishList wishList;
	
	@OneToOne
	@JoinColumn(name = "productId", nullable = false, unique = true)
	private Product product;
	
	@Column(nullable = false)
	private LocalDateTime addedAt = LocalDateTime.now();

	public Long getWishListItemId() {
		return wishListItemId;
	}

	public void setWishListItemId(Long wishListItemId) {
		this.wishListItemId = wishListItemId;
	}

	public WishList getWishList() {
		return wishList;
	}

	public void setWishList(WishList wishList) {
		this.wishList = wishList;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public LocalDateTime getAddedAt() {
		return addedAt;
	}

	public void setAddedAt(LocalDateTime addedAt) {
		this.addedAt = addedAt;
	}
	
	public WishListItem() {
		
	}
}
