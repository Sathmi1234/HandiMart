package com.handimart.app.service;

import com.handimart.app.model.Product;
import com.handimart.app.model.WishList;
import com.handimart.app.model.WishListItem;
import com.handimart.app.repository.ProductRepository;
import com.handimart.app.repository.WishListItemRepository;
import com.handimart.app.repository.WishListRepository;
import com.handimart.app.request.WishListItemRequest;
import com.handimart.app.response.WishListItemResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class WishListItemServiceImp implements WishListItemService{

    @Autowired
    private WishListItemRepository wishListItemRepository;

    @Autowired
    private WishListRepository wishListRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public WishListItemResponse addWishListItem(WishListItemRequest request) {
        WishList wishList = wishListRepository.findById(request.getWishListId())
                .orElseThrow(() -> new NoSuchElementException("WishList not found"));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new NoSuchElementException("Product not found"));

        WishListItem item = new WishListItem();
        item.setWishList(wishList);
        item.setProduct(product);
        WishListItem saved = wishListItemRepository.save(item);

        return mapToResponse(saved);
    }

    @Override
    public List<WishListItemResponse> getItemsByWIshListId(Long wishListId) {
        List<WishListItem> items = wishListItemRepository.findByWishList_WishListId(wishListId);
        return items.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public void removeWishListItem(Long wishListItemId) {
        if(!wishListItemRepository.existsById(wishListItemId)){
            throw new NoSuchElementException("WishList Item not found");
        }
        wishListItemRepository.deleteById(wishListItemId);
    }

    private WishListItemResponse mapToResponse(WishListItem item) {
        WishListItemResponse response = new WishListItemResponse();
        response.setWishListItemId(item.getWishListItemId());
        response.setWishListId(item.getWishList().getWishListId());
        response.setProductId(item.getProduct().getProductId());
        response.setProductName(item.getProduct().getTitle());
        response.setAddedAt(item.getAddedAt());
        return response;
    }
}
