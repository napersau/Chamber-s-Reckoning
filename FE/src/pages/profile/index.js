import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../services/localStorageService';
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  Target, 
  Award, 
  Edit3, 
  LogOut,
  Shield,
  Gamepad2,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';
import './styles.css';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserInfo({
        name: decoded.sub || decoded.username || 'User',
        email: decoded.email || 'user@example.com',
        username: decoded.sub || decoded.username || 'username',
        role: decoded.scope?.name || 'USER',
        avatar: (decoded.sub || decoded.username || 'User').charAt(0).toUpperCase(),
        joinDate: decoded.iat ? new Date(decoded.iat * 1000).toLocaleDateString('vi-VN') : 'N/A',
        // Mock game stats
        gameStats: {
          totalGames: 24,
          wins: 15,
          losses: 9,
          winRate: 62.5,
          currentStreak: 3,
          bestStreak: 7,
          totalPlayTime: '12h 45m',
          rank: 'Shooter Elite'
        }
      });
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/login');
      return;
    }
    
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleEditProfile = () => {
    // Logic to edit profile
    console.log('Edit profile');
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner">
          <User size={48} className="spinning" />
          <h3>Đang tải hồ sơ...</h3>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="profile-error">
        <h3>Không thể tải thông tin hồ sơ</h3>
        <button onClick={() => navigate('/login')}>Đăng nhập lại</button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {userInfo.avatar}
            </div>
            <div className="profile-basic-info">
              <h1 className="profile-name">{userInfo.name}</h1>
              <div className="profile-username">@{userInfo.username}</div>
              <div className="profile-role">
                {userInfo.role === 'ADMIN' ? (
                  <>
                    <Shield size={14} />
                    <span>Administrator</span>
                  </>
                ) : (
                  <>
                    <User size={14} />
                    <span>Player</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="edit-profile-btn" onClick={handleEditProfile}>
              <Edit3 size={16} />
              Chỉnh sửa
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="profile-nav">
          <button 
            className={`nav-tab ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <User size={18} />
            Thông tin
          </button>
          <button 
            className={`nav-tab ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <Trophy size={18} />
            Thống kê
          </button>
          <button 
            className={`nav-tab ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            <Award size={18} />
            Thành tích
          </button>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {activeTab === 'info' && (
            <div className="profile-info-tab">
              <div className="info-card">
                <h3>Thông tin cá nhân</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <Mail size={18} />
                    <div className="info-details">
                      <span className="info-label">Email</span>
                      <span className="info-value">{userInfo.email}</span>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <User size={18} />
                    <div className="info-details">
                      <span className="info-label">Tên đăng nhập</span>
                      <span className="info-value">{userInfo.username}</span>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <Calendar size={18} />
                    <div className="info-details">
                      <span className="info-label">Ngày tham gia</span>
                      <span className="info-value">{userInfo.joinDate}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <Shield size={18} />
                    <div className="info-details">
                      <span className="info-label">Vai trò</span>
                      <span className="info-value">{userInfo.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="profile-stats-tab">
              <div className="stats-overview">
                <div className="stat-card">
                  <div className="stat-icon games">
                    <Gamepad2 size={24} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">{userInfo.gameStats.totalGames}</span>
                    <span className="stat-label">Tổng số trận</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon wins">
                    <Trophy size={24} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">{userInfo.gameStats.wins}</span>
                    <span className="stat-label">Thắng</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon rate">
                    <TrendingUp size={24} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">{userInfo.gameStats.winRate}%</span>
                    <span className="stat-label">Tỷ lệ thắng</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon time">
                    <Clock size={24} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">{userInfo.gameStats.totalPlayTime}</span>
                    <span className="stat-label">Thời gian chơi</span>
                  </div>
                </div>
              </div>

              <div className="detailed-stats">
                <div className="stats-card">
                  <h3>Chi tiết thống kê</h3>
                  <div className="stats-list">
                    <div className="stats-item">
                      <span className="stats-label">Chuỗi thắng hiện tại:</span>
                      <span className="stats-value">{userInfo.gameStats.currentStreak} trận</span>
                    </div>
                    <div className="stats-item">
                      <span className="stats-label">Chuỗi thắng tốt nhất:</span>
                      <span className="stats-value">{userInfo.gameStats.bestStreak} trận</span>
                    </div>
                    <div className="stats-item">
                      <span className="stats-label">Thua:</span>
                      <span className="stats-value">{userInfo.gameStats.losses} trận</span>
                    </div>
                    <div className="stats-item">
                      <span className="stats-label">Hạng hiện tại:</span>
                      <span className="stats-value rank">{userInfo.gameStats.rank}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="profile-achievements-tab">
              <div className="achievements-grid">
                <div className="achievement-card unlocked">
                  <div className="achievement-icon">🏆</div>
                  <div className="achievement-info">
                    <h4>Chiến thắng đầu tiên</h4>
                    <p>Giành chiến thắng trong trận đầu tiên</p>
                    <span className="achievement-date">Đã mở khóa</span>
                  </div>
                </div>

                <div className="achievement-card unlocked">
                  <div className="achievement-icon">🎯</div>
                  <div className="achievement-info">
                    <h4>Xạ thủ may mắn</h4>
                    <p>Sống sót 5 lần liên tiếp</p>
                    <span className="achievement-date">Đã mở khóa</span>
                  </div>
                </div>

                <div className="achievement-card locked">
                  <div className="achievement-icon">👑</div>
                  <div className="achievement-info">
                    <h4>Vua Russian Roulette</h4>
                    <p>Thắng 100 trận</p>
                    <span className="achievement-progress">Progress: 15/100</span>
                  </div>
                </div>

                <div className="achievement-card locked">
                  <div className="achievement-icon">⚡</div>
                  <div className="achievement-info">
                    <h4>Chuỗi thắng huyền thoại</h4>
                    <p>Thắng 10 trận liên tiếp</p>
                    <span className="achievement-progress">Progress: 3/10</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
