package com.handimart.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.handimart.app.request.BidRequest;
import com.handimart.app.response.BidResponse;
import com.handimart.app.service.BidService;

@RestController
@RequestMapping("/api/bids")
public class BidController {

	@Autowired
	private BidService bidService;
	
	@PostMapping
    public ResponseEntity<BidResponse> placeBid(@RequestBody BidRequest request) {
        return ResponseEntity.ok(bidService.placeBid(request));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<BidResponse>> getBidsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(bidService.getBidsByProductId(productId));
    }

    @GetMapping("/bidder/{bidderId}")
    public ResponseEntity<List<BidResponse>> getBidsByBidder(@PathVariable Long bidderId) {
        return ResponseEntity.ok(bidService.getBidsByBidderId(bidderId));
    }
}
