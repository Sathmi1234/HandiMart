package com.handimart.app.service;

import java.util.List;

import com.handimart.app.request.BidRequest;
import com.handimart.app.response.BidResponse;

public interface BidService {

	BidResponse placeBid(BidRequest request);
	List<BidResponse> getBidsByProductId(Long productId);
	List<BidResponse> getBidsByBidderId(Long bidderId);
}
