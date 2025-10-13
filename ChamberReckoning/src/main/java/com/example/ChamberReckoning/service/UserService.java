package com.example.ChamberReckoning.service;


import com.example.ChamberReckoning.dto.request.UserRequest;
import com.example.ChamberReckoning.dto.response.UserResponse;

public interface UserService {
    UserResponse createUser(UserRequest userRequest);
    UserResponse getUserById(String id);

}
