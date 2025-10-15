import axios from "axios";
import { CONFIG } from "./configuration";

const httpClient = axios.create({
  baseURL: CONFIG.API_GATEWAY,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor để tự động thêm token
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý token expired
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Nếu response có status 401 (Unauthorized) hoặc 403 (Forbidden)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log("🔑 Token đã hết hạn hoặc không có quyền truy cập");
      
      // Hiển thị thông báo cho user
      const message = error.response.status === 401 
        ? "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!" 
        : "Bạn không có quyền truy cập tính năng này!";
      
      // Tạo notification đơn giản
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(220, 38, 38, 0.95);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-family: Arial, sans-serif;
        font-size: 14px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      `;
      notification.innerHTML = `⚠️ ${message}`;
      document.body.appendChild(notification);

      // Xóa notification sau 3 giây
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 3000);

      // Xóa token khỏi localStorage
      localStorage.removeItem("token");
      
      // Chuyển hướng về trang login sau một chút delay để user đọc được thông báo
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
    return Promise.reject(error);
  }
);

export default httpClient;