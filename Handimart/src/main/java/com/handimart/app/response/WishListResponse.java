package com.handimart.app.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WishListResponse {
    private Long wishListId;
    private Long userId;
    private LocalDateTime createdAt;

}
