package com.example.ChamberReckoning.service.impl;

import com.example.ChamberReckoning.dto.request.ActionRequest;
import com.example.ChamberReckoning.dto.request.StartGameRequest;
import com.example.ChamberReckoning.dto.response.RoomResponse;
import com.example.ChamberReckoning.entity.Card;
import com.example.ChamberReckoning.entity.Player;
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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class GameFlowServiceImpl implements GameFlowService {

    private final RoomRepository roomRepository;
    private final CardRepository cardRepository;
    private final SecurityUtil securityUtil;
    private final ModelMapper modelMapper;

    public RoomResponse startGame(String roomId, StartGameRequest request) {
        User user = securityUtil.getCurrentUser();
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (!user.getId().equals(room.getCreatedBy().getId())) {
            throw new RuntimeException("Only the room creator can start the game.");
        }

        room.setStatus("in-progress");

        List<Card> allCards = cardRepository.findAll();
        Random random = new Random();
        for (Player player : room.getPlayer()) {
            List<Card> playerCards = new ArrayList<>();
            for (int i = 0; i < 6; i++) {
                playerCards.add(allCards.get(random.nextInt(allCards.size())));
            }
            player.setCard(playerCards);
            player.setHealth(3);
            player.setShields(0);
        }

        int realBullets = 1 + random.nextInt(5);
        int totalBullets = 6;
        List<Boolean> chamber = new ArrayList<>();
        for (int i = 0; i < realBullets; i++) chamber.add(true);
        for (int i = realBullets; i < totalBullets; i++) chamber.add(false);
        Collections.shuffle(chamber);
        room.setChamber(chamber);

        room.setRound(1);
        room.setWinner(null);

        List<String> turnOrder = room.getPlayer().stream().map(Player::getId).collect(Collectors.toList());
        Collections.shuffle(turnOrder);
        room.setTurnOrder(turnOrder);
        room.setCurrentPlayerId(turnOrder.get(0));

        roomRepository.save(room);
        return modelMapper.map(room, RoomResponse.class);
    }

    @Override
    public RoomResponse processPlayerAction(String roomId, ActionRequest action) {

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));

        String shooterId = action.getPlayerId();
        String targetId = action.getTargetId();

        Player shooter = room.getPlayer().stream()
                .filter(p -> p.getId().equals(shooterId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Shooter not found"));
        Player target = room.getPlayer().stream()
                .filter(p -> p.getId().equals(targetId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Target not found"));

        // Chamber logic: pop the next bullet
        List<Boolean> chamber = room.getChamber();
        boolean isBullet = false;
        if (chamber != null && !chamber.isEmpty()) {
            isBullet = chamber.remove(0);
        }

        // Only apply damage if it's a real bullet
        if (isBullet) {
            if (target.getShields() > 0) {
                target.setShields(target.getShields() - 1);
            } else {
                target.setHealth(target.getHealth() - 1);
            }
        }
        // If blank, no effect

        if (target.getHealth() <= 0) {
            target.setHealth(0);
            // Optionally: handle elimination logic
        }

        // Check if chamber is empty and both players are alive
        boolean allAlive = room.getPlayer().stream().filter(p -> p.getHealth() > 0).count() > 1;
        if (chamber.isEmpty() && allAlive) {
            // Refill chamber and re-deal cards
            List<Card> allCards = cardRepository.findAll();
            Random random = new Random();
            for (Player player : room.getPlayer()) {
                if (player.getHealth() > 0) {
                    List<Card> playerCards = new ArrayList<>();
                    for (int i = 0; i < 6; i++) {
                        playerCards.add(allCards.get(random.nextInt(allCards.size())));
                    }
                    player.setCard(playerCards);
                }
            }
            int realBullets = 1 + random.nextInt(5);
            List<Boolean> newChamber = new ArrayList<>();
            for (int i = 0; i < realBullets; i++) newChamber.add(true);
            for (int i = realBullets; i < 6; i++) newChamber.add(false);
            Collections.shuffle(newChamber);
            room.setChamber(newChamber);
        } else {
            room.setChamber(chamber);
        }

        // Determine next turn
        if (shooterId.equals(targetId) && shooter.getHealth() > 0) {
            room.setCurrentPlayerId(shooterId);
        } else {
            List<String> turnOrder = room.getTurnOrder();
            int idx = turnOrder.indexOf(room.getCurrentPlayerId());
            int n = turnOrder.size();
            for (int i = 1; i < n; i++) {
                String nextId = turnOrder.get((idx + i) % n);
                Player nextPlayer = room.getPlayer().stream()
                        .filter(p -> p.getId().equals(nextId) && p.getHealth() > 0)
                        .findFirst().orElse(null);
                if (nextPlayer != null) {
                    room.setCurrentPlayerId(nextId);
                    break;
                }
            }
        }

        roomRepository.save(room);
        return modelMapper.map(room, RoomResponse.class);
    }
}
