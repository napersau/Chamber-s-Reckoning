import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminUserService } from '../../services/admin/userService';
import { 
  Users, 
  LogOut,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Filter,
  RefreshCw,
  Bell,
  Menu,
  X,
  Shield,
  ArrowLeft,
  AlertCircle,
  Gamepad2,
  CreditCard
} from 'lucide-react';
import './styles.css';

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Load users từ API
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminUserService.getAllUsers();
      
      if (response.code === 1000) {
        setUsers(response.result || []);
        console.log('Loaded users:', response.result);
      } else {
        setError('Không thể tải danh sách user: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setError('Lỗi khi tải danh sách user: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserStatus = async (userId) => {
    if (!window.confirm('Bạn có chắc chắn muốn cập nhật trạng thái của user này?')) {
      return;
    }
    
    try {
      const response = await adminUserService.updateUserStatus(userId);
      
      if (response.code === 1000) {
        // Reload users để cập nhật trạng thái mới
        await loadUsers();
        alert('Cập nhật trạng thái user thành công!');
      } else {
        setError('Không thể cập nhật trạng thái user: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      setError('Lỗi khi cập nhật trạng thái user: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa user này?')) {
      try {
        const response = await adminUserService.deleteUser(userId);
        
        if (response.code === 1000) {
          await loadUsers();
          console.log('User deleted successfully');
        } else {
          setError('Không thể xóa user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Lỗi khi xóa user');
      }
    }
  };

  const handleViewUserDetail = async (userId) => {
    try {
      const response = await adminUserService.getUserDetail(userId);
      
      if (response.code === 1000) {
        console.log('User detail:', response.result);
        // Có thể mở modal hoặc navigate đến trang chi tiết
      }
    } catch (error) {
      console.error('Error fetching user detail:', error);
      setError('Lỗi khi lấy thông tin chi tiết user');
    }
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && user.status === filterStatus;
  });

  const getStatusText = (status) => {
    switch (status) {
      case 'ACTIVE': return 'Hoạt động';
      case 'INACTIVE': return 'Không hoạt động';
      case 'BANNED': return 'Bị cấm';
      default: return 'Không xác định';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'ACTIVE': return 'active';
      case 'INACTIVE': return 'inactive';
      case 'BANNED': return 'banned';
      default: return 'inactive';
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
            className="nav-item active"
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
            <h1>Quản lý User</h1>
          </div>
          
          <div className="header-right">
            <button className="refresh-btn" onClick={loadUsers}>
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
                  placeholder="Tìm kiếm user..."
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
                  className={`filter-btn ${filterStatus === 'INACTIVE' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('INACTIVE')}
                >
                  Không hoạt động
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'BANNED' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('BANNED')}
                >
                  Bị cấm
                </button>
              </div>

              <button className="add-btn">
                <Plus size={16} />
                Thêm user
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="loading-state">
              <RefreshCw size={32} className="spinning" />
              <p>Đang tải danh sách user...</p>
            </div>
          ) : (
            /* User Table */
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Họ tên</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.fullName || 'N/A'}</td>
                        <td>
                          <span className={`status ${getStatusClass(user.status)}`}>
                            {getStatusText(user.status)}
                          </span>
                        </td>
                        <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-btn view"
                              onClick={() => handleViewUserDetail(user.id)}
                              title="Xem chi tiết"
                            >
                              <Eye size={14} />
                            </button>
                            <button 
                              className="action-btn edit"
                              onClick={() => handleUpdateUserStatus(user.id)}
                              title="Cập nhật trạng thái"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button 
                              className="action-btn delete"
                              onClick={() => handleDeleteUser(user.id)}
                              title="Xóa user"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="empty-message">
                        {searchTerm ? 'Không tìm thấy user nào' : 'Chưa có user nào'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;