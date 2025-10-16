import httpClient from '../config/httpClient';

// API endpoints cho room management (user)
const API_ENDPOINTS = {
  GET_ALL_ROOMS: '/rooms/all',
  GET_ROOM_BY_ID: '/rooms',
  CREATE_ROOM: '/rooms/create',
  JOIN_ROOM: '/rooms/join',
  LEAVE_ROOM: '/rooms/leave'
};

export const roomService = {
  // Lấy danh sách tất cả rooms
  getAllRooms: async () => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.GET_ALL_ROOMS);
      
      // Backend trả về ApiResponse với format: { code: 1000, result: [...] }
      if (response.data && response.data.code === 1000) {
        return {
          success: true,
          data: response.data.result || [],
          message: response.data.message || 'Success'
        };
      } else {
        throw new Error(response.data?.message || 'API response error');
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message || 'Network error'
      };
    }
  },

  // Lấy chi tiết một room
  getRoomById: async (roomId) => {
    try {
      const response = await httpClient.get(`${API_ENDPOINTS.GET_ROOM_BY_ID}/${roomId}`);
      
      // Backend trả về ApiResponse với format: { code: 1000, result: {...} }
      if (response.data && response.data.code === 1000) {
        return {
          success: true,
          data: response.data.result,
          message: response.data.message || 'Success'
        };
      } else {
        throw new Error(response.data?.message || 'API response error');
      }
    } catch (error) {
      console.error('Error fetching room detail:', error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message || 'Network error'
      };
    }
  },

  // Tạo room mới
  createRoom: async (roomData) => {
    try {
      const response = await httpClient.post(API_ENDPOINTS.CREATE_ROOM, roomData);
      
      // Backend trả về ApiResponse với format: { code: 1000, result: {...} }
      if (response.data && response.data.code === 1000) {
        return {
          success: true,
          data: response.data.result,
          message: response.data.message || 'Room created successfully'
        };
      } else {
        throw new Error(response.data?.message || 'API response error');
      }
    } catch (error) {
      console.error('Error creating room:', error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message || 'Network error'
      };
    }
  },

  // Tham gia phòng
  joinRoom: async (roomId, password = null) => {
    try {
      const data = password ? { password } : {};
      const response = await httpClient.put(`${API_ENDPOINTS.JOIN_ROOM}/${roomId}`, data);
      
      // Backend trả về ApiResponse với format: { code: 1000, result: {...} }
      if (response.data && response.data.code === 1000) {
        return {
          success: true,
          data: response.data.result,
          message: response.data.message || 'Joined room successfully'
        };
      } else {
        throw new Error(response.data?.message || 'API response error');
      }
    } catch (error) {
      console.error('Error joining room:', error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message || 'Network error'
      };
    }
  },

  // Rời khỏi phòng
  leaveRoom: async (roomId) => {
    try {
      const response = await httpClient.post(`${API_ENDPOINTS.LEAVE_ROOM}/${roomId}`);
      
      // Backend trả về ApiResponse với format: { code: 1000, result: {...} }
      if (response.data && response.data.code === 1000) {
        return {
          success: true,
          data: response.data.result,
          message: response.data.message || 'Left room successfully'
        };
      } else {
        throw new Error(response.data?.message || 'API response error');
      }
    } catch (error) {
      console.error('Error leaving room:', error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message || 'Network error'
      };
    }
  }
};

export default roomService;