import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Space, Row, Col, Badge, Tooltip, Divider, Alert } from 'antd';
import { 
  PlayCircleOutlined, 
  TrophyOutlined, 
  SettingOutlined, 
  QuestionCircleOutlined,
  FireOutlined,
  WarningOutlined,
  AimOutlined,
  LoginOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {} from '../../services/userService';
import './styles.css';

const { Title, Text, Paragraph } = Typography;

const HomePage = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [chamberRotation, setChamberRotation] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Rotating chamber animation
    const chamberInterval = setInterval(() => {
      setChamberRotation(prev => (prev + 60) % 360);
    }, 3000);
    
    return () => {
      clearInterval(chamberInterval);
    };
  }, []);

  const handlePlayClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/game');
    }, 800);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="roulette-container">
      {/* Main Content */}
      <div className="main-content">
        {/* Simple Title */}
        <div className="simple-title-section">
          <Title level={1} className="simple-game-title">
            RUSSIAN ROULETTE
          </Title>
          <Text className="simple-subtitle">
            Thách thức vận may - Chỉ dành cho người dũng cảm
          </Text>
        </div>

        {/* Main Revolver - Center Focus */}
        <div className="main-revolver-section">
          <div className="revolver-container">
            <div 
              className="revolver-chamber" 
              style={{ transform: `rotate(${chamberRotation}deg)` }}
            >
              <div className="chamber-slots">
                {Array.from({ length: 6 }, (_, i) => (
                  <div 
                    key={i} 
                    className={`chamber-slot ${i === 0 ? 'bullet' : 'empty'}`}
                  >
                    <div className="chamber-bullet">
                      {i === 0 ? '💥' : ''}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="chamber-center">
                🔫
              </div>
            </div>
            
            <div className="revolver-barrel">
              <div className="barrel-tip"></div>
            </div>
          </div>
          
          <Text className="chamber-info">
            6 BUỒNG ĐẠN - 1 VIÊN ĐẠN THẬT
          </Text>
        </div>

        {/* Action Buttons - Simplified */}
        <div className="simple-actions">
          <Button 
            type="primary"
            size="large"
            icon={<PlayCircleOutlined />}
            className="main-play-button"
            onClick={handlePlayClick}
          >
            BẮT ĐẦU THÁCH THỨC
          </Button>

          <div className="auth-buttons">
            <Button 
              size="large"
              icon={<LoginOutlined />}
              className="auth-button login-btn"
              onClick={handleLoginClick}
            >
              ĐĂNG NHẬP
            </Button>
            <Button 
              size="large"
              icon={<UserOutlined />}
              className="auth-button register-btn"
              onClick={handleRegisterClick}
            >
              ĐĂNG KÝ
            </Button>
          </div>

          <div className="menu-buttons">
            <Button 
              icon={<QuestionCircleOutlined />}
              className="menu-button"
            >
              HƯỚNG DẪN
            </Button>
            <Button 
              icon={<TrophyOutlined />}
              className="menu-button"
            >
              XẾP HẠNG
            </Button>
            <Button 
              icon={<SettingOutlined />}
              className="menu-button"
              onClick={() => navigate('/admin')}
            >
              ADMIN
            </Button>
          </div>
        </div>

        {/* Simple Footer */}
        <div className="simple-footer">
          <Text>© 2025 Russian Roulette - 18+ Only</Text>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
