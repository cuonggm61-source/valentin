import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import videoFile from './assets/vid2.mp4' // Đã mở dòng này ra
import './App.css'

function App() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({});
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      animationDuration: Math.random() * 10 + 10 + 's',
      delay: Math.random() * 10 + 's',
      size: Math.random() * 20 + 10 + 'px'
    }));
    setHearts(newHearts);
  }, []);

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100; 
    const y = Math.random() * 200 - 100;

    setNoBtnPosition({
      transform: `translate(${x}px, ${y}px)`,
      transition: 'all 0.2s ease',
      position: 'absolute'
    });
  };

  const handleYesClick = () => {
    setYesPressed(true);
    const colors = ['#ff0000', '#ffffff', '#ff69b4'];
    const interval = setInterval(function () {
        confetti({
          particleCount: 5,
          startVelocity: 30,
          spread: 360,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: colors,
          shapes: ['heart'],
          scalar: 1.2,
          gravity: 0.6,
          ticks: 600
        });
      }, 200);
      setTimeout(() => clearInterval(interval), 5000);
  };

  const handleNoHover = () => {
    moveNoButton();
  };

  return (
    <div className="container">
      <div className="hearts-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: heart.left,
              animationDuration: heart.animationDuration,
              animationDelay: heart.delay,
              fontSize: heart.size
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {yesPressed ? (
        /* GIAO DIỆN KHI ĐÃ ĐỒNG Ý */
        <div className="card success-container">
          <h1 className="success-title">Yayy!!! I love U 🥰</h1>
          <h3 className="subtext">Moaaaaaaaaaaaaaa❤️</h3>
          
          {/* ĐÂY LÀ ĐOẠN VIDEO ĐÃ SỬA */}
          <div style={{ marginTop: '20px' }}>
            <video 
              width="300" 
              controls      // Hiện nút dừng/phát
              autoPlay      // Tự động chạy
              loop          // Chạy lặp lại
              style={{ borderRadius: '16px' }}
            >
              <source src={videoFile} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
          </div>
          
        </div>
      ) : (
        /* GIAO DIỆN LÚC HỎI */
        <div className="card">
          <h1 className="title">
            <span className="highlight">Hế lô cậu,</span>
            <br/>
              Valetin mí mình khum :3? 💖💞
          </h1>

          <p className="subtext">Đừng có chối, anh biết hết thông tin em rồi ... 🥺</p>

          <div className="btn-group" style={{ position: 'relative', height: '100px' }}>
            <button
              className="btn yes-btn"
              onClick={handleYesClick}
              style={{ marginRight: '20px' }}
            >
              Đồng ý
            </button>

            <button
              className="btn no-btn"
              style={noBtnPosition}
              onMouseEnter={handleNoHover}
              onClick={handleNoHover}
            >
              Không nha
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App