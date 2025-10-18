package com.example.ChamberReckoning.dto.request;

import com.example.ChamberReckoning.entity.Card;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ActionRequest {
    private String playerId; // ID của người thực hiện hành động
    private String actionType; // "SHOOT", "USE_CARD", "SKIP_TURN"

    private String targetId; // ID của người chơi bị nhắm tới (khi bắn, dùng bài còng/khóa)
    private Card card; // Lá bài được sử dụng (ví dụ: SHIELD, SACRIFICE)
}
