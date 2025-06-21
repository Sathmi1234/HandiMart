package com.handimart.app.controller;

import com.handimart.app.model.SellerProfile;
import com.handimart.app.model.User;
import com.handimart.app.response.ContentPostResponse;
import com.handimart.app.service.SellerProfileService;
import com.handimart.app.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sellers")
public class SellerProfileController {

    @Autowired
    private SellerProfileService sellerProfileService;

    @Autowired
    private UserService userService;
    
    @GetMapping("/")
    public ResponseEntity<List<SellerProfile>> getAllContentPosts() {
        return new ResponseEntity<>(sellerProfileService.getAllSellerProfiles(), HttpStatus.OK);
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<SellerProfile> createSellerProfile(@RequestHeader("Authorization") String jwt,
                                                             @RequestBody SellerProfile profileData) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        SellerProfile created = sellerProfileService.createSellerProfile(user, profileData);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<SellerProfile> getMySellerProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        SellerProfile profile = sellerProfileService.getSellerProfileByUser(user);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<SellerProfile> updateSellerProfile(@RequestHeader("Authorization") String jwt,
                                                             @RequestBody SellerProfile updatedData) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        SellerProfile updated = sellerProfileService.updateSellerProfile(user, updatedData);
        return ResponseEntity.ok(updated);
    }
}
