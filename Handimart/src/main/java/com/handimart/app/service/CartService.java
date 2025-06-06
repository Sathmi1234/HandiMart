package com.handimart.app.service;

import java.util.List;

import com.handimart.app.model.User;
import com.handimart.app.request.AddCartItemRequest;
import com.handimart.app.response.CartItemResponse;

public interface CartService {

	List<CartItemResponse> getCartItems(User user);
    CartItemResponse addToCart(User user, AddCartItemRequest request);
    void removeFromCart(User user, Long cartItemId);
    void clearCart(User user);
}
