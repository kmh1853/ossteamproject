import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './ShortTermForecast.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ShortTermForecast = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

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

  const getBaseDateTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();

    if (minutes < 40) {
      hours -= 1;
    }

    const validHours = [2, 5, 8, 11, 14, 17, 20, 23];
    let baseTime = validHours.reduce((prev, curr) => (hours >= curr ? curr : prev), 23);
    if (hours < 2) {
      baseTime = 23;
      now.setDate(now.getDate() - 1);
    }

    const baseDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    return {
      date: baseDate,
      time: `${String(baseTime).padStart(2, '0')}00`,
    };
  };

  const fetchForecast = useCallback(async () => {
    setLoading(true);
    setError(null);

    let { date, time } = getBaseDateTime();
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const endpoint = process.env.REACT_APP_WEATHER_API_ENDPOINT;

    const apiUrl = `${endpoint}/getUltraSrtFcst?serviceKey=${apiKey}&pageNo=1&numOfRows=60&dataType=JSON&base_date=${date}&base_time=${time}&nx=60&ny=127`;

    try {
      const response = await axios.get(apiUrl);

      if (response.data.response.body.items) {
        const items = response.data.response.body.items.item;

        const filteredItems = items.filter((item) => ['T1H', 'POP', 'SKY', 'PTY'].includes(item.category));
        setForecast(filteredItems);
        prepareChartData(filteredItems);
      } else {
        setError('데이터를 가져올 수 없습니다.');
      }
    } catch (err) {
      setError('API 요청에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const prepareChartData = (items) => {
    const temperatureData = items.filter((item) => item.category === 'T1H');
    if (temperatureData.length === 0) {
      setChartData(null);
      return;
    }

    const labels = temperatureData.map((item) => `${item.fcstTime.slice(0, 2)}:00`);
    const data = temperatureData.map((item) => parseFloat(item.fcstValue));

    setChartData({
      labels,
      datasets: [
        {
          label: '온도 (°C)',
          data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    });
  };

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  return (
    <div className="weather-container">
      <h1 className="title">6시간 초단기 예보</h1>
      <button className="home-button">
        <a href="/">메인 페이지로 이동</a>
      </button>
      {loading && <p className="loading">로딩 중...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <table className="forecast-table">
            <thead>
              <tr>
                <th>시간</th>
                <th>온도 (°C)</th>
                <th>강수 확률 (%)</th>
                <th>하늘 상태</th>
                <th>강수 형태</th>
              </tr>
            </thead>
            <tbody>
              {forecast.map((item, index) => (
                <tr key={index}>
                  <td>{`${item.fcstTime.slice(0, 2)}:00`}</td>
                  <td>{item.fcstValue}</td>
                  <td>{skyMapping[item.category] || '알 수 없음'}</td>
                  <td>{ptyMapping[item.category] || '없음'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {chartData && (
            <div className="chart-container">
              <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShortTermForecast;
