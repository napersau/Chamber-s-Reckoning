package com.example.ChamberReckoning.service.impl;

import com.example.ChamberReckoning.dto.request.StartGameRequest;
import com.example.ChamberReckoning.dto.response.RoomResponse;
import com.example.ChamberReckoning.entity.Room;
import com.example.ChamberReckoning.entity.User;
import com.example.ChamberReckoning.repository.CardRepository;
import com.example.ChamberReckoning.repository.RoomRepository;
import com.example.ChamberReckoning.service.GameFlowService;
import com.example.ChamberReckoning.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class GameFlowServiceImpl implements GameFlowService {

    private final RoomRepository roomRepository;
    private final CardRepository cardRepository;
    private final SecurityUtil securityUtil;
    private final ModelMapper modelMapper;;

    @Override
    public RoomResponse startGame(String roomId, StartGameRequest request) {
        User user = securityUtil.getCurrentUser();
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Room not found"));
        if(user.getId() == room.getCreatedBy().getId()) {
            // Implement game start logic here
            room.setStatus("in-progress");
            roomRepository.save(room);
        }
        return modelMapper.map(room, RoomResponse.class);
    }
}
