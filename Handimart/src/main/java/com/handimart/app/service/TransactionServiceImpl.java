package com.handimart.app.service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handimart.app.model.Transaction;
import com.handimart.app.model.Transaction.TransactionStatus;
import com.handimart.app.model.Transaction.TransactionType;
import com.handimart.app.repository.TransactionRepository;
import com.stripe.model.PaymentIntent;

@Service
public class TransactionServiceImpl implements TransactionService{

	@Autowired
    private TransactionRepository transactionRepository;
	
	@Override
	public Transaction saveTransaction(Transaction transaction) {
		return transactionRepository.save(transaction);
	}

	@Override
	public Transaction handleStripeWebhook(PaymentIntent paymentIntent) {
		Transaction transaction = new Transaction();
        transaction.setAmount(new BigDecimal(paymentIntent.getAmount()).movePointLeft(2)); // Stripe uses cents
        transaction.setStatus(TransactionStatus.COMPLETED);
        transaction.setType(TransactionType.PAYMENT);
        transaction.setPaymentMethod(paymentIntent.getPaymentMethod());
        transaction.setTransactionDate(paymentIntent.getCreated() != null ?
            java.time.Instant.ofEpochSecond(paymentIntent.getCreated()).atZone(java.time.ZoneId.systemDefault()).toLocalDateTime()
            : java.time.LocalDateTime.now());
        transaction.setNotes("Stripe PaymentIntent ID: " + paymentIntent.getId());

        // map PaymentIntent's customer or metadata to user/order here
        // example:
        // User user = userService.findByStripeCustomerId(paymentIntent.getCustomer());
        // transaction.setUser(user);

        return transactionRepository.save(transaction);
	}

	@Override
	public Transaction getTransactionById(Long id) {
		return transactionRepository.findById(id).orElse(null);
	}

}
