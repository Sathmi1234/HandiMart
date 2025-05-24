package com.handimart.app.controller;

import com.handimart.app.request.WishListItemRequest;
import com.handimart.app.response.WishListItemResponse;
import com.handimart.app.service.WishListItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist-items")
public class WIshListItemController {

    @Autowired
    private WishListItemService wishListItemService;

    @PostMapping
    public WishListItemResponse addItem(@RequestBody WishListItemRequest request){
        return wishListItemService.addWishListItem(request);
    }

    @GetMapping("wishlist/{wishlistId}")
    public List<WishListItemResponse> getItems(@PathVariable("wishlistId") Long wishListId){
        return wishListItemService.getItemsByWIshListId(wishListId);
    }

    @DeleteMapping("/{wishListItemId}")
    public void removeItem(@PathVariable("wishListItemId") Long wishListItemId){
        wishListItemService.removeWishListItem(wishListItemId);
    }
}
