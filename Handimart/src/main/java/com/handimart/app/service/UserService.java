package com.handimart.app.service;

import com.handimart.app.model.User;

public interface UserService {

    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUseryEmail(String email) throws Exception;

	public String updateUser(Long id, User user);
	
	public String deleteUser(Long id);
	
    public String patchUser(Long id, User userDetails) ;
}
