import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RealTimeWeather.css';

const RealTimeWeather = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [calculatedTime, setCalculatedTime] = useState('');
  const [warning, setWarning] = useState('');

  const categoryMapping = {
    TMP: '온도 (°C)',
    UUU: '동서바람 성분 (m/s)',
    VVV: '남북바람 성분 (m/s)',
    VEC: '풍향 (deg)',
    WSD: '풍속 (m/s)',
    SKY: '하늘 상태',
    PTY: '강수 형태',
    POP: '강수 확률 (%)',
    PCP: '강수량 (mm)',
  };

  const skyMapping = {
    1: '맑음',
    3: '구름 많음',
    4: '흐림',
  };

  const ptyMapping = {
    0: '없음',
    1: '비',
    2: '비/눈',
    3: '눈',
    4: '소나기',
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = now.getHours();
    let baseTime;
    if (hours < 2) {
      baseTime = '2300';
      now.setDate(now.getDate() - 1);
    } else if (hours < 5) {
      baseTime = '0200';
    } else if (hours < 8) {
      baseTime = '0500';
    } else if (hours < 11) {
      baseTime = '0800';
    } else if (hours < 14) {
      baseTime = '1100';
    } else if (hours < 17) {
      baseTime = '1400';
    } else if (hours < 20) {
      baseTime = '1700';
    } else if (hours < 23) {
      baseTime = '2000';
    } else {
      baseTime = '2300';
    }

    const time = baseTime;
    return {
      date: `${year}${month}${day}`,
      time,
    };
  };

  useEffect(() => {
    const { date, time } = getCurrentDateTime();
    setDate(date);
    setTime(time);
    setCalculatedTime(`발표 기준 시간: ${date} ${time}`);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setWarning('');

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const endpoint = process.env.REACT_APP_WEATHER_API_ENDPOINT;
    const apiUrl = `${endpoint}/getVilageFcst?serviceKey=${apiKey}&pageNo=1&numOfRows=10&dataType=JSON&base_date=${date}&base_time=${time}&nx=60&ny=127`;

    try {
      const response = await axios.get(apiUrl);
      if (!response.data.response.body.items.item.length) {
        setWarning('현재 입력한 시간대는 조회할 수 없는 시간입니다.');
        setForecast([]);
      } else {
        const data = response.data.response.body.items.item;
        setForecast(data);
      }
    } catch (err) {
      setError('날씨 데이터를 가져오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h1 className="title">실시간 날씨</h1>
      <button className="home-button">
        <a href="/">메인 페이지로 이동</a>
      </button>
      <div className="form-container">
        <label>
          날짜 (YYYYMMDD):
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="예: 20241212"
          />
        </label>
        <label>
          시간 (HHMM):
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="예: 1200"
          />
        </label>
        <button onClick={handleSearch} disabled={loading} className="search-button">
          조회
        </button>
      </div>
      {calculatedTime && <p className="info">{calculatedTime}</p>}
      {warning && <p className="warning">{warning}</p>}
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="forecast-list">
        {forecast.map((item, index) => {
          let value = item.fcstValue;

          if (item.category === 'SKY') {
            value = skyMapping[item.fcstValue] || '알 수 없음';
          } else if (item.category === 'PTY') {
            value = ptyMapping[item.fcstValue] || '알 수 없음';
          }

          return (
            <li key={index} className="forecast-item">
              <strong>{categoryMapping[item.category] || item.category}</strong>: {value} ({item.fcstDate} {item.fcstTime})
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RealTimeWeather;
