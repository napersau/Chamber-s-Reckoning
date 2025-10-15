import React, { useState, useEffect } from 'react';
import { 
  X, 
  Users, 
  Clock, 
  Lock, 
  Unlock, 
  Play, 
  Eye, 
  Settings, 
  Trophy,
  Calendar,
  User,
  Shield,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { roomService } from '../../services/roomService';
import './styles.css';

const RoomDetailModal = ({ isOpen, onClose, roomId, onJoinRoom }) => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [joinPassword, setJoinPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [lastLoadedRoomId, setLastLoadedRoomId] = useState(null);

  useEffect(() => {
    console.log('RoomDetailModal useEffect:', { isOpen, roomId, lastLoadedRoomId });
    
    // Chỉ làm việc khi modal đang mở
    if (!isOpen) {
      // Reset khi modal đóng
      setRoom(null);
      setError('');
      setJoinPassword('');
      setShowPasswordInput(false);
      setLastLoadedRoomId(null);
      return;
    }
    
    // Validate roomId - có thể là String (MongoDB ObjectId) hoặc Number
    const isValidRoomId = roomId && (typeof roomId === 'string' || (typeof roomId === 'number' && roomId > 0));
    
    // Nếu có roomId hợp lệ VÀ chưa load roomId này
    if (isValidRoomId && roomId !== lastLoadedRoomId) {
      loadRoomDetail();
      setLastLoadedRoomId(roomId);
    } else if (!isValidRoomId) {
      // Modal mở nhưng chưa có roomId - chờ roomId được set
      console.log('Waiting for valid roomId...');
    }
  }, [isOpen, roomId]);

  const loadRoomDetail = async () => {
    console.log('Loading room detail for roomId:', roomId);
    
    try {
      setLoading(true);
      setError('');
      
      const result = await roomService.getRoomById(roomId);
      console.log('Room detail result:', result);
      
      if (result.success) {
        setRoom(result.data);
        console.log('Room data loaded:', result.data);
      } else {
        const errorMsg = result.message || 'Không thể tải thông tin phòng';
        console.error('Failed to load room:', errorMsg);
        setError(errorMsg);
      }
    } catch (error) {
      console.error('Error loading room detail:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi tải thông tin phòng';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (room?.isPrivate && !joinPassword.trim()) {
      setShowPasswordInput(true);
      return;
    }

    try {
      setLoading(true);
      
      // Gọi service join room với password nếu cần
      const joinData = room?.isPrivate ? { roomId, password: joinPassword } : { roomId };
      
      if (onJoinRoom) {
        await onJoinRoom(joinData);
        handleClose();
      }
    } catch (error) {
      console.error('Error joining room:', error);
      setError('Không thể tham gia phòng: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setRoom(null);
      setError('');
      setJoinPassword('');
      setShowPasswordInput(false);
      onClose();
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Không rõ';
    
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusInfo = (status) => {
    switch (status?.toUpperCase()) {
      case 'WAITING':
        return { text: 'Chờ người chơi', color: '#10b981', bgColor: '#d1fae5' };
      case 'IN_PROGRESS':
        return { text: 'Đang chơi', color: '#f59e0b', bgColor: '#fef3c7' };
      case 'COMPLETED':
        return { text: 'Đã kết thúc', color: '#6b7280', bgColor: '#f3f4f6' };
      default:
        return { text: 'Hoạt động', color: '#10b981', bgColor: '#d1fae5' };
    }
  };

  const getDifficultyInfo = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return { text: 'Dễ', color: '#10b981', icon: '🟢' };
      case 'normal':
        return { text: 'Bình thường', color: '#f59e0b', icon: '🟡' };
      case 'hard':
        return { text: 'Khó', color: '#ef4444', icon: '🟠' };
      case 'expert':
        return { text: 'Chuyên gia', color: '#8b5cf6', icon: '🔴' };
      default:
        return { text: 'Bình thường', color: '#f59e0b', icon: '🟡' };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content room-detail-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Chi tiết phòng</h2>
          <button 
            className="close-btn" 
            onClick={handleClose}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <div className="room-detail-content">
          {loading && (
            <div className="loading-state">
              <RefreshCw className="loading-icon" size={24} />
              <p>Đang tải thông tin phòng...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <AlertCircle size={20} />
              <p>{error}</p>
              <button className="retry-btn" onClick={loadRoomDetail}>
                <RefreshCw size={16} />
                Thử lại
              </button>
            </div>
          )}

          {!loading && !error && room && (
            <>
              {/* Room Header */}
              <div className="room-header-detail">
                <div className="room-title-section">
                  <h3 className="room-name">{room.name}</h3>
                  <div className="room-badges">
                    <span 
                      className="status-badge"
                      style={{ 
                        color: getStatusInfo(room.status).color,
                        backgroundColor: getStatusInfo(room.status).bgColor
                      }}
                    >
                      {getStatusInfo(room.status).text}
                    </span>
                    <div className="privacy-badge">
                      {room.isPrivate ? (
                        <>
                          <Lock size={14} />
                          <span>Riêng tư</span>
                        </>
                      ) : (
                        <>
                          <Unlock size={14} />
                          <span>Công khai</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="room-id">
                  <Trophy size={16} />
                  <span>ID: #{room.id}</span>
                </div>
              </div>

              {/* Room Description */}
              {room.description && (
                <div className="room-section">
                  <h4>Mô tả</h4>
                  <p className="room-description">{room.description}</p>
                </div>
              )}

              {/* Room Info Grid */}
              <div className="room-info-grid">
                <div className="info-card">
                  <div className="info-header">
                    <Users size={18} />
                    <span>Người chơi</span>
                  </div>
                  <div className="info-content">
                    <span className="info-main">{room.currentPlayers || 0}/{room.maxPlayers || 6}</span>
                    <span className="info-sub">Đã tham gia</span>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-header">
                    <Calendar size={18} />
                    <span>Thời gian tạo</span>
                  </div>
                  <div className="info-content">
                    <span className="info-main">{formatDateTime(room.createdAt)}</span>
                    <span className="info-sub">Ngày giờ</span>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-header">
                    <User size={18} />
                    <span>Chủ phòng</span>
                  </div>
                  <div className="info-content">
                      <span className="info-main">{room.createdBy?.username || room.createdBy?.name || 'Unknown'}</span>
                      <span className="info-sub">Chủ phòng</span>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-header">
                    <Settings size={18} />
                    <span>Độ khó</span>
                  </div>
                  <div className="info-content">
                    <span className="info-main">
                      {getDifficultyInfo(room.difficulty || room.settings?.difficulty).icon}
                      {getDifficultyInfo(room.difficulty || room.settings?.difficulty).text}
                    </span>
                    <span className="info-sub">Mức độ</span>
                  </div>
                </div>
              </div>

              {/* Game Settings */}
              {room.settings && (
                <div className="room-section">
                  <h4>
                    <Settings size={16} />
                    Cài đặt trò chơi
                  </h4>
                  <div className="settings-grid">
                    {room.settings.timeLimit && (
                      <div className="setting-item">
                        <Clock size={14} />
                        <span>Thời gian: {room.settings.timeLimit}s</span>
                      </div>
                    )}
                    {room.settings.rounds && (
                      <div className="setting-item">
                        <Trophy size={14} />
                        <span>Số lượt: {room.settings.rounds}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Players List */}
              {room.players && room.players.length > 0 && (
                <div className="room-section">
                  <h4>
                    <Users size={16} />
                    Danh sách người chơi ({room.players.length})
                  </h4>
                  <div className="players-list">
                    {room.players.map((player, index) => (
                      <div key={player.id || index} className="player-item">
                        <div className="player-info">
                          <div className="player-avatar">
                            {player.avatar ? (
                              <img src={player.avatar} alt={player.username} />
                            ) : (
                              <User size={16} />
                            )}
                          </div>
                          <span className="player-name">{player.username || player.name}</span>
                        </div>
                        {player.isHost && (
                          <div className="host-badge">
                            <Shield size={12} />
                            <span>Host</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Password Input for Private Room */}
              {room.isPrivate && showPasswordInput && (
                <div className="password-section">
                  <h4>
                    <Lock size={16} />
                    Nhập mật khẩu để tham gia
                  </h4>
                  <div className="password-input-group">
                    <input
                      type="password"
                      value={joinPassword}
                      onChange={(e) => setJoinPassword(e.target.value)}
                      placeholder="Mật khẩu phòng..."
                      className="password-input"
                      disabled={loading}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="modal-actions">
                <button 
                  className="btn-secondary" 
                  onClick={handleClose}
                  disabled={loading}
                >
                  <Eye size={16} />
                  Chỉ xem
                </button>
                
                <button 
                  className="btn-primary" 
                  onClick={handleJoinRoom}
                  disabled={loading || room.status === 'COMPLETED' || (room.currentPlayers >= room.maxPlayers)}
                >
                  <Play size={16} />
                  {loading ? 'Đang tham gia...' : 
                   room.status === 'COMPLETED' ? 'Đã kết thúc' :
                   (room.currentPlayers >= room.maxPlayers) ? 'Phòng đầy' : 'Tham gia'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModal;