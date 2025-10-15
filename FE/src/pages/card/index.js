import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminCardService } from '../../services/admin/cardService';
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
  Zap,
  Heart,
  SkipForward,
  Target,
  ShieldCheck,
  Flame
} from 'lucide-react';
import './styles.css';

const CardManagement = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Form data cho tạo card mới
  const [newCard, setNewCard] = useState({
    name: '',
    description: '',
    cardType: 'SHIELD',
    effectCode: '',
    value: 1,
    rarity: 'COMMON',
    cost: 1
  });

  // Load cards từ API
  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminCardService.getAllCards();
      
      if (response.code === 1000) {
        setCards(response.result || []);
        console.log('Loaded cards:', response.result);
      } else {
        setError('Không thể tải danh sách card: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error loading cards:', error);
      setError('Lỗi khi tải danh sách card: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCard = async () => {
    try {
      const response = await adminCardService.createCard(newCard);
      
      if (response.code === 1000) {
        await loadCards();
        setShowCreateModal(false);
        setNewCard({
          name: '',
          description: '',
          type: 'SHIELD',
          effect: '',
          value: 1,
          rarity: 'COMMON',
          cost: 1
        });
        alert('Tạo card thành công!');
      } else {
        setError('Không thể tạo card: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating card:', error);
      setError('Lỗi khi tạo card: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa card này?')) {
      return;
    }
    
    try {
      const response = await adminCardService.deleteCard(cardId);
      
      if (response.code === 1000) {
        await loadCards();
        alert('Xóa card thành công!');
      } else {
        setError('Không thể xóa card: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      setError('Lỗi khi xóa card: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleViewCardDetail = async (cardId) => {
    try {
      const response = await adminCardService.getCardById(cardId);
      
      if (response.code === 1000) {
        setSelectedCard(response.result);
        setShowDetailModal(true);
      }
    } catch (error) {
      console.error('Error fetching card detail:', error);
      setError('Lỗi khi lấy thông tin chi tiết card');
    }
  };

  // Filter cards
  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.effect?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && card.type === filterType;
  });

  const getCardTypeIcon = (type) => {
    switch (type) {
      case 'SHIELD': return <ShieldCheck size={16} />;
      case 'SKIP': return <SkipForward size={16} />;
      case 'HEAL': return <Heart size={16} />;
      case 'DAMAGE_BOOST': return <Target size={16} />;
      case 'FIRE': return <Flame size={16} />;
      default: return <Zap size={16} />;
    }
  };

  const getCardTypeText = (type) => {
    switch (type) {
      case 'SHIELD': return 'Lá chắn';
      case 'SKIP': return 'Bỏ qua lượt';
      case 'HEAL': return 'Hồi máu';
      case 'DAMAGE_BOOST': return 'Tăng sát thương';
      case 'FIRE': return 'Lửa';
      default: return 'Khác';
    }
  };

  const getRarityClass = (rarity) => {
    switch (rarity) {
      case 'COMMON': return 'common';
      case 'RARE': return 'rare';
      case 'EPIC': return 'epic';
      case 'LEGENDARY': return 'legendary';
      default: return 'common';
    }
  };

  const getRarityText = (rarity) => {
    switch (rarity) {
      case 'COMMON': return 'Thường';
      case 'RARE': return 'Hiếm';
      case 'EPIC': return 'Sử thi';
      case 'LEGENDARY': return 'Huyền thoại';
      default: return 'Thường';
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
            className="nav-item"
            onClick={() => navigate('/admin/room')}
          >
            <Gamepad2 size={20} />
            <span>Quản lý Phòng</span>
          </button>
          <button
            className="nav-item active"
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
            <h1>Quản lý Card Game</h1>
          </div>
          
          <div className="header-right">
            <button className="refresh-btn" onClick={loadCards}>
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
                  placeholder="Tìm kiếm card..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterType('all')}
                >
                  Tất cả
                </button>
                <button 
                  className={`filter-btn ${filterType === 'SHIELD' ? 'active' : ''}`}
                  onClick={() => setFilterType('SHIELD')}
                >
                  Lá chắn
                </button>
                <button 
                  className={`filter-btn ${filterType === 'SKIP' ? 'active' : ''}`}
                  onClick={() => setFilterType('SKIP')}
                >
                  Bỏ qua
                </button>
                <button 
                  className={`filter-btn ${filterType === 'HEAL' ? 'active' : ''}`}
                  onClick={() => setFilterType('HEAL')}
                >
                  Hồi máu
                </button>
                <button 
                  className={`filter-btn ${filterType === 'DAMAGE_BOOST' ? 'active' : ''}`}
                  onClick={() => setFilterType('DAMAGE_BOOST')}
                >
                  Tăng sát thương
                </button>
              </div>

              <button className="add-btn" onClick={() => setShowCreateModal(true)}>
                <Plus size={16} />
                Thêm Card
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="loading-state">
              <RefreshCw size={32} className="spinning" />
              <p>Đang tải danh sách card...</p>
            </div>
          ) : (
            /* Cards Grid */
            <div className="cards-grid">
              {filteredCards.length > 0 ? (
                filteredCards.map(card => (
                  <div key={card.id} className={`card-item ${getRarityClass(card.rarity)}`}>
                    <div className="card-header">
                      <div className="card-type">
                        {getCardTypeIcon(card.type)}
                        <span>{getCardTypeText(card.type)}</span>
                      </div>
                      <div className={`card-rarity ${getRarityClass(card.rarity)}`}>
                        {getRarityText(card.rarity)}
                      </div>
                    </div>
                    
                    <div className="card-body">
                      <h3 className="card-name">{card.name}</h3>
                      <p className="card-description">{card.description}</p>
                      
                      <div className="card-stats">
                        <div className="card-stat">
                          <span className="stat-label">Hiệu ứng:</span>
                          <span className="stat-value">{card.effect}</span>
                        </div>
                        <div className="card-stat">
                          <span className="stat-label">Giá trị:</span>
                          <span className="stat-value">{card.value}</span>
                        </div>
                        <div className="card-stat">
                          <span className="stat-label">Cost:</span>
                          <span className="stat-value">{card.cost}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-actions">
                      <button 
                        className="action-btn view"
                        onClick={() => handleViewCardDetail(card.id)}
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
                        onClick={() => handleDeleteCard(card.id)}
                        title="Xóa card"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-message">
                  {searchTerm ? 'Không tìm thấy card nào' : 'Chưa có card nào'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Card Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Tạo Card Mới</h2>
              <button className="close-btn" onClick={() => setShowCreateModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Tên Card:</label>
                <input 
                  type="text"
                  value={newCard.name}
                  onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                  placeholder="Nhập tên card"
                />
              </div>
              
              <div className="form-group">
                <label>Mô tả:</label>
                <textarea 
                  value={newCard.description}
                  onChange={(e) => setNewCard({...newCard, description: e.target.value})}
                  placeholder="Nhập mô tả card"
                  rows="3"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Loại Card:</label>
                  <select 
                    value={newCard.type}
                    onChange={(e) => setNewCard({...newCard, type: e.target.value})}
                  >
                    <option value="SHIELD">Lá chắn</option>
                    <option value="SKIP">Bỏ qua lượt</option>
                    <option value="HEAL">Hồi máu</option>
                    <option value="DAMAGE_BOOST">Tăng sát thương</option>
                    <option value="FIRE">Lửa</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Độ hiếm:</label>
                  <select 
                    value={newCard.rarity}
                    onChange={(e) => setNewCard({...newCard, rarity: e.target.value})}
                  >
                    <option value="COMMON">Thường</option>
                    <option value="RARE">Hiếm</option>
                    <option value="EPIC">Sử thi</option>
                    <option value="LEGENDARY">Huyền thoại</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Hiệu ứng:</label>
                <input 
                  type="text"
                  value={newCard.effect}
                  onChange={(e) => setNewCard({...newCard, effect: e.target.value})}
                  placeholder="Mô tả hiệu ứng của card"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Giá trị:</label>
                  <input 
                    type="number"
                    min="1"
                    value={newCard.value}
                    onChange={(e) => setNewCard({...newCard, value: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Cost:</label>
                  <input 
                    type="number"
                    min="1"
                    value={newCard.cost}
                    onChange={(e) => setNewCard({...newCard, cost: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowCreateModal(false)}>
                Hủy
              </button>
              <button className="create-btn" onClick={handleCreateCard}>
                Tạo Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Detail Modal */}
      {showDetailModal && selectedCard && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Chi tiết Card</h2>
              <button className="close-btn" onClick={() => setShowDetailModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className={`card-detail ${getRarityClass(selectedCard.rarity)}`}>
                <div className="detail-header">
                  <div className="card-type">
                    {getCardTypeIcon(selectedCard.type)}
                    <span>{getCardTypeText(selectedCard.type)}</span>
                  </div>
                  <div className={`card-rarity ${getRarityClass(selectedCard.rarity)}`}>
                    {getRarityText(selectedCard.rarity)}
                  </div>
                </div>
                
                <h3>{selectedCard.name}</h3>
                <p className="description">{selectedCard.description}</p>
                
                <div className="detail-stats">
                  <div className="stat-item">
                    <span className="label">ID:</span>
                    <span className="value">{selectedCard.id}</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Hiệu ứng:</span>
                    <span className="value">{selectedCard.effect}</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Giá trị:</span>
                    <span className="value">{selectedCard.value}</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Cost:</span>
                    <span className="value">{selectedCard.cost}</span>
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

export default CardManagement;
