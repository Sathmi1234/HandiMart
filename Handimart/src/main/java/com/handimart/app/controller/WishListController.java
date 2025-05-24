package com.handimart.app.controller;

import com.handimart.app.request.WishListRequest;
import com.handimart.app.response.WishListResponse;
import com.handimart.app.service.WishListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
public class WishListController {

    @Autowired
    private WishListService wishListService;

    @PostMapping
    public WishListResponse createWishList(@RequestBody WishListRequest request){
        return wishListService.createWishList(request);
    }

    @GetMapping("/user/{userId}")
    public WishListResponse getWishListByUserId(@PathVariable("userId") Long user_id){
        return wishListService.getWishListByUserId(user_id);
    }
}
