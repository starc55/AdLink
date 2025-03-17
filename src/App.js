import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./components/Onboarding";
import MainPage from "./Pages/Main.jsx";
import "./style.css";
import Fight from "./Pages/Fight.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/fight" element={<Fight />} />
      </Routes>
    </Router>
  );
}

export default App;
