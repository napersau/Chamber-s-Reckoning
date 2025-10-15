import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../services/localStorageService';
import { 
  Users, 
  Gamepad2,
  CreditCard, 
  LogOut,
  Bell,
  Shield
} from 'lucide-react';
import './styles.css';

const AdminHome = () => {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [notifications, setNotifications] = useState(3);

  // Get current admin info from token
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentAdmin({
          name: decoded.sub || decoded.username || 'Admin',
          role: decoded.scope?.name || 'ADMIN',
          avatar: (decoded.sub || decoded.username || 'Admin').charAt(0).toUpperCase()
        });
        console.log('Admin user info:', decoded);
      } catch (error) {
        console.error('Lỗi decode token trong AdminHome:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };





  return (
    <div className="admin-container">
      <div className="admin-main">
        {/* Header */}
        <div className="admin-header">
          <div className="header-left">
            <h1>
              <Shield size={24} />
              Admin Dashboard
            </h1>
          </div>
          
          <div className="header-right">
            <div className="notifications">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </div>
            <div className="admin-profile">
              <div className="profile-info">
                <span className="profile-name">
                  {currentAdmin?.name || 'Admin User'}
                </span>
                <span className="profile-role">
                  <Shield size={12} />
                  {currentAdmin?.role || 'ADMIN'}
                </span>
              </div>
              <div className="profile-avatar">
                {currentAdmin?.avatar || 'A'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-content">
          <div className="admin-welcome">
            <h2>Chào mừng bạn đến với trang quản trị</h2>
            <p>Chọn một chức năng quản lý bên dưới</p>
          </div>

          <div className="admin-menu-grid">
            <div className="admin-menu-card" onClick={() => navigate('/admin/user')}>
              <div className="menu-card-icon">
                <Users size={48} />
              </div>
              <div className="menu-card-content">
                <h3>Quản lý User</h3>
                <p>Quản lý thông tin người dùng, cập nhật trạng thái tài khoản</p>
              </div>
              <div className="menu-card-arrow">→</div>
            </div>

            <div className="admin-menu-card" onClick={() => navigate('/admin/room')}>
              <div className="menu-card-icon">
                <Gamepad2 size={48} />
              </div>
              <div className="menu-card-content">
                <h3>Quản lý Phòng</h3>
                <p>Quản lý phòng chơi, theo dõi hoạt động game</p>
              </div>
              <div className="menu-card-arrow">→</div>
            </div>

            <div className="admin-menu-card" onClick={() => navigate('/admin/card')}>
              <div className="menu-card-icon">
                <CreditCard size={48} />
              </div>
              <div className="menu-card-content">
                <h3>Quản lý Card</h3>
                <p>Quản lý thẻ game, cài đặt giá trị và ưu đãi</p>
              </div>
              <div className="menu-card-arrow">→</div>
            </div>
          </div>

          <div className="admin-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
