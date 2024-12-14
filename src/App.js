import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import RealTimeWeather from './components/RealTimeWeather';
import ShortTermForecast from './components/ShortTermForecast';
import ThreeDayForecast from './components/ThreeDayForecast';

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