package com.handimart.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.handimart.app.model.Order;

public interface OrderRespository extends JpaRepository<Order, Long>{

}
