package com.handimart.app.repository;

import com.handimart.app.model.Cart;
import com.handimart.app.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
	Cart findByCartOwner(User user);
}
