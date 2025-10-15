// Simple notification service cho các thông báo hệ thống

export class NotificationService {
  static showError(message, duration = 5000) {
    const notification = document.createElement('div');
    notification.className = 'system-notification error';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">⚠️</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    // Add styles if not exists
    if (!document.querySelector('#notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        .system-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(220, 38, 38, 0.95);
          color: white;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 10000;
          max-width: 400px;
          font-family: Arial, sans-serif;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        .notification-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .notification-icon {
          font-size: 18px;
        }
        .notification-message {
          flex: 1;
          font-size: 14px;
        }
        .notification-close {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s;
        }
        .notification-close:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, duration);
    }

    return notification;
  }

  static showSuccess(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'system-notification success';
    notification.style.background = 'rgba(34, 197, 94, 0.95)';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">✅</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    document.body.appendChild(notification);

    if (duration > 0) {
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, duration);
    }

    return notification;
  }

  static showInfo(message, duration = 4000) {
    const notification = document.createElement('div');
    notification.className = 'system-notification info';
    notification.style.background = 'rgba(59, 130, 246, 0.95)';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">ℹ️</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    document.body.appendChild(notification);

    if (duration > 0) {
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, duration);
    }

    return notification;
  }
}

export default NotificationService;