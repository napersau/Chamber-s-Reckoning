package com.example.ChamberReckoning.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "players")
public class Player {

    @Id
    private int id;
    private String name;
    private int health;
    private int shields;
    private Boolean isLocked; //Bị hạ bài
    private Boolean isCuffed; //Bị còng
    private List<Card> card;
}
