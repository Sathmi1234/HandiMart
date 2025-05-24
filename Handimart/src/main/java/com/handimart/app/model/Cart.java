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

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cart")
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cartId;
	
	@OneToOne
	@JoinColumn(name = "userId", nullable = false)
	private User cartOwner;
	
	@Column(nullable = false)
	private LocalDateTime added_at = LocalDateTime.now();
	
	@Column(nullable = false)
	private LocalDateTime updated_at = LocalDateTime.now();

	public Cart() {
		super();
	}

	public Long getCartId() {
		return cartId;
	}

	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}

	public User getCartOwner() {
		return cartOwner;
	}

	public void setCartOwner(User cartOwner) {
		this.cartOwner = cartOwner;
	}

	public LocalDateTime getAdded_at() {
		return added_at;
	}

	public void setAdded_at(LocalDateTime added_at) {
		this.added_at = added_at;
	}

	public LocalDateTime getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(LocalDateTime updated_at) {
		this.updated_at = updated_at;
	}
	
}
