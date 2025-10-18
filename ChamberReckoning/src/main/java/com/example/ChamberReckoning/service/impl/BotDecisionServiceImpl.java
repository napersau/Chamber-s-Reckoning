package com.example.ChamberReckoning.service.impl;

import com.example.ChamberReckoning.dto.request.ActionRequest;
import com.example.ChamberReckoning.entity.Card;
import com.example.ChamberReckoning.entity.Player;
import com.example.ChamberReckoning.entity.Room;
import com.example.ChamberReckoning.service.BotDecisionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BotDecisionServiceImpl implements BotDecisionService {

    @Override
    public ActionRequest decideAction(Room room) {
        String botId = room.getCurrentPlayerId();
        Player botPlayer = findPlayerById(room, botId);

        // 1. Use HEAL card if health is low
        Card healCard = getCardByType(botPlayer, "HEAL");

        // 2. Use SHIELD card if health is critical
        Card shieldCard = getCardByType(botPlayer, "SHIELD");
        if (shieldCard != null && botPlayer.getHealth() <= 1) {
            return buildUseCardAction(botId, botId, shieldCard);
        }

        // 3. Use BUFF card if available
        Card buffCard = getCardByType(botPlayer, "BUFF");
        if (buffCard != null) {
            return buildUseCardAction(botId, botId, buffCard);
        }

        // 4. Attack weakest opponent
        Optional<Player> weakTarget = findWeakestOpponent(room, botId);
        if (weakTarget.isPresent()) {
            return buildShootAction(botId, weakTarget.get().getId());
        }

        // 5. Default: attack next alive player
        String nextPlayerId = findNextAlivePlayerId(room);
        return buildShootAction(botId, nextPlayerId);
    }

    private Player findPlayerById(Room room, String playerId) {
        return room.getPlayer().stream()
                .filter(p -> p.getId().equals(playerId))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Player not found: " + playerId));
    }

    private Card getCardByType(Player player, String cardType) {
        if (player.getCard() == null) return null;
        return player.getCard().stream()
                .filter(card -> cardType.equalsIgnoreCase(card.getCardType()))
                .findFirst()
                .orElse(null);
    }

    private Optional<Player> findWeakestOpponent(Room room, String selfId) {
        return room.getPlayer().stream()
                .filter(p -> !p.getId().equals(selfId) && p.getHealth() > 0)
                .min(Comparator.comparingInt(Player::getHealth));
    }

    private String findNextAlivePlayerId(Room room) {
        List<String> turnOrder = room.getTurnOrder();
        String currentId = room.getCurrentPlayerId();
        int currentIndex = turnOrder.indexOf(currentId);
        int n = turnOrder.size();
        for (int i = 1; i < n; i++) {
            String nextId = turnOrder.get((currentIndex + i) % n);
            Player nextPlayer = findPlayerById(room, nextId);
            if (nextPlayer.getHealth() > 0) {
                return nextId;
            }
        }
        throw new IllegalStateException("No other alive players found.");
    }

    private ActionRequest buildShootAction(String actorId, String targetId) {
        return ActionRequest.builder()
                .playerId(actorId)
                .actionType("SHOOT")
                .targetId(targetId)
                .build();
    }

    private ActionRequest buildUseCardAction(String actorId, String targetId, Card card) {
        return ActionRequest.builder()
                .playerId(actorId)
                .actionType("USE_CARD")
                .targetId(targetId)
                .card(card)
                .build();
    }
}