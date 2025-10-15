package com.example.ChamberReckoning.service;

import com.example.ChamberReckoning.dto.request.RoomRequest;
import com.example.ChamberReckoning.dto.response.RoomResponse;

import java.util.List;

public interface RoomService {
    RoomResponse createRoom(RoomRequest request);
    RoomResponse getRoomById(int roomId);
    RoomResponse updateRoom(int roomId, RoomRequest request);
    void deleteRoom(String roomId);
    List<RoomResponse> getAllRooms();
    List<RoomResponse> getRoomsByName(String name);
}
