package com.handimart.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.handimart.app.model.Cart;
import com.handimart.app.model.User;
import com.handimart.app.request.AddCartItemRequest;
import com.handimart.app.response.CartItemResponse;
import com.handimart.app.service.CartService;

@RestController
@RequestMapping("/api/carts")
public class CartController {

	 @Autowired
	    private CartService cartService;

	    @GetMapping
	    public ResponseEntity<List<CartItemResponse>> getCartItems(@AuthenticationPrincipal User user) {
	        List<CartItemResponse> items = cartService.getCartItems(user);
	        return ResponseEntity.ok(items);
	    }

	    @PostMapping("/add")
	    public ResponseEntity<CartItemResponse> addToCart(@AuthenticationPrincipal User user,
	                                                      @RequestBody AddCartItemRequest request) {
	        return ResponseEntity.ok(cartService.addToCart(user, request));
	    }

	    @DeleteMapping("/remove/{cartItemId}")
	    public ResponseEntity<String> removeFromCart(@AuthenticationPrincipal User user,
	                                                 @PathVariable Long cartItemId) {
	        cartService.removeFromCart(user, cartItemId);
	        return ResponseEntity.ok("Item removed from cart");
	    }

	    @DeleteMapping("/clear")
	    public ResponseEntity<String> clearCart(@AuthenticationPrincipal User user) {
	        cartService.clearCart(user);
	        return ResponseEntity.ok("Cart cleared");
	    }
}
