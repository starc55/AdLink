import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./components/Onboarding";
import MainPage from "./Pages/Main.jsx";
import "./style.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
