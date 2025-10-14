package com.example.ChamberReckoning.service.impl;


import com.example.ChamberReckoning.dto.request.UserRequest;
import com.example.ChamberReckoning.dto.response.UserResponse;
import com.example.ChamberReckoning.entity.Role;
import com.example.ChamberReckoning.entity.User;
import com.example.ChamberReckoning.exception.AppException;
import com.example.ChamberReckoning.exception.ErrorCode;
import com.example.ChamberReckoning.repository.UserRepository;
import com.example.ChamberReckoning.service.UserService;
import com.example.ChamberReckoning.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final SecurityUtil securityService;
    private final ModelMapper modelMapper;

    @Override
    public UserResponse createUser(UserRequest userRequest) {
        if(userRepository.existsByUsername(userRequest.getUsername())){
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        User user = modelMapper.map(userRequest, User.class);
        user.setCreatedAt(Instant.now());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setIsActive(true);
        Role role = Role.builder()
                .name("USER")
                .id(1)
                .build();
        user.setRole(role);

        return modelMapper.map(userRepository.save(user), UserResponse.class);
    }

    @Override
    public UserResponse getUserById(String id) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return modelMapper.map(user, UserResponse.class);
    }

    @Override
    public UserResponse getMyInfo() {
        User user = securityService.getCurrentUser();
        return modelMapper.map(user, UserResponse.class);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .toList();
    }

    @Override
    public UserResponse updateStatusUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        user.setIsActive(!user.getIsActive());
        userRepository.save(user);
        return modelMapper.map(user, UserResponse.class);
    }
}
