package com.example.ChamberReckoning.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "players")
@Builder
public class Player {
    @Id
    private String id;
    private String name;
    private int health;
    private int shields;
    private Boolean isLocked; //Bị hạ bài
    private Boolean isCuffed; //Bị còng
    private List<Card> card;
    private String maxHealth;
}
