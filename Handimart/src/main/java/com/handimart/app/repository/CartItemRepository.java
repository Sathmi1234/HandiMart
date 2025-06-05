package com.handimart.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.handimart.app.model.Cart;
import com.handimart.app.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long>{

	List<CartItem> findByCart(Cart cart);
}
