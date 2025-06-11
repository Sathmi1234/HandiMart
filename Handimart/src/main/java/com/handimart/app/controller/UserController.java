package com.handimart.app.controller;

import com.handimart.app.model.User;
import com.handimart.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    @PutMapping("/profile/update/{id}")
    public ResponseEntity<String> updateUserDetails(@PathVariable("id") Long id, @RequestBody User user){
    	return new ResponseEntity<String>(userService.updateUser(id, user), HttpStatus.OK);
    }
    
    @PatchMapping("/profile/update/{id}")
    public ResponseEntity<String> patchUserDetails(@PathVariable("id") Long id, @RequestBody User user){
    	return new ResponseEntity<String>(userService.patchUser(id, user), HttpStatus.OK);
    }
    
    @DeleteMapping("/profile/delete/{id}")
    public ResponseEntity<String> deleteUserAcc(@PathVariable("id") Long id){
    	return new ResponseEntity<String>(userService.deleteUser(id), HttpStatus.OK);
    }
}
