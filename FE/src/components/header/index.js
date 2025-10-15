import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../services/localStorageService';
import { 
  Home, 
  Gamepad2, 
  Users, 
  User, 
  LogOut, 
  Settings, 
  Shield,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import './styles.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  console.log("currentUser:", currentUser);

  // Navigation items
  const navItems = [
    { path: '/', label: 'Trang chủ', icon: Home },
    { path: '/game', label: 'Chơi game', icon: Gamepad2 },
    { path: '/room', label: 'Phòng chơi', icon: Users }
  ];

  // Get user info from token
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser({
          userId: decoded.userId || '',
          name: decoded.sub || decoded.username || 'User',
          email: decoded.email || '',
          role: decoded.scope?.name || 'USER',
          avatar: (decoded.sub || decoded.username || 'User').charAt(0).toUpperCase()
        });
      } catch (error) {
        console.error('Error decoding token in Header:', error);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [location.pathname]); // Re-check when route changes

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleAdmin = () => {
    navigate('/admin');
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname === path;
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo" onClick={() => handleNavClick('/')}>
          <div className="logo-icon">🎯</div>
          <span className="logo-text">Russian Roulette</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${isActivePath(item.path) ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="header-user">
          {currentUser ? (
            <div className="user-dropdown" ref={dropdownRef}>
              <button
                className="user-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="user-avatar">
                  {currentUser.avatar}
                </div>
                <div className="user-info">
                  <span className="user-name">{currentUser.name}</span>
                  <span className="user-role">
                    {currentUser.role === 'ADMIN' ? (
                      <>
                        <Shield size={12} />
                        Admin
                      </>
                    ) : (
                      'Player'
                    )}
                  </span>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleProfile}>
                    <User size={16} />
                    Hồ sơ cá nhân
                  </button>
                  
                  {currentUser.role === 'ADMIN' && (
                    <button className="dropdown-item admin" onClick={handleAdmin}>
                      <Shield size={16} />
                      Trang quản trị
                    </button>
                  )}
                  
                  <div className="dropdown-divider"></div>
                  
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <LogOut size={16} />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button 
                className="login-btn"
                onClick={() => navigate('/login')}
              >
                Đăng nhập
              </button>
              <button 
                className="register-btn"
                onClick={() => navigate('/register')}
              >
                Đăng ký
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <div className="mobile-nav-content">
            {navItems.map((item) => (
              <button
                key={item.path}
                className={`mobile-nav-item ${isActivePath(item.path) ? 'active' : ''}`}
                onClick={() => handleNavClick(item.path)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
            
            {currentUser && (
              <>
                <div className="mobile-divider"></div>
                <button className="mobile-nav-item" onClick={handleProfile}>
                  <User size={20} />
                  Hồ sơ cá nhân
                </button>
                
                {currentUser.role === 'ADMIN' && (
                  <button className="mobile-nav-item admin" onClick={handleAdmin}>
                    <Shield size={20} />
                    Trang quản trị
                  </button>
                )}
                
                <button className="mobile-nav-item logout" onClick={handleLogout}>
                  <LogOut size={20} />
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
