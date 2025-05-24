package com.handimart.app.repository;

import com.handimart.app.model.WishListItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishListItemRepository extends JpaRepository<WishListItem, Long> {
    List<WishListItem> findByWishList_WishListId(Long wishListId);
}
