package com.handimart.app.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handimart.app.model.Cart;
import com.handimart.app.model.CartItem;
import com.handimart.app.model.Product;
import com.handimart.app.repository.CartItemRepository;
import com.handimart.app.repository.CartRepository;
import com.handimart.app.repository.ProductRepository;
import com.handimart.app.request.CartItemRequest;

@Service
public class CartItemServiceImp implements CartItemService{

	@Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;
    
	@Override
	public CartItem addCartItem(CartItemRequest request) {
		 Cart cart = cartRepository.findById(request.getCartId()).orElseThrow();
	     Product product = productRepository.findById(request.getProductId()).orElseThrow();
	     CartItem item = new CartItem();
	     item.setCart(cart);
	     item.setProduct(product);
	     item.setQuantity(request.getQuantity());
	     item.setAddedAt(LocalDateTime.now());
	     return cartItemRepository.save(item);
	}

	@Override
	public List<CartItem> getCartItemsByCartId(Long cartId) {
		 return cartItemRepository.findByCart(cartRepository.findById(cartId).get());
	}

	@Override
	public void removeCartItem(Long cartItemId) {
		cartItemRepository.deleteById(cartItemId);
		
	}

}
