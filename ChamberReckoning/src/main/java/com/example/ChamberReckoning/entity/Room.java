package com.example.ChamberReckoning.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "rooms")
@Builder
public class Room {

    @Id
    private String id;
    private String name;
    private int round;
    private int maxPlayers;
    private int currentPlayers;
    private String status; // waiting, in-progress, finished
    private User createdBy; // userId of the room creator
    private String winner; // userId of the winner
    private String gameMode; // e.g., classic, ranked, custom
    private String map; // e.g., dungeon, arena, forest
    private String password; // for private rooms
    private Instant createdAt;
    private List<Card> card;
    private List<Player> player;
    private String currentPlayerId; // ID of the player whose turn it is
    private List<String> turnOrder; // Ordered list of player IDs for turn rotation
    private List<Boolean> chamber;
}
