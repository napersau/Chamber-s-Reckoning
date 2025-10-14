package com.example.ChamberReckoning.dto.response;

import lombok.Data;

@Data
public class CardResponse {
    private String id;
    private String name;
    private String description;
    private String imageUrl;
    private String cardType;
    private String effectCode;
}
