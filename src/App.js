<<<<<<< HEAD
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import RealTimeWeather from './components/RealTimeWeather';
import SearchAndFilter from "./components/SearchAndFilter";
import ShortTermForecast from './components/ShortTermForecast';
import ThreeDayForecast from './components/ThreeDayForecast';
=======
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import MyList from "./components/MyList";
import Stats from "./components/Stats";
import NutrientDetails from "./components/NutrientDetails";

>>>>>>> e6b05cd182fe3f85c20716f0edc44b9f3451c030
const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
<<<<<<< HEAD
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
=======
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/details/:foodCode" element={<NutrientDetails />} />
      </Routes>
    </Router>
>>>>>>> e6b05cd182fe3f85c20716f0edc44b9f3451c030
  );
};

export default App;
