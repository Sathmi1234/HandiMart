package com.handimart.app.service;

import java.util.List;

import com.handimart.app.request.OrderRequest;
import com.handimart.app.response.OrderResponse;

public interface OrderService {

	OrderResponse createOrder(OrderRequest request);
	OrderResponse getOrderById(Long id);
	List<OrderResponse> getAllOrders();
}
