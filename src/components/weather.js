import React, { useState } from 'react';
import axios from 'axios';
import './weather.css'; // CSS 파일 추가

const Weather = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categoryMapping = {
    TMP: '온도 (°C)',
    UUU: '동서바람 성분 (m/s)',
    VVV: '남북바람 성분 (m/s)',
    VEC: '풍향 (deg)',
    WSD: '풍속 (m/s)',
    SKY: '하늘 상태',
    PTY: '강수 형태',
    POP: '강수 확률 (%)',
    WAV: '파고 (m)',
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

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const endpoint = process.env.REACT_APP_WEATHER_API_ENDPOINT;
    const apiUrl = `${endpoint}/getVilageFcst?serviceKey=${apiKey}&pageNo=1&numOfRows=10&dataType=JSON&base_date=${date}&base_time=${time}&nx=60&ny=127`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data.response.body.items.item;
      setForecast(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('날씨 데이터를 가져오는 데 실패했습니다. 입력값을 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h1 className="title">기상청 단기예보</h1>
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

export default Weather;
