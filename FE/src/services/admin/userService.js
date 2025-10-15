import httpClient from '../../config/httpClient';

// API endpoints cho admin user management
const API_ENDPOINTS = {
  LIST_USERS: '/users/list-users',
  UPDATE_USER_STATUS: '/users/update',
  DELETE_USER: '/users/delete',
  USER_DETAIL: '/users/detail'
};

export const adminUserService = {
  // Lấy danh sách tất cả users
  getAllUsers: async () => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.LIST_USERS);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Cập nhật trạng thái user (active/inactive/banned)
  updateUserStatus: async (userId) => {
    try {
      const response = await httpClient.put(`${API_ENDPOINTS.UPDATE_USER_STATUS}/${userId}`, {});
      return response.data;
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  },

  // Xóa user (nếu backend hỗ trợ)
  deleteUser: async (userId) => {
    try {
      const response = await httpClient.delete(`${API_ENDPOINTS.DELETE_USER}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Lấy chi tiết một user (nếu backend hỗ trợ)
  getUserDetail: async (userId) => {
    try {
      const response = await httpClient.get(`${API_ENDPOINTS.USER_DETAIL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user detail:', error);
      throw error;
    }
  }
};