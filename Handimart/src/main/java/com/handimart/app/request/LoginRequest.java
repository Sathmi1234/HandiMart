package com.handimart.app.request;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String password;
	public LoginRequest() {
		super();
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
    
    
}
