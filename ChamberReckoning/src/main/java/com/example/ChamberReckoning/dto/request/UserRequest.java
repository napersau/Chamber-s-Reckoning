package com.example.ChamberReckoning.dto.request;

import lombok.Data;

import java.time.Instant;

@Data
public class UserRequest {
    private String username;
    private String password;
    private Instant avatar;
    private Instant birthDate;
    private String email;
    private String phone;
    private String address;
    private Instant createdAt;
    private Instant updatedAt;
    private int winCount;
    private int lossCount;
    private double eloRating;
}
