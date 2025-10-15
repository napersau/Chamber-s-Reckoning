import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  Play, 
  RotateCcw,
  Volume2,
  VolumeX,
  Settings,
  Trophy,
  Heart,
  Skull
} from 'lucide-react';
import './styles.css';

const GameRoom = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('waiting'); // waiting, playing, result
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [chamberRotation, setChamberRotation] = useState(0);
  const [bulletPosition, setBulletPosition] = useState(Math.floor(Math.random() * 6));
  const [currentChamber, setCurrentChamber] = useState(0);
  const [players, setPlayers] = useState([
    { id: 1, name: 'Bạn', lives: 3, isAlive: true, isBot: false },
    { id: 2, name: 'Bot AI', lives: 3, isAlive: true, isBot: true }
  ]);
  const [gameHistory, setGameHistory] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Auto rotate chamber slowly
    const interval = setInterval(() => {
      if (!isSpinning) {
        setChamberRotation(prev => (prev + 1) % 360);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [isSpinning]);

  const startGame = () => {
    setGameState('playing');
    setCurrentPlayer(1);
    setCurrentChamber(0);
    setBulletPosition(Math.floor(Math.random() * 6));
    setGameHistory([]);
    setShowResult(false);
    setPlayers(prev => prev.map(p => ({ ...p, lives: 3, isAlive: true })));
  };

  const spinChamber = () => {
    setIsSpinning(true);
    const spins = 5 + Math.random() * 5; // 5-10 spins
    const finalRotation = chamberRotation + (spins * 60);
    
    setChamberRotation(finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setBulletPosition(Math.floor(Math.random() * 6));
    }, 2000);
  };

  const pullTrigger = () => {
    if (gameState !== 'playing' || isSpinning) return;
    
    const isBullet = currentChamber === bulletPosition;
    const currentPlayerData = players.find(p => p.id === currentPlayer);
    
    const action = {
      player: currentPlayerData.name,
      chamber: currentChamber + 1,
      result: isBullet ? 'bullet' : 'empty',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setGameHistory(prev => [...prev, action]);
    
    if (isBullet) {
      // Player hit bullet - loses a life
      setPlayers(prev => prev.map(p => 
        p.id === currentPlayer 
          ? { ...p, lives: p.lives - 1, isAlive: p.lives > 1 }
          : p
      ));
      
      const updatedPlayer = players.find(p => p.id === currentPlayer);
      if (updatedPlayer.lives <= 1) {
        // Game over
        setGameState('result');
        setShowResult(true);
      } else {
        // Reset for next round
        setBulletPosition(Math.floor(Math.random() * 6));
        setCurrentChamber(0);
      }
    } else {
      // Empty chamber - next chamber
      setCurrentChamber(prev => (prev + 1) % 6);
    }
    
    // Switch player (if game continues)
    if (gameState === 'playing') {
      setTimeout(() => {
        setCurrentPlayer(prev => prev === 1 ? 2 : 1);
        
        // Bot turn
        if (currentPlayer === 1 && players[1].isAlive) {
          setTimeout(() => {
            pullTrigger();
          }, 1500);
        }
      }, 1000);
    }
  };

  const resetGame = () => {
    setGameState('waiting');
    setCurrentPlayer(1);
    setChamberRotation(0);
    setBulletPosition(Math.floor(Math.random() * 6));
    setCurrentChamber(0);
    setGameHistory([]);
    setShowResult(false);
    setPlayers([
      { id: 1, name: 'Bạn', lives: 3, isAlive: true, isBot: false },
      { id: 2, name: 'Bot AI', lives: 3, isAlive: true, isBot: true }
    ]);
  };

  const goBack = () => {
    navigate('/');
  };

  const winner = players.find(p => p.isAlive && gameState === 'result');
  const loser = players.find(p => !p.isAlive && gameState === 'result');

  return (
    <div className="game-room-container">
      {/* Header */}
      <div className="game-header">
        <button className="back-button" onClick={goBack}>
          <ArrowLeft size={20} />
          <span>Thoát Game</span>
        </button>
        
        <h1 className="game-room-title">RUSSIAN ROULETTE</h1>
        
        <div className="game-controls">
          <button 
            className="control-button"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button className="control-button">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Game Area */}
      <div className="game-area">
        {/* Players Info */}
        <div className="players-section">
          {players.map(player => (
            <div 
              key={player.id} 
              className={`player-card ${currentPlayer === player.id ? 'active' : ''} ${!player.isAlive ? 'eliminated' : ''}`}
            >
              <div className="player-info">
                <h3>{player.name}</h3>
                <div className="player-lives">
                  {Array.from({ length: 3 }, (_, i) => (
                    <span key={i} className={`life ${i < player.lives ? 'alive' : 'lost'}`}>
                      {i < player.lives ? <Heart size={16} /> : <Skull size={16} />}
                    </span>
                  ))}
                </div>
              </div>
              {currentPlayer === player.id && gameState === 'playing' && (
                <div className="turn-indicator">
                  Lượt của bạn
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Revolver */}
        <div className="revolver-section">
          <div className="revolver-container">
            <div 
              className={`revolver-chamber ${isSpinning ? 'spinning' : ''}`}
              style={{ transform: `rotate(${chamberRotation}deg)` }}
            >
              <div className="chamber-slots">
                {Array.from({ length: 6 }, (_, i) => (
                  <div 
                    key={i} 
                    className={`chamber-slot ${
                      i === bulletPosition ? 'bullet' : 'empty'
                    } ${i === currentChamber ? 'current' : ''}`}
                  >
                    <div className="chamber-content">
                      {i === bulletPosition ? '💥' : ''}
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

          <div className="chamber-info">
            <p>Buồng hiện tại: {currentChamber + 1}/6</p>
            <p>Viên đạn ở buồng: {bulletPosition + 1}</p>
          </div>
        </div>

        {/* Game Actions */}
        <div className="game-actions">
          {gameState === 'waiting' && (
            <button className="action-button start-game" onClick={startGame}>
              <Play size={20} />
              Bắt đầu Game
            </button>
          )}

          {gameState === 'playing' && (
            <div className="playing-actions">
              <button 
                className="action-button spin-chamber" 
                onClick={spinChamber}
                disabled={isSpinning}
              >
                <RotateCcw size={20} />
                {isSpinning ? 'Đang quay...' : 'Quay buồng đạn'}
              </button>
              
              <button 
                className="action-button pull-trigger" 
                onClick={pullTrigger}
                disabled={currentPlayer === 2 || isSpinning}
              >
                🔫 Bóp cò
              </button>
            </div>
          )}

          {gameState === 'result' && (
            <div className="result-actions">
              <button className="action-button play-again" onClick={resetGame}>
                <RotateCcw size={20} />
                Chơi lại
              </button>
              <button className="action-button view-stats">
                <Trophy size={20} />
                Xem thống kê
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Game History */}
      <div className="game-history">
        <h3>Lịch sử game</h3>
        <div className="history-list">
          {gameHistory.map((action, index) => (
            <div key={index} className={`history-item ${action.result}`}>
              <span className="action-time">{action.timestamp}</span>
              <span className="action-player">{action.player}</span>
              <span className="action-chamber">Buồng {action.chamber}</span>
              <span className="action-result">
                {action.result === 'bullet' ? '💥 Trúng đạn!' : '✅ An toàn'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Result Modal */}
      {showResult && (
        <div className="result-modal">
          <div className="result-content">
            <div className="result-icon">
              {winner?.id === 1 ? '🏆' : '💀'}
            </div>
            <h2 className="result-title">
              {winner?.id === 1 ? 'Chiến thắng!' : 'Thất bại!'}
            </h2>
            <p className="result-message">
              {winner?.id === 1 
                ? `Chúc mừng! Bạn đã thắng ${loser?.name}`
                : `${winner?.name} đã thắng bạn. Hãy thử lại!`
              }
            </p>
            <div className="result-actions">
              <button className="result-button play-again" onClick={resetGame}>
                Chơi lại
              </button>
              <button className="result-button go-home" onClick={goBack}>
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameRoom;