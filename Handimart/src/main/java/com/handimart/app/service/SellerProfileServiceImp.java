package com.handimart.app.service;

import com.handimart.app.model.SellerProfile;
import com.handimart.app.model.User;
import com.handimart.app.repository.SellerProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SellerProfileServiceImp implements SellerProfileService {

    @Autowired
    private SellerProfileRepository sellerProfileRepository;

    @Override
    public SellerProfile createSellerProfile(User user, SellerProfile profileData) {
        // Check if the user already has a profile
        Optional<SellerProfile> existing = sellerProfileRepository.findByUser(user);
        if (existing.isPresent()) {
            throw new RuntimeException("Seller profile already exists for this user");
        }

        profileData.setUser(user);
        return sellerProfileRepository.save(profileData);
    }

    @Override
    public SellerProfile getSellerProfileByUser(User user) {
        return sellerProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Seller profile not found"));
    }

    @Override
    public SellerProfile updateSellerProfile(User user, SellerProfile updatedData) {
        SellerProfile existing = getSellerProfileByUser(user);

        existing.setBio(updatedData.getBio());
        existing.setTags(updatedData.getTags());
        existing.setFeaturedFlag(updatedData.isFeaturedFlag());

        return sellerProfileRepository.save(existing);
    }


}
