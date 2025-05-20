package com.handimart.app.repository;

import com.handimart.app.model.SellerProfile;
import com.handimart.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SellerProfileRepository extends JpaRepository<SellerProfile, Long> {

    Optional<SellerProfile> findByUser(User user);


}
