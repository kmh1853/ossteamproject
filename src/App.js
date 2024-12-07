import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import MyList from "./components/MyList";
import Stats from "./components/Stats";
import NutrientDetails from "./components/NutrientDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/details/:foodCode" element={<NutrientDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
