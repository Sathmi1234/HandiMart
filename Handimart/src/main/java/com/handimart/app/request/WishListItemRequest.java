package com.handimart.app.request;

import lombok.Data;

@Data
public class WishListItemRequest {
    private Long wishListId;
    private Long productId;
}
