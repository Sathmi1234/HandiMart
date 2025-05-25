package com.handimart.app.service;

import java.util.List;

import com.handimart.app.response.OrderItemResponse;

public interface OrderItemService {

	List<OrderItemResponse> getOrderItemsByOrderId(Long orderId);
}
