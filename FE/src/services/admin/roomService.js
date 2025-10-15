import httpClient from '../../config/httpClient';

// API endpoints cho admin room management
const API_ENDPOINTS = {
  GET_ALL_ROOMS: '/rooms/all',
  GET_ROOM_BY_ID: 'rooms',
  CREATE_ROOM: '/rooms/create',
  DELETE_ROOM: '/rooms'
};

export const adminRoomService = {
  // Lấy danh sách tất cả rooms
  getAllRooms: async () => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.GET_ALL_ROOMS);
      return response.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },

  // Lấy chi tiết một room
  getRoomById: async (roomId) => {
    try {
      const response = await httpClient.get(`${API_ENDPOINTS.GET_ROOM_BY_ID}/${roomId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching room detail:', error);
      throw error;
    }
  },

  // Tạo room mới (nếu backend hỗ trợ)
  createRoom: async (roomData) => {
    try {
      const response = await httpClient.post(API_ENDPOINTS.CREATE_ROOM, roomData);
      return response.data;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  },

  // Xóa room (nếu backend hỗ trợ)
  deleteRoom: async (roomId) => {
    try {
      const response = await httpClient.delete(`${API_ENDPOINTS.DELETE_ROOM}/${roomId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting room:', error);
      throw error;
    }
  }
};