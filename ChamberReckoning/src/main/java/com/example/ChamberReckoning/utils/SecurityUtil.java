package com.example.ChamberReckoning.utils;

import com.example.ChamberReckoning.entity.User;
import com.example.ChamberReckoning.exception.AppException;
import com.example.ChamberReckoning.exception.ErrorCode;
import com.example.ChamberReckoning.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtil {

    private final UserRepository userRepository;

    public User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }
}
