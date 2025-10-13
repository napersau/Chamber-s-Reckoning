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
import './styles.css';

const { Title, Text, Paragraph } = Typography;

const HomePage = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [chamberRotation, setChamberRotation] = useState(0);

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
      console.log('Starting Russian Roulette...');
      // Navigate to game or login
    }, 1000);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="roulette-container">
      {/* Animated Background */}
      <div className="bg-overlay"></div>
      <div className="grain-effect"></div>
      
      {/* Blood splatter decoration */}
      <div className="blood-splatter splatter-1"></div>
      <div className="blood-splatter splatter-2"></div>
      
      {/* Scanlines effect */}
      <div className="scanlines"></div>

      {/* Main Content */}
      <div className="main-content">
        {/* Warning Banner */}
        <Alert
          message={
            <Space>
              <WarningOutlined />
              <Text strong>CẢNH BÁO: NỘI DUNG KINH DỊ - TUỔI 18+ - CHƠI CÓ TRÁCH NHIỆM</Text>
              <WarningOutlined />
            </Space>
          }
          type="error"
          banner
          className="warning-banner"
          style={{ 
            background: 'rgba(139, 0, 0, 0.2)',
            border: '2px solid #8b0000',
            marginBottom: '30px'
          }}
        />

        {/* Logo/Title */}
        <div className="title-section">
          <Card 
            className="title-card"
            bordered={false}
            style={{
              background: 'rgba(20, 20, 20, 0.8)',
              border: '2px solid rgba(139, 0, 0, 0.5)',
              borderRadius: '20px',
              marginBottom: '40px'
            }}
          >
            <Space direction="vertical" size="large" align="center" style={{ width: '100%' }}>
              <div className="skull-decoration">💀</div>
              
              <Title level={1} className="game-title">
                <div className="title-russian">RUSSIAN</div>
                <div className="title-roulette">ROULETTE</div>
              </Title>
              
              <Space className="subtitle-container">
                <AimOutlined className="aim-icon" />
                <Text className="game-subtitle">
                  SỰ SỐNG VÀ CÁI CHẾT CHỈ CÁCH NHAU MỘT VIÊN ĐẠN
                </Text>
              </Space>

              <Badge 
                status="processing" 
                color="red"
                text={
                  <Text className="live-text">
                    <FireOutlined /> Game sinh tồn kinh dị
                  </Text>
                }
                className="live-badge"
              />
            </Space>
          </Card>
        </div>

        {/* Revolver Chamber */}
        <div className="revolver-section">
          <Card 
            className="revolver-card" 
            bordered={false}
            hoverable
            style={{
              background: 'rgba(20, 20, 20, 0.8)',
              border: '2px solid rgba(139, 0, 0, 0.5)',
              borderRadius: '20px'
            }}
          >
            <div className="revolver-container">
              {/* Gun barrel */}
              <div className="gun-barrel"></div>
              
              {/* Rotating chamber */}
              <div 
                className="chamber" 
                style={{ transform: `rotate(${chamberRotation}deg)` }}
              >
                <div className="chamber-center">
                  <div className="chamber-pin"></div>
                </div>
                {Array.from({ length: 6 }, (_, i) => (
                  <div 
                    key={i} 
                    className={`chamber-hole hole-${i}`}
                    style={{ transform: `rotate(${i * 60}deg) translateY(-70px)` }}
                  >
                    {i === 0 && <div className="bullet">🔴</div>}
                  </div>
                ))}
              </div>
              
              {/* Aiming sight */}
              <div className="aiming-sight">
                <div className="crosshair"></div>
              </div>
            </div>
            
            <Divider style={{ borderColor: 'rgba(139, 0, 0, 0.3)', margin: '20px 0' }} />
            
            <Text className="chamber-label" style={{ textAlign: 'center', display: 'block' }}>
              6 BUỒNG - 1 VIÊN ĐẠN - VẬN MAY CỦA BẠN LÀ BAO NHIÊU?
            </Text>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="action-section">
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Main Play Button */}
            <Tooltip title="Đăng nhập để bắt đầu thử thách tử thần" placement="top">
              <Button 
                type="primary"
                size="large"
                icon={<PlayCircleOutlined />}
                className={`play-button ${isAnimating ? 'animating' : ''}`}
                onClick={handlePlayClick}
                danger
                block
                style={{ height: '80px', fontSize: '1.8rem' }}
              >
                <span className="button-text">LIỀU MẠNG NGAY</span>
                <div className="button-glitch"></div>
              </Button>
            </Tooltip>

            {/* Login Button */}
            <Button 
              size="large"
              icon={<LoginOutlined />}
              className="login-button"
              block
              style={{ height: '65px', fontSize: '1.3rem' }}
            >
              <UserOutlined /> ĐĂNG NHẬP / ĐĂNG KÝ
            </Button>
            
            <Divider style={{ borderColor: 'rgba(139, 0, 0, 0.3)' }}>
              <Text style={{ color: '#666' }}>MENU</Text>
            </Divider>

            {/* Secondary Buttons */}
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Tooltip title="Học cách sống sót trong game">
                  <Button 
                    size="large"
                    icon={<QuestionCircleOutlined />}
                    className="menu-button menu-button-guide"
                    block
                    style={{ height: '60px' }}
                  >
                    HƯỚNG DẪN
                  </Button>
                </Tooltip>
              </Col>
              <Col xs={24} sm={8}>
                <Tooltip title="Những người chơi sống sót">
                  <Button 
                    size="large"
                    icon={<TrophyOutlined />}
                    className="menu-button menu-button-rank"
                    block
                    style={{ height: '60px' }}
                  >
                    BẢNG XẾP HẠNG
                  </Button>
                </Tooltip>
              </Col>
              <Col xs={24} sm={8}>
                <Tooltip title="Cấu hình âm thanh và đồ họa">
                  <Button 
                    size="large"
                    icon={<SettingOutlined />}
                    className="menu-button menu-button-settings"
                    block
                    style={{ height: '60px' }}
                  >
                    CÀI ĐẶT
                  </Button>
                </Tooltip>
              </Col>
            </Row>
          </Space>
        </div>

        {/* Game Modes */}
        <div className="game-modes">
          <Divider style={{ borderColor: 'rgba(139, 0, 0, 0.5)', margin: '50px 0 30px' }}>
            <Title level={3} className="modes-title" style={{ margin: 0 }}>
              CHẾ ĐỘ CHƠI
            </Title>
          </Divider>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Card 
                className="mode-card" 
                hoverable
                style={{
                  background: 'rgba(20, 20, 20, 0.8)',
                  border: '2px solid rgba(100, 100, 100, 0.3)',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}
              >
                <div className="mode-icon">👤</div>
                <Title level={4} className="mode-name">CHƠI ĐƠN</Title>
                <Paragraph className="mode-desc" style={{ color: '#999' }}>
                  Đối đầu với AI - Thử vận may của bạn trong cuộc chiến sinh tử
                </Paragraph>
              </Card>
            </Col>
            
            <Col xs={24} sm={12}>
              <Badge.Ribbon text="HOT" color="red">
                <Card 
                  className="mode-card mode-card-multiplayer" 
                  hoverable
                  style={{
                    background: 'rgba(20, 20, 20, 0.8)',
                    border: '2px solid rgba(139, 0, 0, 0.5)',
                    borderRadius: '15px',
                    textAlign: 'center'
                  }}
                >
                  <div className="mode-icon">👥</div>
                  <Title level={4} className="mode-name">NHIỀU NGƯỜI CHƠI</Title>
                  <Paragraph className="mode-desc" style={{ color: '#999' }}>
                    Đấu với người thật - Ai sẽ là người sống sót cuối cùng?
                  </Paragraph>
                </Card>
              </Badge.Ribbon>
            </Col>
          </Row>
        </div>

        {/* Game Rules Preview */}
        <div className="rules-preview" style={{ marginTop: '50px' }}>
          <Card
            style={{
              background: 'rgba(20, 20, 20, 0.8)',
              border: '2px solid rgba(139, 0, 0, 0.3)',
              borderRadius: '15px'
            }}
            bordered={false}
          >
            <Title level={4} style={{ color: '#ff6b6b', textAlign: 'center', marginBottom: '20px' }}>
              <FireOutlined /> LUẬT CHƠI CƠ BẢN
            </Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Card 
                  size="small" 
                  style={{ 
                    background: 'rgba(50, 50, 50, 0.5)', 
                    border: '1px solid rgba(100, 100, 100, 0.3)',
                    textAlign: 'center'
                  }}
                >
                  <Text style={{ fontSize: '2rem' }}>🔫</Text>
                  <Paragraph style={{ color: '#999', marginTop: '10px', marginBottom: 0 }}>
                    Khẩu súng 6 buồng với 1 viên đạn
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card 
                  size="small" 
                  style={{ 
                    background: 'rgba(50, 50, 50, 0.5)', 
                    border: '1px solid rgba(100, 100, 100, 0.3)',
                    textAlign: 'center'
                  }}
                >
                  <Text style={{ fontSize: '2rem' }}>🔄</Text>
                  <Paragraph style={{ color: '#999', marginTop: '10px', marginBottom: 0 }}>
                    Lượt chơi luân phiên giữa các người chơi
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card 
                  size="small" 
                  style={{ 
                    background: 'rgba(50, 50, 50, 0.5)', 
                    border: '1px solid rgba(100, 100, 100, 0.3)',
                    textAlign: 'center'
                  }}
                >
                  <Text style={{ fontSize: '2rem' }}>💀</Text>
                  <Paragraph style={{ color: '#999', marginTop: '10px', marginBottom: 0 }}>
                    Ai trúng đạn sẽ thua - người sống sót thắng
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Footer */}
        <Divider style={{ borderColor: 'rgba(139, 0, 0, 0.3)', margin: '50px 0 20px' }} />
        
        <div className="footer" style={{ textAlign: 'center' }}>
          <Text style={{ color: '#666', display: 'block', marginBottom: '10px' }}>
            © 2025 RUSSIAN ROULETTE - Game kinh dị sinh tồn
          </Text>
          <Text style={{ color: '#999', fontSize: '0.85rem', fontStyle: 'italic', display: 'block' }}>
            ⚠️ Đây là trò chơi giải trí. Không khuyến khích bạo lực trong thực tế.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
