import httpClient from "../config/httpClient";
import { API } from "../config/configuration";

export const getMyInfo = async () => {
  return await httpClient.get(API.MY_INFO);
};

export const updateProfile = async (profileData) => {
  return await httpClient.put(API.UPDATE_PROFILE, profileData);
};

export const uploadAvatar = async (formData) => {
  return await httpClient.put(API.UPDATE_AVATAR, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const searchUsers = async (keyword) => {
  return await httpClient.post(API.SEARCH_USER, { username: keyword });
};

export const searchUsersByFullName = async (keyword) => {
  return await httpClient.post(API.SEARCH_USER_BY_FULLNAME, { fullName: keyword });
};

export const getUserById = async (userId) => {
  return await httpClient.get(API.GET_USER(userId));
};

export const getAllUsers = async () => {
  return await httpClient.get(API.GET_ALL_USERS);
};

export const toggleActiveUser = async (userId) => {
  return await httpClient.post(`${API.TOGGLE_ACTIVE_USER}/${userId}`, null);
};