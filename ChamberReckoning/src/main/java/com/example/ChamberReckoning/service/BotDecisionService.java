package com.example.ChamberReckoning.service;

import com.example.ChamberReckoning.dto.request.ActionRequest;
import com.example.ChamberReckoning.dto.request.RoomRequest;
import com.example.ChamberReckoning.dto.response.RoomResponse;
import com.example.ChamberReckoning.entity.Room;

public interface BotDecisionService {
    ActionRequest decideAction(Room room);
}
