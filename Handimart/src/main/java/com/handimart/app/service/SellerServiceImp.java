package com.handimart.app.service;

import com.handimart.app.config.JwtProvider;
import com.handimart.app.model.SellerProfile;
import com.handimart.app.model.User;
import com.handimart.app.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SellerServiceImp implements SellerService{

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public SellerProfile findUserByJwtToken(String jwt) throws Exception {
        return null;
    }

    @Override
    public SellerProfile findUseryUser(User target) throws Exception {
        SellerProfile seller = sellerRepository.findByUser(target);

        if(seller == null){
            throw new Exception("User not found");
        }

        return seller;
    }
}
