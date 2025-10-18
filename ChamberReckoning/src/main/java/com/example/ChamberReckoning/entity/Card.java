package com.example.ChamberReckoning.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "cards")
public class Card {
    private String id;
    private String name;
    private String description;
    private String imageUrl;
    private String cardType;
    private String effectCode;
    private String rarity;

}
