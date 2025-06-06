package com.handimart.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handimart.app.model.Bid;
import com.handimart.app.model.Product;
import com.handimart.app.model.User;
import com.handimart.app.repository.BidsRepository;
import com.handimart.app.repository.ProductRepository;
import com.handimart.app.repository.UserRepository;
import com.handimart.app.request.BidRequest;
import com.handimart.app.response.BidResponse;

@Service
public class BidServiceImp implements BidService{

	@Autowired
	private BidsRepository bidsRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public BidResponse placeBid(BidRequest request) {
		Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        User bidder = userRepository.findById(request.getBidderId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Bid bid = new Bid();
        bid.setProduct(product);
        bid.setBidder(bidder);
        bid.setBidAmount(request.getBidAmount());

        Bid saved = bidsRepository.save(bid);
        return mapToResponse(saved);
	}

	@Override
	public List<BidResponse> getBidsByProductId(Long productId) {
		 Product product = productRepository.findById(productId)
	                .orElseThrow(() -> new RuntimeException("Product not found"));

	        return bidsRepository.findByProduct(product).stream()
	                .map(this::mapToResponse)
	                .collect(Collectors.toList());
	}

	@Override
	public List<BidResponse> getBidsByBidderId(Long bidderId) {
		 User user = userRepository.findById(bidderId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        return bidsRepository.findByBidder(user).stream()
	                .map(this::mapToResponse)
	                .collect(Collectors.toList());
	}
	
	private BidResponse mapToResponse(Bid bid) {
        BidResponse response = new BidResponse();
        response.setBidId(bid.getBidId());
        response.setProductId(bid.getProduct().getProductId());
        response.setBidderId(bid.getBidder().getUser_id());
        response.setBidAmount(bid.getBidAmount());
        response.setBidTime(bid.getBidTime());
        return response;
    }

}
