package com.example.ChamberReckoning.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
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
    private Double eloRating;
    private Boolean isActive;
    private int googleAccountId;
    private String fullName;
    private Role role;
}