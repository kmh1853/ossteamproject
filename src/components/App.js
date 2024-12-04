import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FoodList from "./components/FoodList";
import NutrientDetails from "./components/NutrientDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FoodList />} />
        <Route path="/details/:foodCode" element={<NutrientDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
