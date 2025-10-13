package com.example.ChamberReckoning.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "invalidated_token")
@Builder
public class InvalidatedToken {
    @Id
    private String id;
    private Date expiryTime;
}
