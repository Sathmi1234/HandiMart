package com.handimart.app.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handimart.app.model.Order;
import com.handimart.app.model.OrderItem;
import com.handimart.app.model.Product;
import com.handimart.app.model.User;
import com.handimart.app.repository.OrderRespository;
import com.handimart.app.repository.ProductRepository;
import com.handimart.app.repository.UserRepository;
import com.handimart.app.request.OrderItemRequest;
import com.handimart.app.request.OrderRequest;
import com.handimart.app.response.OrderItemResponse;
import com.handimart.app.response.OrderResponse;

@Service
public class OrderServiceImp implements OrderService{

	@Autowired
	private OrderRespository orderRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ProductRepository productRepository;

	@Override
	public OrderResponse createOrder(OrderRequest request) {
		 User buyer = userRepository.findById(request.getBuyerId()).orElseThrow();
	        Order order = new Order();
	        order.setBuyer(buyer);
	        order.setShippingAddress(request.getShippingAddress());
	        order.setPaymentMethod(request.getPaymentMethod());
	        order.setPaymentTransactionId(request.getPaymentTransactionId());
	        order.setNotes(request.getNotes());
	        order.setStatus(Order.OrderStatus.PENDING);

	        BigDecimal totalAmount = BigDecimal.ZERO;

	        for (OrderItemRequest itemReq : request.getOrderItems()) {
	            Product product = productRepository.findById(itemReq.getProductId()).orElseThrow();
	            BigDecimal subtotal = itemReq.getUnitPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));

	            OrderItem item = new OrderItem(null, order, product, itemReq.getQuantity(), itemReq.getUnitPrice(), subtotal);
	            order.getOrderItems().add(item);
	            totalAmount = totalAmount.add(subtotal);
	        }

	        order.setTotalAmount(totalAmount);
	        order = orderRepository.save(order);

	        return toResponse(order);
	}

	@Override
	public OrderResponse getOrderById(Long id) {
		return orderRepository.findById(id).map(this::toResponse).orElseThrow();
	}

	@Override
	public List<OrderResponse> getAllOrders() {
		return orderRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
	}
	
	private OrderResponse toResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setOrderId(order.getOrderId());
        response.setBuyerId(order.getBuyer().getUser_id());
        response.setOrderDate(order.getOrderDate());
        response.setTotalAmount(order.getTotalAmount());
        response.setShippingAddress(order.getShippingAddress());
        response.setShippedDate(order.getShippedDate());
        response.setDeliveryDate(order.getDeliveredDate());
        response.setPaymentMethod(order.getPaymentMethod());
        response.setPaymentTransactionId(order.getPaymentTransactionId());
        response.setNotes(order.getNotes());
        response.setStatus(order.getStatus());

        List<OrderItemResponse> items = order.getOrderItems().stream().map(item -> {
            OrderItemResponse itemResp = new OrderItemResponse();
            itemResp.setOrderItemId(item.getOrderItemId());
            itemResp.setProductId(item.getProduct().getProductId());
            itemResp.setQuantity(item.getQuantity());
            itemResp.setUnitPrice(item.getUnitPrice());
            itemResp.setSubTotal(item.getSubtotal());
            return itemResp;
        }).collect(Collectors.toList());

        response.setOrderItems(items);
        return response;
    }
}
