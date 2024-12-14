import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">날씨 정보 앱</h1>
      <p className="home-description">최신 날씨 정보를 확인하세요!</p>
      <div className="home-buttons">
        <Link to="/short-term" className="home-button">
          6시간 예보
        </Link>
        <Link to="/three-day" className="home-button">
          3일 예보
        </Link>
        <Link to="/real-time" className="home-button">
          실시간 날씨
        </Link>
      </div>
    </div>
  );
};

export default HomePage;