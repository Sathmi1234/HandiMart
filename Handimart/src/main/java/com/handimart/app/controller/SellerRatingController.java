package com.handimart.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.handimart.app.request.SellerRatingRequest;
import com.handimart.app.response.SellerRatingResponse;
import com.handimart.app.service.SellerRatingService;

import java.util.List;

@RestController
@RequestMapping("/api/seller-ratings")
public class SellerRatingController {

    @Autowired
    private SellerRatingService ratingService;

    @PostMapping
    public ResponseEntity<SellerRatingResponse> rateSeller(@RequestBody SellerRatingRequest request) {
        return ResponseEntity.ok(ratingService.rateSeller(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SellerRatingResponse> getRating(@PathVariable Long id) {
        return ResponseEntity.ok(ratingService.getRatingById(id));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<SellerRatingResponse>> getRatingsBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(ratingService.getRatingsBySeller(sellerId));
    }

    @GetMapping
    public ResponseEntity<List<SellerRatingResponse>> getAllRatings() {
        return ResponseEntity.ok(ratingService.getAllRatings());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SellerRatingResponse> updateRating(@PathVariable Long id, @RequestParam Integer rating) {
        return ResponseEntity.ok(ratingService.updateRating(id, rating));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long id) {
        ratingService.deleteRating(id);
        return ResponseEntity.noContent().build();
    }
}