import React from "react";
import "./fight.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import heart from "../img/Heart.svg";
import ambulance from "../img/ambulance.svg";
import fight from "../img/fight.svg";
import timer from "../img/timer.svg";

const Fight = () => {
  const location = useLocation();
  const { user, opponent } = location.state || { user: {}, opponent: {} };
  const [timeLeft, setTimeLeft] = useState(10);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowAnimation(true);
    }
  }, [timeLeft]);
  return (
    <div className="fight_container">
      <div className="fight_header">
        <div className="player_info">
          <img src={user.avatar} alt={user.name} className="player_avatar" />
          <div className="player_title">
            <span className="player_name">{user.name}</span>
            <div>
              <img src={ambulance} alt="" />
              <span className="playe_rate">{user.hearts}</span>
            </div>
          </div>
          <div className="heart_container">
            <img src={heart} alt="" />
            {Array.from({ length: 9 }, (_, index) => (
              <div
                key={index}
                className={
                  index < user.hearts ? "heart_rate" : "heart_rate-outline"
                }
              ></div>
            ))}
          </div>
        </div>

        <hr />

        <div className="player_info">
          <img
            src={opponent.avatar}
            alt={opponent.name}
            className="player_avatar"
          />
          <div className="player_title">
            <span className="player_name">{opponent.name}</span>
          </div>

          <div className="heart_container">
            {Array.from({ length: 9 }, (_, index) => (
              <div
                key={index}
                className={
                  index < opponent.hearts ? "heart_filled" : "heart_empty"
                }
              ></div>
            ))}
          </div>
        </div>
      </div>

      <img src={fight} alt="" className="fight_img" />

      <div className="fight_control">
        <div className="block">
          <label htmlFor="">Блок</label>
          <button className="fight_btn">Челюсть</button>
          <button className="fight_btn">Грудь</button>
          <button className="fight_btn">Пах</button>
        </div>

        <div className="attack">
          <label htmlFor="">Атака</label>
          <button className="fight_btn">Челюсть</button>
          <button className="fight_btn">Грудь</button>
          <button className="fight_btn">Пах</button>
        </div>
      </div>

      <div className="fight_foot">
        <button className="back_to_main">Выйти</button>
        <button className="take_ambulance">
          <span className="take_ambulance-text">
            <img src={ambulance} alt="" />
          </span>
          Лечиться
        </button>
      </div>

      {!showAnimation && (
        <div className="timer-box">
          <span className="clock-icon">
            <img src={timer} alt="" />
          </span>
          <span className="timer-text">
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
        </div>
      )}
    </div>
  );
};

export default Fight;
