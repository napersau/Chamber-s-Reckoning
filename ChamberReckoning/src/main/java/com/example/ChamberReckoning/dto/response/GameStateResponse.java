package com.example.ChamberReckoning.dto.response;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GameStateResponse {
    private String roomId;

    private String status;

    private String currentPlayerId;

    private List<String> turnOrder;

    private String winnerId;
}
