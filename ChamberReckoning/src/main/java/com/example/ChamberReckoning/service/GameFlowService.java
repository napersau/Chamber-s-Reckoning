package com.example.ChamberReckoning.service;

import com.example.ChamberReckoning.dto.request.StartGameRequest;
import com.example.ChamberReckoning.dto.response.RoomResponse;

public interface GameFlowService {
    RoomResponse startGame(String roomId, StartGameRequest request);
}
