package com.example.ChamberReckoning.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class IntrospectResponse {
    private boolean valid;
    private String userId;
}
