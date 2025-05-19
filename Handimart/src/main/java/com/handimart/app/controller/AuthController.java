package com.handimart.app.controller;

import com.handimart.app.config.JwtProvider;
import com.handimart.app.model.Cart;
import com.handimart.app.model.SellerProfile;
import com.handimart.app.model.USER_ROLE;
import com.handimart.app.model.User;
import com.handimart.app.repository.CartRepository;
import com.handimart.app.repository.SellerRepository;
import com.handimart.app.repository.UserRepository;
import com.handimart.app.request.LoginRequest;
import com.handimart.app.request.SellerSignUpRequest;
import com.handimart.app.response.AuthResponse;
import com.handimart.app.service.CustomerUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.HashSet;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private SellerRepository sellerRepository;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {

        User isEmailExist = userRepository.findByEmail(user.getEmail());
        if(isEmailExist != null){
            throw new Exception("Email is already in use");
        }

        User createdUser = new User();
        createdUser.setUsername(user.getUsername());
        createdUser.setEmail(user.getEmail());
        createdUser.setFirst_name(user.getFirst_name());
        createdUser.setLast_name(user.getLast_name());
        createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(createdUser);

        Cart cart = new Cart();
        cart.setCartOwner(savedUser);
        cartRepository.save(cart);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToke(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register success");
        authResponse.setRole(savedUser.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/seller/signup")
    public ResponseEntity<AuthResponse> createSellerHandler(@RequestBody SellerSignUpRequest request) throws Exception {

        User isEmailExist = userRepository.findByEmail(request.getUser().getEmail());
        if(isEmailExist != null){
            throw new Exception("Email is already in use");
        }

        User user = request.getUser();
        User createdUser = new User();
        createdUser.setUsername(user.getUsername());
        createdUser.setEmail(user.getEmail());
        createdUser.setFirst_name(user.getFirst_name());
        createdUser.setLast_name(user.getLast_name());
        createdUser.setRole(USER_ROLE.ROLE_SELLER); // Set role as SELLER
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getAddress() != null) {
            createdUser.setAddress(user.getAddress());
        }

        if (user.getProfile_image() != null) {
            createdUser.setProfile_image(user.getProfile_image());
        }

        User savedUser = userRepository.save(createdUser);

        SellerProfile sellerProfile = new SellerProfile();
        sellerProfile.setUser(savedUser);
        sellerProfile.setBio(request.getBio());
        sellerProfile.setRating(0.0);
        sellerProfile.setRatingCount(0);
        sellerProfile.setStatus(SellerProfile.SellerStatus.NEW);

        // Initialize tags if provided
        if (request.getTags() != null && !request.getTags().isEmpty()) {
            sellerProfile.setTags(new HashSet<>(request.getTags()));
        }

        SellerRepository.save(sellerProfile);

        Cart cart = new Cart();
        cart.setCartOwner(savedUser);
        cartRepository.save(cart);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToke(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Seller registration successful");
        authResponse.setRole(savedUser.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest req){

        String username = req.getEmail();
        String password = req.getPassword();

        Authentication authentication = authenticate(username, password);

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String role = authorities.isEmpty()?null: authorities.iterator().next().getAuthority();

        String jwt = jwtProvider.generateToke(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login success");
        authResponse.setRole(USER_ROLE.valueOf(role));

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {

        UserDetails userDetails = customerUserDetailsService.loadUserByUsername(username);
        if(userDetails == null){
            throw new BadCredentialsException("Invalid username");
        }

        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
