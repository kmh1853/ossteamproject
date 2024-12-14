import React, { useState } from 'react';
import axios from 'axios';
import './FoodList.css'; // Importing external CSS file for styling

const FoodList = () => {
  const [keyword, setKeyword] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    const apiUrl = `http://localhost:5000/api/foodlist?foodName=${encodeURIComponent(keyword)}`;

    try {
      const response = await axios.get(apiUrl);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const items = Array.from(xmlDoc.getElementsByTagName('item')).map((item) => ({
        foodName: item.getElementsByTagName('food_Name')[0]?.textContent,
        foodCode: item.getElementsByTagName('food_Code')[0]?.textContent,
      }));
      setFoodList(items);
    } catch (error) {
      setError('Failed to fetch food list. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="food-list-container">
      <h1>음식 검색</h1>
      <div className="search-bar">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="음식(재료)을 입력하세요"
        />
        <button onClick={handleSearch} disabled={loading} className="search-button">
          검색
        </button>
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="food-list">
        {foodList.map((food, index) => (
          <li key={index} className="food-item">
            <span className="food-name">{food.foodName}</span> 
            <span className="food-code">(Code: {food.foodCode})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
