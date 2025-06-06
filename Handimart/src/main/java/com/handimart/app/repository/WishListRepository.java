package com.handimart.app.repository;

import com.handimart.app.model.WishList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface WishListRepository extends JpaRepository<WishList, Long> {
    Optional<WishList> findByOwner_UserId(Long userId);
}
