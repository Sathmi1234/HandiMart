package com.handimart.app.service;

import java.util.List;

import com.handimart.app.model.User;
import com.handimart.app.request.AddCartItemRequest;
import com.handimart.app.response.CartItemResponse;

public interface CartService {

	void addCartItem(User user, AddCartItemRequest request);
    List<CartItemResponse> getCartItems(User user);
    void removeCartItem(Long cartItemId, User user);
}
