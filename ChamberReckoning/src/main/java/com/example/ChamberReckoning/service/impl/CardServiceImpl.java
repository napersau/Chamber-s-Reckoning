package com.example.ChamberReckoning.service.impl;

import com.example.ChamberReckoning.dto.request.CardRequest;
import com.example.ChamberReckoning.dto.response.CardResponse;
import com.example.ChamberReckoning.entity.Card;
import com.example.ChamberReckoning.repository.CardRepository;
import com.example.ChamberReckoning.service.CardService;
import com.example.ChamberReckoning.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;
    private final SecurityUtil securityUtil;
    private final ModelMapper modelMapper;

    @Override
    public CardResponse getCardById(String id) {
        return null;
    }

    @Override
    public CardResponse createCard(CardRequest cardRequest) {
        Card card = Card.builder()
                .name(cardRequest.getName())
                .description(cardRequest.getDescription())
                .imageUrl(cardRequest.getImageUrl())
                .cardType(cardRequest.getCardType())
                .effectCode(cardRequest.getEffectCode())
                .build();
        cardRepository.save(card);
        return modelMapper.map(card, CardResponse.class);
    }

    @Override
    public CardResponse updateCard(String id, CardRequest cardRequest) {

        Card card = cardRepository.findById(id).orElseThrow(() -> new RuntimeException("Card not found"));
        card.setName(cardRequest.getName());
        card.setDescription(cardRequest.getDescription());
        card.setImageUrl(cardRequest.getImageUrl());
        card.setCardType(cardRequest.getCardType());
        card.setEffectCode(cardRequest.getEffectCode());
        cardRepository.save(card);

        return modelMapper.map(card, CardResponse.class);
    }

    @Override
    public void deleteCard(String id) {
        cardRepository.deleteById(id);
    }
}
