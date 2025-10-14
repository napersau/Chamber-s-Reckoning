package com.example.ChamberReckoning.controller;


import com.example.ChamberReckoning.dto.request.CardRequest;
import com.example.ChamberReckoning.dto.response.ApiResponse;
import com.example.ChamberReckoning.dto.response.CardResponse;
import com.example.ChamberReckoning.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cards")
@RequiredArgsConstructor
public class CardController {
    private final CardService cardService;

    @GetMapping("/{cardId}")
    public ApiResponse<CardResponse> getCardById(@PathVariable String cardId){
        CardResponse cardResponse = cardService.getCardById(cardId);
        return ApiResponse.<CardResponse>builder()
                .result(cardResponse)
                .code(1000)
                .message("Card fetched successfully")
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<CardResponse> createCard(@RequestBody CardRequest cardRequest){
        CardResponse cardResponse = cardService.createCard(cardRequest);
        return ApiResponse.<CardResponse>builder()
                .result(cardResponse)
                .code(1000)
                .message("Card created successfully")
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<CardResponse>> getAllCards() {
        List<CardResponse> cardResponses = cardService.getAllCards();
        return ApiResponse.<List<CardResponse>>builder()
                .result(cardResponses)
                .code(1000)
                .message("All cards fetched successfully")
                .build();
    }

    @DeleteMapping("/{cardId}")
    public ApiResponse<Void> deleteCard(@PathVariable String cardId){
        cardService.deleteCard(cardId);
        return ApiResponse.<Void>builder()
                .code(1000)
                .message("Card deleted successfully")
                .build();
    }
}
