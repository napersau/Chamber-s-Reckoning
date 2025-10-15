import httpClient from '../../config/httpClient';

// API endpoints cho admin card management
const API_ENDPOINTS = {
  GET_ALL_CARDS: '/cards/all',
  GET_CARD_BY_ID: '/cards',
  CREATE_CARD: '/cards/create',
  DELETE_CARD: '/cards'
};

export const adminCardService = {
  // Lấy danh sách tất cả cards
  getAllCards: async () => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.GET_ALL_CARDS);
      return response.data;
    } catch (error) {
      console.error('Error fetching cards:', error);
      throw error;
    }
  },

  // Lấy chi tiết một card
  getCardById: async (cardId) => {
    try {
      const response = await httpClient.get(`${API_ENDPOINTS.GET_CARD_BY_ID}/${cardId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching card detail:', error);
      throw error;
    }
  },

  // Tạo card mới
  createCard: async (cardData) => {
    try {
      const response = await httpClient.post(API_ENDPOINTS.CREATE_CARD, cardData);
      return response.data;
    } catch (error) {
      console.error('Error creating card:', error);
      throw error;
    }
  },

  // Xóa card
  deleteCard: async (cardId) => {
    try {
      const response = await httpClient.delete(`${API_ENDPOINTS.DELETE_CARD}/${cardId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting card:', error);
      throw error;
    }
  }
};