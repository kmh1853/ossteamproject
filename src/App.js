import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ShortTermForecast from './components/ShortTermForecast';
import ThreeDayForecast from './components/ThreeDayForecast';
import RealTimeWeather from './components/RealTimeWeather';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/short-term" element={<ShortTermForecast />} />
        <Route path="/three-day" element={<ThreeDayForecast />} />
        <Route path="/real-time" element={<RealTimeWeather />} />
      </Routes>
    </Router>
  );
};

export default App;
