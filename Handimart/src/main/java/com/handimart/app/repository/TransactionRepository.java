package com.handimart.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.handimart.app.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long>{
	 List<Transaction> findByUser_UserId(Long userId);
	 List<Transaction> findByOrderOrderId(Long orderId);
}
