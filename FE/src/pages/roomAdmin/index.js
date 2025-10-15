import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminRoomService } from '../../services/admin/roomService';
import { 
  Users, 
  LogOut,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  RefreshCw,
  Shield,
  ArrowLeft,
  AlertCircle,
  Gamepad2,
  CreditCard,
  X,
  Clock,
  MapPin,
  Activity,
  UserCheck,
  Zap
} from 'lucide-react';
import './styles.css';

const RoomAdmin = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Load rooms từ API
  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminRoomService.getAllRooms();
      
      if (response.code === 1000) {
        setRooms(response.result || []);
        console.log('Loaded rooms:', response.result);
      } else {
        setError('Không thể tải danh sách phòng: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error loading rooms:', error);
      setError('Lỗi khi tải danh sách phòng: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phòng này?')) {
      return;
    }
    
    try {
      const response = await adminRoomService.deleteRoom(roomId);
      
      if (response.code === 1000) {
        await loadRooms();
        alert('Xóa phòng thành công!');
      } else {
        setError('Không thể xóa phòng: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      setError('Lỗi khi xóa phòng: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleViewRoomDetail = async (roomId) => {
    try {
      const response = await adminRoomService.getRoomById(roomId);
      
      if (response.code === 1000) {
        setSelectedRoom(response.result);
        setShowDetailModal(true);
      }
    } catch (error) {
      console.error('Error fetching room detail:', error);
      setError('Lỗi khi lấy thông tin chi tiết phòng');
    }
  };

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.id?.toString().includes(searchTerm);
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && room.status === filterStatus;
  });

  const getStatusText = (status) => {
    switch (status) {
      case 'ACTIVE': return 'Đang hoạt động';
      case 'WAITING': return 'Đang chờ';
      case 'IN_GAME': return 'Đang chơi';
      case 'FINISHED': return 'Đã kết thúc';
      case 'CLOSED': return 'Đã đóng';
      default: return 'Không xác định';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'ACTIVE': return 'active';
      case 'WAITING': return 'waiting';
      case 'IN_GAME': return 'in-game';
      case 'FINISHED': return 'finished';
      case 'CLOSED': return 'closed';
      default: return 'inactive';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACTIVE': return <Activity size={14} />;
      case 'WAITING': return <Clock size={14} />;
      case 'IN_GAME': return <Zap size={14} />;
      case 'FINISHED': return <UserCheck size={14} />;
      case 'CLOSED': return <X size={14} />;
      default: return <MapPin size={14} />;
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar open">
        <div className="sidebar-header">
          <div className="admin-logo">
            <Shield size={32} />
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className="nav-item"
            onClick={() => navigate('/admin/user')}
          >
            <Users size={20} />
            <span>Quản lý User</span>
          </button>
          <button
            className="nav-item active"
            onClick={() => navigate('/admin/room')}
          >
            <Gamepad2 size={20} />
            <span>Quản lý Phòng</span>
          </button>
          <button
            className="nav-item"
            onClick={() => navigate('/admin/card')}
          >
            <CreditCard size={20} />
            <span>Quản lý Card</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="back-btn" onClick={() => navigate('/admin')}>
            <ArrowLeft size={20} />
            <span>Quay lại Dashboard</span>
          </button>
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}>
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-header">
          <div className="header-left">
            <h1>Quản lý Phòng Game</h1>
          </div>
          
          <div className="header-right">
            <button className="refresh-btn" onClick={loadRooms}>
              <RefreshCw size={16} />
              Làm mới
            </button>
          </div>
        </div>

        <div className="admin-content">
          {/* Error Message */}
          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{error}</span>
              <button onClick={() => setError(null)}>×</button>
            </div>
          )}

          {/* Content Header */}
          <div className="content-header">
            <div className="header-actions">
              <div className="search-box">
                <Search size={16} />
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
                  className={`filter-btn ${filterStatus === 'ACTIVE' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('ACTIVE')}
                >
                  Hoạt động
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'WAITING' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('WAITING')}
                >
                  Đang chờ
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'IN_GAME' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('IN_GAME')}
                >
                  Đang chơi
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'FINISHED' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('FINISHED')}
                >
                  Đã kết thúc
                </button>
              </div>

              <button className="add-btn">
                <Plus size={16} />
                Tạo phòng mới
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="loading-state">
              <RefreshCw size={32} className="spinning" />
              <p>Đang tải danh sách phòng...</p>
            </div>
          ) : (
            /* Rooms Grid */
            <div className="rooms-grid">
              {filteredRooms.length > 0 ? (
                filteredRooms.map(room => (
                  <div key={room.id} className={`room-card ${getStatusClass(room.status)}`}>
                    <div className="room-header">
                      <div className="room-info">
                        <h3 className="room-name">{room.name || `Phòng #${room.id}`}</h3>
                        <div className="room-id">ID: {room.id}</div>
                      </div>
                      <div className={`room-status ${getStatusClass(room.status)}`}>
                        {getStatusIcon(room.status)}
                        <span>{getStatusText(room.status)}</span>
                      </div>
                    </div>
                    
                    <div className="room-body">
                      <div className="room-stats">
                        <div className="stat-item">
                          <span className="stat-label">Người chơi:</span>
                          <span className="stat-value">
                            {room.currentPlayers || 0}/{room.maxPlayers || 6}
                          </span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Chủ phòng:</span>
                          <span className="stat-value">{room.hostName || 'N/A'}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Tạo lúc:</span>
                          <span className="stat-value">
                            {room.createdAt ? new Date(room.createdAt).toLocaleString('vi-VN') : 'N/A'}
                          </span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Cập nhật:</span>
                          <span className="stat-value">
                            {room.updatedAt ? new Date(room.updatedAt).toLocaleString('vi-VN') : 'N/A'}
                          </span>
                        </div>
                      </div>
                      
                      {room.description && (
                        <div className="room-description">
                          <p>{room.description}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="room-actions">
                      <button 
                        className="action-btn view"
                        onClick={() => handleViewRoomDetail(room.id)}
                        title="Xem chi tiết"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        className="action-btn edit"
                        title="Chỉnh sửa"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDeleteRoom(room.id)}
                        title="Xóa phòng"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-message">
                  {searchTerm ? 'Không tìm thấy phòng nào' : 'Chưa có phòng nào'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Room Detail Modal */}
      {showDetailModal && selectedRoom && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Chi tiết Phòng</h2>
              <button className="close-btn" onClick={() => setShowDetailModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className={`room-detail ${getStatusClass(selectedRoom.status)}`}>
                <div className="detail-header">
                  <div className="room-info">
                    <h3>{selectedRoom.name || `Phòng #${selectedRoom.id}`}</h3>
                    <div className="room-id">ID: {selectedRoom.id}</div>
                  </div>
                  <div className={`room-status ${getStatusClass(selectedRoom.status)}`}>
                    {getStatusIcon(selectedRoom.status)}
                    <span>{getStatusText(selectedRoom.status)}</span>
                  </div>
                </div>
                
                {selectedRoom.description && (
                  <div className="description">
                    <p>{selectedRoom.description}</p>
                  </div>
                )}
                
                <div className="detail-stats">
                  <div className="stat-group">
                    <h4>Thông tin cơ bản</h4>
                    <div className="stat-item">
                      <span className="label">ID Phòng:</span>
                      <span className="value">{selectedRoom.id}</span>
                    </div>
                    <div className="stat-item">
                      <span className="label">Tên phòng:</span>
                      <span className="value">{selectedRoom.name || 'Không có'}</span>
                    </div>
                    <div className="stat-item">
                      <span className="label">Trạng thái:</span>
                      <span className="value">
                        <span className={`status-badge ${getStatusClass(selectedRoom.status)}`}>
                          {getStatusIcon(selectedRoom.status)}
                          {getStatusText(selectedRoom.status)}
                        </span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="stat-group">
                    <h4>Người chơi</h4>
                    <div className="stat-item">
                      <span className="label">Số lượng:</span>
                      <span className="value">
                        {selectedRoom.currentPlayers || 0}/{selectedRoom.maxPlayers || 6}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="label">Chủ phòng:</span>
                      <span className="value">{selectedRoom.hostName || 'N/A'}</span>
                    </div>
                    <div className="stat-item">
                      <span className="label">Host ID:</span>
                      <span className="value">{selectedRoom.hostId || 'N/A'}</span>
                    </div>
                  </div>
                  
                  <div className="stat-group">
                    <h4>Thời gian</h4>
                    <div className="stat-item">
                      <span className="label">Tạo lúc:</span>
                      <span className="value">
                        {selectedRoom.createdAt ? new Date(selectedRoom.createdAt).toLocaleString('vi-VN') : 'N/A'}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="label">Cập nhật:</span>
                      <span className="value">
                        {selectedRoom.updatedAt ? new Date(selectedRoom.updatedAt).toLocaleString('vi-VN') : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomAdmin;
