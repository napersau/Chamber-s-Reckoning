package com.example.ChamberReckoning.controller;


import com.example.ChamberReckoning.dto.request.RoomRequest;
import com.example.ChamberReckoning.dto.response.ApiResponse;
import com.example.ChamberReckoning.dto.response.RoomResponse;
import com.example.ChamberReckoning.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/create")
    public ApiResponse<RoomResponse> createRoom(@RequestBody RoomRequest roomRequest){
        RoomResponse roomResponse = roomService.createRoom(roomRequest);
        return ApiResponse.<RoomResponse>builder()
                .code(1000)
                .result(roomResponse)
                .build();
    }

    @GetMapping("/{roomId}")
    public ApiResponse<RoomResponse> getRoomById(@PathVariable int roomId) {
        RoomResponse roomResponse = roomService.getRoomById(roomId);
        return ApiResponse.<RoomResponse>builder()
                .code(1000)
                .result(roomResponse)
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<RoomResponse>> getAllRooms() {
        List<RoomResponse> roomResponses = roomService.getAllRooms();
        return ApiResponse.<List<RoomResponse>>builder()
                .code(1000)
                .result(roomResponses)
                .build();
    }
}
