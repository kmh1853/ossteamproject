import axios from "axios";
import React, { useEffect, useState } from "react";
import "./SearchAndFilter.css";

const SearchAndFilter = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 지역 검색어
  const [categoryFilter, setCategoryFilter] = useState(""); // 선택된 카테고리
  const [forecast, setForecast] = useState([]); // 전체 날씨 데이터
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    { value: "TMP", label: "온도 (°C)" },
    { value: "POP", label: "강수 확률 (%)" },
    { value: "SKY", label: "하늘 상태" },
    { value: "PTY", label: "강수 형태" },
  ];

  // 현재 날짜와 시간을 계산
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = now.getHours();

    let baseTime;
    if (hours < 2) {
      baseTime = "2300";
      now.setDate(now.getDate() - 1);
    } else if (hours < 5) {
      baseTime = "0200";
    } else if (hours < 8) {
      baseTime = "0500";
    } else if (hours < 11) {
      baseTime = "0800";
    } else if (hours < 14) {
      baseTime = "1100";
    } else if (hours < 17) {
      baseTime = "1400";
    } else if (hours < 20) {
      baseTime = "1700";
    } else if (hours < 23) {
      baseTime = "2000";
    } else {
      baseTime = "2300";
    }

    return { date: `${year}${month}${day}`, time: baseTime };
  };

  // API 호출 함수
  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setForecast([]);
    setFilteredData([]);

    const { date, time } = getCurrentDateTime();
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const endpoint = process.env.REACT_APP_WEATHER_API_ENDPOINT;

    try {
      const response = await axios.get(`${endpoint}/getVilageFcst`, {
        params: {
          serviceKey: apiKey,
          pageNo: 1,
          numOfRows: 1000,
          dataType: "JSON",
          base_date: date,
          base_time: time,
          nx: 60, // 기본 위치값 (서울 예시)
          ny: 127,
        },
      });

      const items = response.data.response.body.items.item;
      setForecast(items);

      // 지역 및 카테고리로 필터링
      const filtered = items.filter((item) => {
        const matchesCategory = categoryFilter && item.category === categoryFilter;
        return matchesCategory;
      });

      setFilteredData(filtered);
    } catch (err) {
      setError("데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!categoryFilter) {
      setFilteredData([]);
      return;
    }

    const filtered = forecast.filter((item) => item.category === categoryFilter);
    setFilteredData(filtered);
  }, [categoryFilter, forecast]);

  return (
    <div className="search-and-filter-container">
      <h1 className="search-header">🌤️ Weather Search</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="지역 이름 입력..."
          className="search-input"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">카테고리 선택</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <button onClick={handleSearch} className="search-button">
          검색
        </button>
      </div>
      {loading && <p className="loading">로딩 중...</p>}
      {error && <p className="error">{error}</p>}
      <div className="results-container">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={index} className="result-card">
              <h3>
                {item.fcstDate} {item.fcstTime}
              </h3>
              <p>카테고리: {categories.find((c) => c.value === item.category)?.label || item.category}</p>
              <p>값: {item.fcstValue}</p>
            </div>
          ))
        ) : (
          <p className="no-results">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
