package com.handimart.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.handimart.app.response.OrderItemResponse;
import com.handimart.app.service.OrderItemService;

@RestController
@RequestMapping("/api/order-itemss")
public class OrderItemController {

	@Autowired
	private OrderItemService orderItemService;
	
	@GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderItemResponse>> getOrderItemsByOrderId(@PathVariable Long orderId) {
        List<OrderItemResponse> items = orderItemService.getOrderItemsByOrderId(orderId);
        return ResponseEntity.ok(items);
    }
}
