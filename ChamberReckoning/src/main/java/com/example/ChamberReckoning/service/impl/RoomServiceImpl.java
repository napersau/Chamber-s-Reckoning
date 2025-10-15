package com.example.ChamberReckoning.service.impl;

import com.example.ChamberReckoning.dto.request.RoomRequest;
import com.example.ChamberReckoning.dto.response.RoomResponse;
import com.example.ChamberReckoning.entity.Room;
import com.example.ChamberReckoning.entity.User;
import com.example.ChamberReckoning.repository.RoomRepository;
import com.example.ChamberReckoning.service.RoomService;
import com.example.ChamberReckoning.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final SecurityUtil securityUtil;
    private final ModelMapper modelMapper;

    @Override
    public RoomResponse createRoom(RoomRequest request) {
        User user = securityUtil.getCurrentUser();

        Room room = Room.builder()
                .createdAt(Instant.now())
                .createdBy(user)
                .map(request.getMap())
                .name(request.getName())
                .status("waiting")
                .maxPlayers(request.getMaxPlayers())
                .currentPlayers(1)
                .gameMode(request.getGameMode())
                .password(request.getPassword())
                .player(request.getPlayer())
                .build();

        return modelMapper.map(roomRepository.save(room), RoomResponse.class);
    }

    @Override
    public RoomResponse getRoomById(String roomId) {
        return null;
    }

    @Override
    public RoomResponse updateRoom(String roomId, RoomRequest request) {
        return null;
    }

    @Override
    public void deleteRoom(String roomId) {

    }

    @Override
    public List<RoomResponse> getAllRooms() {
        return List.of();
    }

    @Override
    public List<RoomResponse> getRoomsByName(String name) {
        return List.of();
    }
}
