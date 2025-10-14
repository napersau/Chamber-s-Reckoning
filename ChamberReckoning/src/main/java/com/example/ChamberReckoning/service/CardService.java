package com.example.ChamberReckoning.service;

import com.example.ChamberReckoning.dto.request.CardRequest;
import com.example.ChamberReckoning.dto.response.CardResponse;

import java.util.List;

public interface CardService {
    CardResponse getCardById(String id);
    CardResponse createCard(CardRequest cardRequest);
    CardResponse updateCard(String id, CardRequest cardRequest);
    void deleteCard(String id);
    List<CardResponse> getAllCards();
}
