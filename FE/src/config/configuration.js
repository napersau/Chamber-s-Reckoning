export const OAuthConfig = {};

export const CONFIG = {
  API_GATEWAY: "http://localhost:8080/api/v1",
};

export const API = {
  LOGIN: "/identity/auth/token",
  MY_INFO: "/users/my-info",
  MY_POST: "/post/my-posts",
  CREATE_POST: "/post/create",
  UPDATE_PROFILE: "/profile/users/my-profile",
  UPDATE_AVATAR: "/profile/users/avatar",
  GET_USER: (userId) => `/users/${userId}`,
  SEARCH_USER: "/users/search",
  GET_ALL_USERS: "/users",
  TOGGLE_ACTIVE_USER: "/users/update",
  POST_SHARE: "/post-share",


  FRIENDSHIP: "/friendship",
  NOTIFICATIONS: "/notifications",

  FORGOT_PASSWORD: "/email/forgot-password",
  VERIFY_OTP: "/email/verify-otp",
  RESET_PASSWORD: "/email/reset-password",
};