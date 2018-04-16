package com.apsms.service;

import com.apsms.modal.User;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public interface UserService {

    public Page<User> queryAll(final User param, int pageNumber, int pageSize);

    public List<User> checkLogin(User user);

    public User findUserByName(String name);

    public List<User> fuzzyQueryUsersByName(String name);

    public User  createUser(User user) throws NoSuchAlgorithmException, UnsupportedEncodingException;

    public void deleteUserByName(String name);

    public User updateUser(User user);
}
