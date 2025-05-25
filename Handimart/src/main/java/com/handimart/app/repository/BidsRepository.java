package com.handimart.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.handimart.app.model.Bid;
import com.handimart.app.model.Product;
import com.handimart.app.model.User;

public interface BidsRepository  extends JpaRepository<Bid, Long>{

	List<Bid> findByProduct(Product product);
	List<Bid> findByBidder(User bidder);
}
