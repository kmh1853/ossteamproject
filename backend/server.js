const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// CORS 허용
app.use(cors());

// API 요청 프록시
app.get('/api/foodlist', async (req, res) => {
  const { foodName } = req.query; // 클라이언트에서 전달받은 검색어
  const apiUrl = `https://api.naas.go.kr/service/AgriFood/MzenFoodCode/getKoreanFoodList?serviceKey=mFKmea0pqDY2hihUpz2aNxFpDV74FStC3bXpGUmS19UHNiD7jrpd360YHrymuZ14LtTNa7DxujKr/HKx0bV4dA==&Page_No=1&Page_Size=30&food_Name=${encodeURIComponent(foodName)}&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data); // 클라이언트에 응답 전달
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Failed to fetch data');
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
