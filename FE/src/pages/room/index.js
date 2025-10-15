import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Play, 
  Lock, 
  Unlock,
  Clock,
  Trophy,
  Star,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { roomService } from '../../services/roomService';
import CreateRoomModal from '../../components/CreateRoomModal';
import RoomDetailModal from '../../components/RoomDetailModal';
import './styles.css';

const Room = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  // Load rooms từ API khi component mount
  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await roomService.getAllRooms();
      
      if (result.success) {
        setRooms(result.data || []);
        console.log('Loaded rooms:', result.data);
      } else {
        setError('Không thể tải danh sách phòng: ' + result.message);
      }
    } catch (error) {
      console.error('Error loading rooms:', error);
      setError('Lỗi khi tải danh sách phòng: ' + (error.message || 'Không thể kết nối đến server'));
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async (roomId) => {
    try {
      const result = await roomService.joinRoom(roomId);
      if (result.success) {
        // Join thành công, chuyển đến game
        navigate(`/game?room=${roomId}`);
      } else {
        alert('Không thể tham gia phòng: ' + result.message);
      }
    } catch (error) {
      console.error('Error joining room:', error);
      alert('Lỗi khi tham gia phòng: ' + (error.message || 'Không thể kết nối đến server'));
    }
  };

  const handleCreateRoom = () => {
    setShowCreateModal(true);
  };

  const handleRoomCreated = (newRoom) => {
    console.log('Room created successfully:', newRoom);
    // Reload rooms list to show the new room
    loadRooms();
    // Optionally navigate to the game room
    if (newRoom && newRoom.id) {
      navigate(`/game?room=${newRoom.id}`);
    }
  };

  const handleViewRoom = (roomId) => {
    console.log('handleViewRoom called with roomId:', roomId, typeof roomId);
    
    // Validate roomId - có thể là String (MongoDB ObjectId) hoặc Number
    if (roomId && (typeof roomId === 'string' || typeof roomId === 'number')) {
      // QUAN TRỌNG: Set roomId TRƯỚC, rồi mới mở modal
      setSelectedRoomId(roomId);
      // React 18 batches these, nhưng thứ tự vẫn đảm bảo
      setShowDetailModal(true);
    } else {
      console.error('Invalid roomId:', roomId);
    }
  };

  const handleJoinRoomFromModal = async (joinData) => {
    try {
      // Implement the join room logic
      const response = await roomService.joinRoom(joinData.roomId);
      if (response.success) {
        // Join thành công, chuyển đến game
        navigate(`/game?room=${joinData.roomId}`);
      } else {
        throw new Error(response.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error joining room:', error);
      throw error; // Re-throw to let the modal handle the error display
    }
  };

  // Helper function để map status từ backend
  const mapRoomStatus = (status) => {
    switch (status?.toUpperCase()) {
      case 'WAITING': return 'active';
      case 'IN_PROGRESS': return 'active';
      case 'COMPLETED': return 'full';
      default: return 'active';
    }
  };

  // Helper function để format thời gian
  const formatCreatedTime = (createdAt) => {
    if (!createdAt) return 'Không rõ';
    
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) return 'Vừa tạo';
    if (diffMinutes < 60) return `${diffMinutes} phút trước`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} giờ trước`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} ngày trước`;
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = (room.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (room.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    
    const mappedStatus = mapRoomStatus(room.status);
    return matchesSearch && mappedStatus === filterStatus;
  });

  const getLevelIcon = (level) => {
    switch (level) {
      case 'beginner': return '🟢';
      case 'normal': return '🟡';
      case 'expert': return '🟠';
      case 'vip': return '🔴';
      default: return '⚪';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return '#10b981';
      case 'normal': return '#f59e0b';
      case 'expert': return '#ef4444';
      case 'vip': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <div className="room-page">
      <div className="room-container">
        {/* Header */}
        <div className="room-header">
          <div className="room-title">
            <h1>Phòng chơi</h1>
            <p>Tham gia hoặc tạo phòng chơi Russian Roulette</p>
          </div>
          
          <button className="create-room-btn" onClick={handleCreateRoom}>
            <Plus size={20} />
            Tạo phòng mới
          </button>
        </div>

        {/* Filters */}
        <div className="room-filters">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm phòng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              Tất cả
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
              onClick={() => setFilterStatus('active')}
            >
              Đang chơi
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'full' ? 'active' : ''}`}
              onClick={() => setFilterStatus('full')}
            >
              Đầy phòng
            </button>
            
            <button 
              className="refresh-btn"
              onClick={loadRooms}
              disabled={loading}
              title="Làm mới danh sách"
            >
              <RefreshCw size={16} className={loading ? 'spinning' : ''} />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <RefreshCw className="loading-icon" size={40} />
            <p>Đang tải danh sách phòng...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <AlertCircle size={40} className="error-icon" />
            <h3>Có lỗi xảy ra</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={loadRooms}>
              <RefreshCw size={16} />
              Thử lại
            </button>
          </div>
        )}

        {/* Room Grid */}
        {!loading && !error && (
          <div className="room-grid">
            {filteredRooms.map(room => {
              const mappedStatus = mapRoomStatus(room.status);
              return (
            <div key={room.id} className={`room-card ${mappedStatus}`}>
              <div className="room-card-header">
                <div className="room-info">
                  <div className="room-name-section">
                    <h3 className="room-name">{room.name || 'Phòng không tên'}</h3>
                    <div className="room-level" style={{ color: getLevelColor('normal') }}>
                      <span className="level-icon">{getLevelIcon('normal')}</span>
                      <span className="level-text">Phòng thường</span>
                    </div>
                  </div>
                  
                  <div className="room-privacy">
                    {room.isPrivate ? (
                      <Lock size={16} className="privacy-icon private" />
                    ) : (
                      <Unlock size={16} className="privacy-icon public" />
                    )}
                  </div>
                </div>

                <div className="room-status-badge">
                  {room.status === 'WAITING' && <span className="status active">Chờ người chơi</span>}
                  {room.status === 'IN_PROGRESS' && <span className="status active">Đang chơi</span>}
                  {room.status === 'COMPLETED' && <span className="status full">Đã kết thúc</span>}
                  {!room.status && <span className="status active">Hoạt động</span>}
                </div>
              </div>

              <div className="room-description">
                <p>{room.description || 'Không có mô tả'}</p>
              </div>

              <div className="room-details">
                <div className="detail-item">
                  <Users size={16} />
                  <span>{room.currentPlayers || 0}/{room.maxPlayers || 6} người chơi</span>
                </div>
                
                <div className="detail-item">
                  <Trophy size={16} />
                  <span>ID: #{room.id}</span>
                </div>
                
                <div className="detail-item">
                  <Clock size={16} />
                  <span>Tạo {formatCreatedTime(room.createdAt)}</span>
                </div>
              </div>

              <div className="room-host">
                <span className="host-label">Chủ phòng:</span>
                <span className="host-name">{room.createdBy?.username || room.createdBy?.name || 'Unknown'}</span>
              </div>

              <div className="room-actions">
                <button 
                  className="action-btn view-btn"
                  onClick={() => handleViewRoom(room.id)}
                >
                  <Eye size={16} />
                  Xem chi tiết
                </button>
                
                <button 
                  className={`action-btn join-btn ${mappedStatus === 'full' ? 'disabled' : ''}`}
                  onClick={() => handleJoinRoom(room.id)}
                  disabled={mappedStatus === 'full'}
                >
                  <Play size={16} />
                  {mappedStatus === 'full' ? 'Phòng đầy' : 'Tham gia'}
                </button>
              </div>
            </div>
            );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredRooms.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <h3>Không tìm thấy phòng nào</h3>
            <p>Thử thay đổi từ khóa tìm kiếm hoặc tạo phòng mới</p>
            <button className="create-room-btn" onClick={handleCreateRoom}>
              <Plus size={20} />
              Tạo phòng mới
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateRoomModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onRoomCreated={handleRoomCreated}
      />

      <RoomDetailModal 
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedRoomId(null);
        }}
        roomId={selectedRoomId}
        onJoinRoom={handleJoinRoomFromModal}
      />
    </div>
  );
};

export default Room;