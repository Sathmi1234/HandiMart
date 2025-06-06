package com.handimart.app.request;

import java.util.List;

import lombok.Data;

@Data
public class OrderRequest {

	private Long buyerId;
	private String shippingAddress;
	private String paymentMethod;
	private String paymentTransactionId;
	private String notes;
	private List<OrderItemRequest> orderItems;
	public Long getBuyerId() {
		return buyerId;
	}
	public void setBuyerId(Long buyerId) {
		this.buyerId = buyerId;
	}
	public String getShippingAddress() {
		return shippingAddress;
	}
	public void setShippingAddress(String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}
	public String getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	public String getPaymentTransactionId() {
		return paymentTransactionId;
	}
	public void setPaymentTransactionId(String paymentTransactionId) {
		this.paymentTransactionId = paymentTransactionId;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public List<OrderItemRequest> getOrderItems() {
		return orderItems;
	}
	public void setOrderItems(List<OrderItemRequest> orderItems) {
		this.orderItems = orderItems;
	}
	
	public OrderRequest() {
	}
	
	
}
