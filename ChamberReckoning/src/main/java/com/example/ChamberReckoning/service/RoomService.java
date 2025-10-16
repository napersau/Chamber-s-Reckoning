package com.example.ChamberReckoning.service;

import com.example.ChamberReckoning.dto.request.RoomRequest;
import com.example.ChamberReckoning.dto.response.RoomResponse;

import java.util.List;

public interface RoomService {
    RoomResponse createRoom(RoomRequest request);
    RoomResponse getRoomById(String roomId);
    RoomResponse updateRoom(String roomId, RoomRequest request);
    void deleteRoom(String roomId);
    List<RoomResponse> getAllRooms();
    List<RoomResponse> getRoomsByName(String name);
    RoomResponse joinRoom(String roomId);
}
