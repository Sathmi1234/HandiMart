package com.handimart.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.handimart.app.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{

}
