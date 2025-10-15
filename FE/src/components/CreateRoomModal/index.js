import React, { useState } from 'react';
import { X, Lock, Unlock, Users, FileText, Settings, AlertCircle, Trophy } from 'lucide-react';
import { roomService } from '../../services/roomService';
import './styles.css';

const CreateRoomModal = ({ isOpen, onClose, onRoomCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    round: 5,
    maxPlayers: 6,
    currentPlayers: 0,
    status: 'WAITING',
    gameMode: 'classic',
    map: 'dungeon',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'Tên phòng không được để trống';
    }
    if (formData.name.length < 3) {
      return 'Tên phòng phải có ít nhất 3 ký tự';
    }
    if (formData.maxPlayers < 2 || formData.maxPlayers > 10) {
      return 'Số người chơi phải từ 2 đến 10';
    }
    if (formData.password && formData.password.length < 4) {
      return 'Mật khẩu phải có ít nhất 4 ký tự';
    }
    if (formData.round < 1 || formData.round > 20) {
      return 'Số vòng chơi phải từ 1 đến 20';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Chuẩn bị dữ liệu gửi lên server theo format RoomRequest của backend
      const roomRequest = {
        name: formData.name.trim(),
        round: formData.round,
        maxPlayers: formData.maxPlayers,
        currentPlayers: 0, // Mới tạo nên là 0
        status: 'WAITING', // Status ban đầu
        gameMode: formData.gameMode,
        map: formData.map,
        password: formData.password.trim() || null, // Null nếu không có password
        // createdBy và createdAt sẽ được backend tự động set
        // card và player sẽ được khởi tạo rỗng hoặc backend handle
      };

      const result = await roomService.createRoom(roomRequest);
      
      if (result.success) {
        // Thành công - reset form và đóng modal
        setFormData({
          name: '',
          round: 5,
          maxPlayers: 6,
          currentPlayers: 0,
          status: 'WAITING',
          gameMode: 'classic',
          map: 'dungeon',
          password: ''
        });
        
        if (onRoomCreated) {
          onRoomCreated(result.data);
        }
        
        onClose();
      } else {
        setError(result.message || 'Không thể tạo phòng. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error creating room:', error);
      setError('Có lỗi xảy ra khi tạo phòng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content create-room-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Tạo phòng mới</h2>
          <button 
            className="close-btn" 
            onClick={handleClose}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-room-form">
          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Basic Info */}
          <div className="form-section">
            <h3>Thông tin cơ bản</h3>
            
            <div className="form-group">
              <label htmlFor="name">
                <FileText size={16} />
                Tên phòng *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập tên phòng..."
                maxLength={50}
                disabled={loading}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="maxPlayers">
                  <Users size={16} />
                  Số người chơi tối đa
                </label>
                <select
                  id="maxPlayers"
                  name="maxPlayers"
                  value={formData.maxPlayers}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value={2}>2 người</option>
                  <option value={3}>3 người</option>
                  <option value={4}>4 người</option>
                  <option value={5}>5 người</option>
                  <option value={6}>6 người</option>
                  <option value={7}>7 người</option>
                  <option value={8}>8 người</option>
                  <option value={9}>9 người</option>
                  <option value={10}>10 người</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="round">
                  <Trophy size={16} />
                  Số vòng chơi
                </label>
                <select
                  id="round"
                  name="round"
                  value={formData.round}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value={3}>3 vòng</option>
                  <option value={5}>5 vòng</option>
                  <option value={7}>7 vòng</option>
                  <option value={10}>10 vòng</option>
                  <option value={15}>15 vòng</option>
                  <option value={20}>20 vòng</option>
                </select>
              </div>
            </div>
          </div>

          {/* Game Settings */}
          <div className="form-section">
            <h3>
              <Settings size={16} />
              Cài đặt trò chơi
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gameMode">Chế độ chơi</label>
                <select
                  id="gameMode"
                  name="gameMode"
                  value={formData.gameMode}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="classic">🎯 Classic</option>
                  <option value="ranked">🏆 Ranked</option>
                  <option value="custom">⚙️ Custom</option>
                  <option value="tournament">👑 Tournament</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="map">Bản đồ</label>
                <select
                  id="map"
                  name="map"
                  value={formData.map}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="dungeon">🏰 Dungeon</option>
                  <option value="arena">⚔️ Arena</option>
                  <option value="forest">🌲 Forest</option>
                  <option value="castle">🏯 Castle</option>
                  <option value="temple">⛩️ Temple</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="form-section">
            <h3>
              <Lock size={16} />
              Bảo mật phòng
            </h3>
            
            <div className="form-group">
              <label htmlFor="password">
                {formData.password ? <Lock size={16} /> : <Unlock size={16} />}
                Mật khẩu phòng (tùy chọn)
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Để trống nếu phòng công khai..."
                maxLength={20}
                disabled={loading}
              />
              <small style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
                {formData.password ? '🔒 Phòng riêng tư' : '🌐 Phòng công khai'}
              </small>
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={handleClose}
              disabled={loading}
            >
              Hủy
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
            >
              {loading ? 'Đang tạo...' : 'Tạo phòng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;