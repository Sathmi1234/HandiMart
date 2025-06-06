package com.handimart.app.controller;

import com.handimart.app.model.SellerProfile;
import com.handimart.app.model.User;
import com.handimart.app.service.SellerProfileService;
import com.handimart.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sellers")
@PreAuthorize("hasRole('ROLE_SELLER')")
public class SellerProfileController {

    @Autowired
    private SellerProfileService sellerProfileService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<SellerProfile> createSellerProfile(@RequestHeader("Authorization") String jwt,
                                                             @RequestBody SellerProfile profileData) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        SellerProfile created = sellerProfileService.createSellerProfile(user, profileData);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/me")
    public ResponseEntity<SellerProfile> getMySellerProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        SellerProfile profile = sellerProfileService.getSellerProfileByUser(user);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/update")
    public ResponseEntity<SellerProfile> updateSellerProfile(@RequestHeader("Authorization") String jwt,
                                                             @RequestBody SellerProfile updatedData) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        SellerProfile updated = sellerProfileService.updateSellerProfile(user, updatedData);
        return ResponseEntity.ok(updated);
    }
}
