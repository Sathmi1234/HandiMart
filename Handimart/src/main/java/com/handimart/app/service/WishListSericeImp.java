package com.handimart.app.service;

import com.handimart.app.model.User;
import com.handimart.app.model.WishList;
import com.handimart.app.repository.UserRepository;
import com.handimart.app.repository.WishListRepository;
import com.handimart.app.request.WishListRequest;
import com.handimart.app.response.WishListResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class WishListSericeImp implements WishListService{

    @Autowired
    private WishListRepository wishListRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public WishListResponse createWishList(WishListRequest request) {
        User user  = userRepository.findById(request.getUser_id())
                .orElseThrow(() -> new NoSuchElementException(("User not found")));
        WishList wishList = new WishList();
        wishList.setOwner(user);
        WishList saved = wishListRepository.save(wishList);

        return mapToResponse(saved);
    }

    @Override
    public WishListResponse getWishListByUserId(Long userId) {
        WishList wishList = wishListRepository.findByOwner_UserId(userId)
                .orElseThrow(() -> new NoSuchElementException("WIshlist not found"));
        return mapToResponse(wishList);
    }

    private WishListResponse mapToResponse(WishList wishList) {
        WishListResponse response = new WishListResponse();
        response.setWishListId(wishList.getWishListId());
        response.setUserId(wishList.getOwner().getUser_id());
        response.setCreatedAt(wishList.getCreatedAt());
        return response;
    }
}
