package com.handimart.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.handimart.app.model.Cart;
import com.handimart.app.model.CartItem;
import com.handimart.app.model.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long>{

	List<CartItem> findByCart(Cart cart);
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}
