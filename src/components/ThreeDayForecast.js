import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './ThreeDayForecast.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ThreeDayForecast = () => {
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

  const fetchForecast = useCallback(async () => {
    setLoading(true);
    setError(null);

    const now = new Date();
    const baseDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const endpoint = process.env.REACT_APP_WEATHER_API_ENDPOINT;
    const apiUrl = `${endpoint}/getVilageFcst?serviceKey=${apiKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=0500&nx=60&ny=127`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data.response.body.items) {
        const items = response.data.response.body.items.item;

        const filteredItems = items.filter((item) => ['TMP', 'POP', 'SKY', 'PTY'].includes(item.category));
        setForecast(filteredItems);
        prepareChartData(filteredItems);
      } else {
        setError('데이터를 가져올 수 없습니다.');
      }
    } catch (err) {
      console.error('Error fetching forecast:', err);
      setError('API 요청에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const prepareChartData = (items) => {
    const groupedData = items.reduce((acc, item) => {
      const key = `${item.fcstDate}-${item.fcstTime}`;
      if (!acc[key]) {
        acc[key] = { TMP: '-', POP: '-', SKY: '-', PTY: '-' };
      }
      acc[key][item.category] = item.fcstValue || '-';
      return acc;
    }, {});

    const sortedKeys = Object.keys(groupedData).sort();
    const labels = sortedKeys.map((key) => {
      const [date, time] = key.split('-');
      return `${date.slice(4, 6)}/${date.slice(6, 8)} ${time.slice(0, 2)}:00`;
    });

    const temperatureData = sortedKeys.map((key) => parseFloat(groupedData[key].TMP || 0));

    setChartData({
      labels: labels,
      datasets: [
        {
          label: '온도 (°C)',
          data: temperatureData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    });
  };

  const formatLimitedData = (data) => {
    const groupedByDate = data.reduce((acc, item) => {
      const date = item.fcstDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    const limitedData = Object.entries(groupedByDate).map(([date, items]) => {
      const groupedData = items.reduce((acc, item) => {
        const timeKey = `${item.fcstTime}`;
        if (!acc[timeKey]) {
          acc[timeKey] = { TMP: '-', POP: '-', SKY: '-', PTY: '-' };
        }
        acc[timeKey][item.category] = item.fcstValue || '-';
        return acc;
      }, {});

      const sortedTimes = Object.keys(groupedData).sort();
      const selectedTimes = sortedTimes.filter((_, index) => index % 4 === 0).slice(0, 6); // 4시간 간격으로 6개
      return selectedTimes.map((time) => ({
        date: `${date.slice(4, 6)}/${date.slice(6, 8)}`,
        time: `${time.slice(0, 2)}:00`,
        TMP: groupedData[time].TMP,
        POP: groupedData[time].POP,
        SKY: skyMapping[groupedData[time].SKY] || '-',
        PTY: ptyMapping[groupedData[time].PTY] || '-',
      }));
    });

    return limitedData.flat();
  };

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  return (
    <div className="weather-container">
      <h1 className="title">3일 예보</h1>
      {loading && <p className="loading">로딩 중...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <table className="forecast-table">
            <thead>
              <tr>
                <th>날짜</th>
                <th>시간</th>
                <th>온도 (°C)</th>
                <th>강수 확률 (%)</th>
                <th>하늘 상태</th>
                <th>강수 형태</th>
              </tr>
            </thead>
            <tbody>
              {formatLimitedData(forecast).map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.TMP}</td>
                  <td>{item.POP}</td>
                  <td>{item.SKY}</td>
                  <td>{item.PTY}</td>
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

export default ThreeDayForecast;
