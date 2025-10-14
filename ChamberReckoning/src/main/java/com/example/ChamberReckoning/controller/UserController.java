package com.example.ChamberReckoning.controller;


import com.example.ChamberReckoning.dto.request.UserRequest;
import com.example.ChamberReckoning.dto.response.ApiResponse;
import com.example.ChamberReckoning.dto.response.UserResponse;
import com.example.ChamberReckoning.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ApiResponse<UserResponse> registerUser(@RequestBody UserRequest userRequest){
        UserResponse userResponse = userService.createUser(userRequest);
        return ApiResponse.<UserResponse>builder()
                .code(1000)
                .result(userResponse)
                .build();
    }

    @GetMapping("")
    public ApiResponse<UserResponse> getUser(@RequestParam String userId){
        UserResponse userResponse = userService.getUserById(userId);
        return ApiResponse.<UserResponse>builder()
                .code(1000)
                .result(userResponse)
                .build();
    }

    @GetMapping("/my-info")
    public ApiResponse<UserResponse> getMyInfo(@RequestParam String userId){
        UserResponse userResponse = userService.getMyInfo();
        return ApiResponse.<UserResponse>builder()
                .code(1000)
                .result(userResponse)
                .build();
    }

    @GetMapping("/list-users")
    public ApiResponse<List<UserResponse>> getAllUsers(){
        List<UserResponse> userResponses = userService.getAllUsers();
        return ApiResponse.<List<UserResponse>>builder()
                .code(1000)
                .result(userResponses)
                .build();
    }

    @PutMapping("/update/{userId}")
    public ApiResponse<UserResponse> updateStatusUser(@PathVariable String userId){
        UserResponse userResponse = userService.updateStatusUser(userId);
        return ApiResponse.<UserResponse>builder()
                .code(1000)
                .result(userResponse)
                .build();
    }
}
