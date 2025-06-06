package com.handimart.app.repository;

import com.handimart.app.model.Cart;
import com.handimart.app.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
	Optional<Cart> findByCartOwner(User user);
}
