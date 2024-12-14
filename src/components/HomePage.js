import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="dynamic-background"></div>
      <h1 className="home-title">🌤️ 날씨 정보 앱</h1>
      <p className="home-description">최신 날씨 정보를 한 눈에 확인하세요!</p>
      <div className="home-buttons">
        <Link to="/short-term" className="home-button" title="6시간 단위로 예보를 확인할 수 있습니다.">
          6시간 예보
        </Link>
        <Link to="/three-day" className="home-button" title="3일간의 날씨 예보를 확인하세요.">
          오늘 날씨 예보
        </Link>
        <Link to="/real-time" className="home-button" title="실시간 날씨 데이터를 확인하세요.">
          실시간 날씨
        </Link>
        <Link to="/search-filter" className="home-button">
          Search & Filter
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
