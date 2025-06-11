package com.handimart.app.service;

import com.handimart.app.config.JwtProvider;
import com.handimart.app.model.User;
import com.handimart.app.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = findUseryEmail(email);

        return user;
    }

    @Override
    public User findUseryEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);

        if(user == null){
            throw new EntityNotFoundException();
        }

        return user;
    }
    
    @Override
    public String updateUser(Long id, User userDetails) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with ID " + id + " not found."));

        existingUser.setFirst_name(userDetails.getFirst_name());
        existingUser.setLast_name(userDetails.getLast_name());
        existingUser.setEmail(userDetails.getEmail());
        existingUser.setUsername(userDetails.getUsername());
        existingUser.setProfile_image(userDetails.getProfile_image());
        existingUser.setAddress(userDetails.getAddress());

        userRepository.save(existingUser);
        return "User updated successfully.";
    }
    
    @Override
    public String patchUser(Long id, User userDetails) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with ID " + id + " not found."));

        if (userDetails.getFirst_name() != null) {
            existingUser.setFirst_name(userDetails.getFirst_name());
        }
        if (userDetails.getLast_name() != null) {
            existingUser.setLast_name(userDetails.getLast_name());
        }
        if (userDetails.getEmail() != null) {
            existingUser.setEmail(userDetails.getEmail());
        }
        if (userDetails.getUsername() != null) {
            existingUser.setUsername(userDetails.getUsername());
        }
        if (userDetails.getProfile_image() != null) {
            existingUser.setProfile_image(userDetails.getProfile_image());
        }
        if (userDetails.getAddress() != null) {
            existingUser.setAddress(userDetails.getAddress());
        }

        userRepository.save(existingUser);
        return "User updated successfully.";
    }

    
    @Override
    public String deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User with ID " + userId + " not found."));

        userRepository.delete(user);
        return "Account deleted successfully.";
    }


}
