package com.example.ChamberReckoning.controller;


import com.example.ChamberReckoning.dto.request.RoomRequest;
import com.example.ChamberReckoning.dto.request.StartGameRequest;
import com.example.ChamberReckoning.dto.response.ApiResponse;
import com.example.ChamberReckoning.dto.response.RoomResponse;
import com.example.ChamberReckoning.service.GameFlowService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/game")
@RequiredArgsConstructor
public class GameController {

    private final GameFlowService gameFlowService;

    @PostMapping("/{roomId}/start")
    public ApiResponse<RoomResponse> startGame(@PathVariable String roomId, @RequestBody StartGameRequest request) {
        RoomResponse response = gameFlowService.startGame(roomId, request);
        return ApiResponse.<RoomResponse>builder()
                .code(1000)
                .result(response)
                .build();
    }
}
