package com.handimart.app.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
	private Long orderId;
	private User buyer;
	private LocalDateTime orderDate = LocalDateTime.now();
    private BigDecimal totalAmount;
    private String shippingAddress;
    private LocalDateTime shippedDate;
    private LocalDateTime deliveredDate;
    private String paymentMethod;
    private String paymentTransactionId;
    private String notes;
    private OrderStatus status = OrderStatus.PENDING;
    public enum OrderStatus {
        PENDING, PAID, PROCESSING, SHIPPED, DELIVERED, CANCELLED, RETURNED, REFUNDED
    }
}
