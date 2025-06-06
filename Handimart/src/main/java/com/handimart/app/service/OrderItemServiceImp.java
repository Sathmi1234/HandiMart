package com.handimart.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handimart.app.model.Order;
import com.handimart.app.model.OrderItem;
import com.handimart.app.repository.OrderItemRepository;
import com.handimart.app.repository.OrderRespository;
import com.handimart.app.response.OrderItemResponse;

@Service
public class OrderItemServiceImp implements OrderItemService{
	
	@Autowired
	private OrderItemRepository orderItemRepository;
	
	@Autowired
	private OrderRespository orderRespository;

	@Override
	public List<OrderItemResponse> getOrderItemsByOrderId(Long orderId) {
		Order order = orderRespository.findById(orderId).orElseThrow(() -> 
        new RuntimeException("Order not found with ID: " + orderId)
    );

    return order.getOrderItems().stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
	}
	
	 private OrderItemResponse mapToResponse(OrderItem item) {
	        OrderItemResponse response = new OrderItemResponse();
	        response.setOrderItemId(item.getOrderItemId());
	        response.setProductId(item.getProduct().getProductId());
	        response.setQuantity(item.getQuantity());
	        response.setUnitPrice(item.getUnitPrice());
	        response.setSubTotal(item.getSubtotal());
	        return response;
	    }

}
