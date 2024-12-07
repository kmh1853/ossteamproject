import React, { useState } from 'react';
import axios from 'axios';

const FoodList = () => {
  const [keyword, setKeyword] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    // 백엔드 서버로 요청
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
      <h1>Search Food by Ingredient</h1>
      <div className="search-bar">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter ingredient (e.g., 고추)"
        />
        <button onClick={handleSearch} disabled={loading} className="search-button">
          Search
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
