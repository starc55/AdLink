import React, { useState, useMemo, useCallback, useEffect } from "react";
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
  const [activeTab, setActiveTab] = useState("hub");

  useEffect(() => {
    setActiveTab(activePage);
  }, [activePage]);

  const handleNavClick = useCallback(
    (id) => {
      setActiveTab(id);
      setActivePage(id);
    },
    [setActivePage]
  );

  const translateX = useMemo(() => {
    return `${navItems.findIndex((item) => item.id === activeTab) * 120}%`;
  }, [activeTab]);

  return (
    <div className="bottom-navbar">
      <div
        className="moving-border"
        style={{ transform: `translateX(${translateX})` }}
      >
        <div className="curve"></div>
      </div>

      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${activeTab === item.id ? "active" : ""}`}
          onClick={() => handleNavClick(item.id)}
        >
          <img
            src={item.icon}
            alt={item.label}
            className={`nav-icon ${item.id}-icon`}
          />
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavbar;
