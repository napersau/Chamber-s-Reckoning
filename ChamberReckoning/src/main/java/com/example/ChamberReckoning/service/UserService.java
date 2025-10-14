package com.example.ChamberReckoning.service;


import com.example.ChamberReckoning.dto.request.UserRequest;
import com.example.ChamberReckoning.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest userRequest);
    UserResponse getUserById(String id);
    UserResponse getMyInfo();
    List<UserResponse> getAllUsers();
    UserResponse updateStatusUser(String userId);
}
