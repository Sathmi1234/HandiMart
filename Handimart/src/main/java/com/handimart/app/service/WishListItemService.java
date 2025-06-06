package com.handimart.app.service;

import com.handimart.app.request.WishListItemRequest;
import com.handimart.app.response.WishListItemResponse;
import com.handimart.app.response.WishListResponse;

import java.util.List;

public interface WishListItemService {
    WishListItemResponse addWishListItem(WishListItemRequest request);
    List<WishListItemResponse> getItemsByWIshListId(Long wishListId);
    void removeWishListItem(Long wishListItemId);
}
