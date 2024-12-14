import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>NutriFarm</h1>
      <p>건강한 식단을 위한 영양성분 관리 서비스입니다.</p>
      <div style={{ margin: "30px 0" }}>
        <p>주요 기능:</p>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <Link to="/search" style={{ textDecoration: "none" }}>
              <button style={styles.button}>음식 검색</button>
            </Link>
          </li>
          <li>
            <Link to="/mylist" style={{ textDecoration: "none" }}>
              <button style={styles.button}>나만의 영양 목록</button>
            </Link>
          </li>
          <li>
            <Link to="/stats" style={{ textDecoration: "none" }}>
              <button style={styles.button}>통계 보기</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  button: {
    padding: "15px 30px",
    fontSize: "16px",
    margin: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "1px solid #ddd",
    backgroundColor: "#f4f4f4",
    transition: "all 0.2s ease-in-out",
  },
};

export default Home;
