package com.handimart.app.request;

import com.handimart.app.model.USER_ROLE;
import lombok.Data;

@Data
public class UserSignupRequest {
    private String username;
    private String email;
    private String password;
    private String first_name;
    private String last_name;
    private USER_ROLE role;
}
