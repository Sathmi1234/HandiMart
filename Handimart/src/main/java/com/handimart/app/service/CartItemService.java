package com.handimart.app.service;

import java.util.List;

import com.handimart.app.model.CartItem;
import com.handimart.app.request.CartItemRequest;

public interface CartItemService {

	CartItem addCartItem(CartItemRequest request);
    List<CartItem> getCartItemsByCartId(Long cartId);
    void removeCartItem(Long cartItemId);
}
