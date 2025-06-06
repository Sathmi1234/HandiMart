package com.handimart.app.service;

import com.handimart.app.model.Transaction;
import com.stripe.model.PaymentIntent;

public interface TransactionService {
	Transaction saveTransaction(Transaction transaction);
    Transaction handleStripeWebhook(PaymentIntent paymentIntent);
    Transaction getTransactionById(Long id);
}
