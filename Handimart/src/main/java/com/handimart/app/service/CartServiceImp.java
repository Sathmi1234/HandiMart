package com.handimart.app.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handimart.app.model.Cart;
import com.handimart.app.model.User;
import com.handimart.app.repository.CartRepository;
import com.handimart.app.repository.UserRepository;
import com.handimart.app.request.AddCartItemRequest;
import com.handimart.app.response.CartItemResponse;

@Service
public class CartServiceImp implements CartService{

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private UserRepository userRepository;
	
	public Cart getCartByUserId(Long userId) {
		return cartRepository.findByCartOwner(userRepository.findById(userId).get());
	}

	public Cart createCart(Long userId) {
		User user = userRepository.findById(userId).orElseThrow();
        Cart cart = new Cart();
        cart.setCartOwner(user);
        cart.setAdded_at(LocalDateTime.now());
        cart.setUpdated_at(LocalDateTime.now());
        return cartRepository.save(cart);
	}

	@Override
	public void addCartItem(User user, AddCartItemRequest request) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<CartItemResponse> getCartItems(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void removeCartItem(Long cartItemId, User user) {
		// TODO Auto-generated method stub
		
	}

}
