package com.handimart.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.handimart.app.model.CartItem;
import com.handimart.app.request.CartItemRequest;
import com.handimart.app.service.CartItemService;

@RestController
@RequestMapping("/api/cart-items")
public class CartItemController {

	@Autowired
    private CartItemService cartItemService;

    @PostMapping
    public CartItem addCartItem(@RequestBody CartItemRequest request) {
        return cartItemService.addCartItem(request);
    }

    @GetMapping("/{cartId}")
    public List<CartItem> getCartItems(@PathVariable Long cartId) {
        return cartItemService.getCartItemsByCartId(cartId);
    }

    @DeleteMapping("/{cartItemId}")
    public void deleteCartItem(@PathVariable Long cartItemId) {
        cartItemService.removeCartItem(cartItemId);
    }
}
