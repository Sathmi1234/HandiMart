package com.handimart.app.request;

import com.handimart.app.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellerSignUpRequest {
    private User user;
    private String bio;
    private List<String> tags;
}
