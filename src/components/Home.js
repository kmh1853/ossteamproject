import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>NutriFarm</h1>
      <p>건강한 식단을 위한 영양성분 관리 서비스입니다.</p>
      <Link to="/foodlist">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          식품 목록 검색하기
        </button>
      </Link>
    </div>
  );
};

export default Home;
