package com.handimart.app.service;

import com.handimart.app.request.WishListRequest;
import com.handimart.app.response.WishListResponse;

public interface WishListService {
    WishListResponse createWishList(WishListRequest request);
    WishListResponse getWishListByUserId(Long userId);
}
