package com.example.ChamberReckoning.dto.request;

import lombok.Data;

@Data
public class CardRequest {
    private String name;
    private String description;
    private String imageUrl;
    private String cardType;
    private String effectCode;
}
