import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import RealTimeWeather from './components/RealTimeWeather';
import SearchAndFilter from "./components/SearchAndFilter";
import ShortTermForecast from './components/ShortTermForecast';
import ThreeDayForecast from './components/ThreeDayForecast';
const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? 'App dark-mode' : 'App'}>
      <button className="theme-toggle-button" onClick={toggleTheme}>
        {darkMode ? '☀️ 라이트 모드' : '🌙 다크 모드'}
      </button>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/short-term" element={<ShortTermForecast />} />
          <Route path="/three-day" element={<ThreeDayForecast />} />
          <Route path="/real-time" element={<RealTimeWeather />} />
          <Route path="/search-filter" element={<SearchAndFilter />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
