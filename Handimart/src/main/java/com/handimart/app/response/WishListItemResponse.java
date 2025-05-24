package com.handimart.app.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WishListItemResponse {
    private Long wishListItemId;
    private Long wishListId;
    private Long productId;
    private String productName;
    private LocalDateTime addedAt;
}
