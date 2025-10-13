package com.example.ChamberReckoning.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AuthenticationResponse {
    private String token;
    private boolean authenticated;

}