package com.handimart.app.request;

import lombok.Data;

@Data
public class WishListRequest {
    private Long user_id;

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
    
    public WishListRequest() {
    	
    }
}
