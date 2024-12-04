import axios from "axios";
import React, { useState } from "react";

const FoodList = () => {
  const [foodList, setFoodList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(
        "/service/1390802/AgriFood/MzenFoodCode/getKoreanFoodList",
        {
          params: {
            serviceKey: process.env.REACT_APP_API_KEY,
            pageNo: 1,
            numOfRows: 100,
          },
        }
      );

      const parser = new DOMParser();
      const xml = parser.parseFromString(response.data, "application/xml");
      const items = Array.from(xml.getElementsByTagName("item"));

      const data = items.map((item) => ({
        foodCode: item.getElementsByTagName("food_Code")[0]?.textContent,
        foodName: item.getElementsByTagName("food_Name")[0]?.textContent,
      }));

      setFoodList(data);
      setFilteredList(data);
    } catch (error) {
      console.error("API 호출 에러:", error);
    }
  };

  const handleSearch = () => {
    const filtered = foodList.filter((item) =>
      item.foodName.includes(searchKeyword)
    );
    setFilteredList(filtered);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>식품 목록</h2>
      <input
        type="text"
        placeholder="식품명을 입력하세요"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        style={{
          padding: "10px",
          marginRight: "10px",
          width: "300px",
          fontSize: "16px",
        }}
      />
      <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
        검색
      </button>
      <button onClick={fetchFoodList} style={{ padding: "10px 20px", marginLeft: "10px" }}>
        전체 목록 가져오기
      </button>
      <ul style={{ marginTop: "20px", listStyle: "none", padding: "0" }}>
        {filteredList.map((item, index) => (
          <li key={index} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            <strong>이름:</strong> {item.foodName} | <strong>코드:</strong> {item.foodCode}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
