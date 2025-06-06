package com.handimart.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handimart.app.model.Cart;
import com.handimart.app.model.CartItem;
import com.handimart.app.model.Product;
import com.handimart.app.model.User;
import com.handimart.app.repository.CartItemRepository;
import com.handimart.app.repository.CartRepository;
import com.handimart.app.repository.ProductRepository;
import com.handimart.app.repository.UserRepository;
import com.handimart.app.request.AddCartItemRequest;
import com.handimart.app.response.CartItemResponse;

@Service
public class CartServiceImp implements CartService{

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private CartItemRepository cartItemRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private UserRepository userRepository;
	    
	public Cart getCartByUser(User user) {
        return cartRepository.findByCartOwner(user)
                .orElseThrow(() -> new RuntimeException("Cart not found for user"));
    }
	
	public Cart getOrCreateCart(User user) {
	    return cartRepository.findByCartOwner(user)
	        .orElseGet(() -> {
	            Cart newCart = new Cart();
	            newCart.setCartOwner(user);
	            return cartRepository.save(newCart);
	        });
	}
	
	@Override
	public List<CartItemResponse> getCartItems(User user) {
		Cart cart = getCartByUser(user);
        List<CartItem> items = cartItemRepository.findByCart(cart);

        return items.stream().map(item -> {
            CartItemResponse response = new CartItemResponse();
            response.setCartItemId(item.getCartItemId());
            response.setProductId(item.getProduct().getProductId());
            response.setQuantity(item.getQuantity());
            return response;
        }).collect(Collectors.toList());
	}

	@Override
	public CartItemResponse addToCart(User user, AddCartItemRequest request) {
		Cart cart = getCartByUser(user);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product)
                .orElse(new CartItem());

        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(request.getQuantity());
        cartItemRepository.save(cartItem);

        CartItemResponse response = new CartItemResponse();
        response.setCartItemId(cartItem.getCartItemId());
        response.setProductId(product.getProductId());
        response.setQuantity(request.getQuantity());
        return response;
	}

	@Override
	public void removeFromCart(User user, Long cartItemId) {
		 CartItem cartItem = cartItemRepository.findById(cartItemId)
	                .orElseThrow(() -> new RuntimeException("CartItem not found"));

	        if (!cartItem.getCart().getCartOwner().getUser_id().equals(user.getUser_id())) {
	            throw new RuntimeException("Unauthorized");
	        }

	        cartItemRepository.delete(cartItem);
		
	}

	@Override
	public void clearCart(User user) {
		Cart cart = getCartByUser(user);
        List<CartItem> items = cartItemRepository.findByCart(cart);
        cartItemRepository.deleteAll(items);
		
	}

}
