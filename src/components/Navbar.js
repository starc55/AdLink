import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import "../Css/Navbar.css";
import ambulance from "../img/ambulance.svg";
import coin from "../img/coin.svg";
import play from "../img/play.svg";
import trophy from "../img/trophy.svg";
import boom from "../img/boom.svg";

const navItems = [
  { id: "hub", label: "ХАБ", icon: play },
  { id: "battle", label: "БАТТЛЫ", icon: boom },
  { id: "rating", label: "РЕЙТИНГ", icon: trophy },
  { id: "wallet", label: "КОШЕЛЁК", icon: coin },
  { id: "medkit", label: "АПТЕЧКА", icon: ambulance },
];

const BottomNavbar = ({ activePage, setActivePage }) => {
  const [activeTab, setActiveTab] = useState(activePage);
  const [borderStyle, setBorderStyle] = useState({ left: 0, width: 0 });
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Animatsiyani o‘chirish uchun flag
  const navRefs = useRef([]);

  useEffect(() => {
    setActiveTab(activePage);
  }, [activePage]);

  useLayoutEffect(() => {
    const activeElement = navRefs.current.find(
      (el) => el && el.dataset.id === activeTab
    );

    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setBorderStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setActivePage(id);
    setIsFirstLoad(false); // Endi animatsiya ishlashi mumkin
  };

  return (
    <div className="bottom-navbar">
      <div className="nav-container">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            data-id={item.id}
            ref={(el) => (navRefs.current[index] = el)}
            className={`nav-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => handleTabChange(item.id)}
          >
            <img src={item.icon} alt={item.label} className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
        <div
          className="moving-border"
          style={{
            left: `${borderStyle.left}px`,
            width: `${borderStyle.width}px`,
            transition: isFirstLoad ? "none" : "left 0.3s ease, width 0.3s ease",
          }}
        >
          <div className="curve"></div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
