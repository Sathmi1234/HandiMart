package com.handimart.app.service;

import com.handimart.app.model.SellerProfile;
import com.handimart.app.model.User;

public interface SellerService {

    public SellerProfile findUserByJwtToken(String jwt) throws Exception;

    public SellerProfile findUseryUser(User  user) throws Exception;
}
