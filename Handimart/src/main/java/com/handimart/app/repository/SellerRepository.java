package com.handimart.app.repository;

import com.handimart.app.model.SellerProfile;
import com.handimart.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<SellerProfile, Long> {

    public SellerProfile findByUser(User user);
}