package com.example.ChamberReckoning.dto.response;

import com.example.ChamberReckoning.entity.Card;
import com.example.ChamberReckoning.entity.Player;
import com.example.ChamberReckoning.entity.User;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class RoomResponse {
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
}
