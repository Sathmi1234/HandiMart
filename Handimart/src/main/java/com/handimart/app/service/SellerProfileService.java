package com.handimart.app.service;

import java.util.List;

import com.handimart.app.model.SellerProfile;
import com.handimart.app.model.User;

public interface SellerProfileService {

    public SellerProfile createSellerProfile(User user, SellerProfile profileData);

    public SellerProfile getSellerProfileByUser(User user);

    public SellerProfile updateSellerProfile(User user, SellerProfile updatedData);
    
    public List<SellerProfile> getAllSellerProfiles();
}
