import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import heart from "../img/Heart.svg";
import ambulance from "../img/ambulance.svg";
import fight from "../img/fight.svg";
import timer from "../img/timer.svg";
import blockImg from "../img/block.svg";
import superHitImg from "../img/super_hit.svg";
import maleLoser from "../img/loser_male.svg";
import femaleLoser from "../img/loser_female.svg";
import "./fight.css";

const Fight = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, opponent } = location.state || { user: {}, opponent: {} };

  const [timeLeft, setTimeLeft] = useState(10);
  const [showAnimation, setShowAnimation] = useState(false);
  const [userBlock, setUserBlock] = useState(null);
  const [userAttack, setUserAttack] = useState(null);
  const [opponentBlock, setOpponentBlock] = useState(null);
  const [result, setResult] = useState(null);

  const [userHearts, setUserHearts] = useState(
    parseInt(localStorage.getItem("userHearts")) || user.hearts || 9
  );
  const [opponentHearts, setOpponentHearts] = useState(
    parseInt(localStorage.getItem("opponentHearts")) || opponent.hearts || 9
  );

  const [activeAttack, setActiveAttack] = useState(null);
  const [activeBlock, setActiveBlock] = useState(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowAnimation(true);
      handleOpponentAttack();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (result) {
      setTimeout(() => {
        setResult(null);
        setActiveAttack(null);
      }, 500);
    }
  }, [result]);

  useEffect(() => {
    localStorage.setItem("userHearts", userHearts);
    localStorage.setItem("opponentHearts", opponentHearts);
  }, [userHearts, opponentHearts]);

  const handleAttack = (attackType) => {
    if (timeLeft > 0 || userHearts === 0 || opponentHearts === 0) return;

    setUserAttack(attackType);
    setActiveAttack(attackType);

    const blockOptions = ["Челюсть", "Грудь", "Пах"];
    const randomBlock =
      blockOptions[Math.floor(Math.random() * blockOptions.length)];
    setOpponentBlock(randomBlock);

    if (attackType === randomBlock) {
      setResult("block");
    } else {
      setResult("superHit");
      setOpponentHearts((prev) => Math.max(0, prev - 1));
    }

    handleOpponentAttack();
  };

  const handleOpponentAttack = () => {
    const attackOptions = ["Челюсть", "Грудь", "Пах"];
    const randomAttack =
      attackOptions[Math.floor(Math.random() * attackOptions.length)];

    if (randomAttack !== userBlock) {
      setUserHearts((prev) => Math.max(0, prev - 1));
    }
  };

  const getLoserImage = () => {
    return user.gender === "male" ? maleLoser : femaleLoser;
  };

  return (
    <div className="fight_container">
      <div className="fight_header">
        <div className="player_info">
          <img src={user.avatar} alt={user.name} className="player_avatar" />
          <div className="player_title">
            <span className="player_name">{user.name}</span>
            <div>
              <img src={ambulance} alt="" />
              <span className="playe_rate">{userHearts}</span>
            </div>
          </div>
          <div className="heart_container">
            <img src={heart} alt="" />
            {Array.from({ length: 9 }, (_, index) => (
              <div
                key={index}
                className={
                  index < userHearts ? "heart_rate" : "heart_rate-outline"
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
            <img src={heart} alt="" className="opponent-heart" />
            {Array.from({ length: 9 }, (_, index) => (
              <div
                key={index}
                className={
                  index < opponentHearts ? "heart_rate" : "heart_rate-outline"
                }
              ></div>
            ))}
          </div>
        </div>
      </div>

      {userHearts === 0 || opponentHearts === 0 ? (
        <img
          src={getLoserImage()}
          alt="Loser"
          className="fight_img loser_img"
        />
      ) : showAnimation ? (
        <img src={fight} alt="" className="fight_img fight_animation" />
      ) : (
        <img src={fight} alt="" className="fight_img" />
      )}

      {result === "block" && (
        <img
          src={blockImg}
          alt="Блок!"
          className="fight_result_img block_effect"
        />
      )}
      {result === "superHit" && (
        <img
          src={superHitImg}
          alt="Супер удар!"
          className="fight_result_img super_hit_effect"
        />
      )}

      <div className="fight_control">
        <div className="block">
          <label htmlFor="">Блок</label>
          {["Челюсть", "Грудь", "Пах"].map((block) => (
            <button
              key={block}
              className={`fight_btn ${
                activeBlock === block ? "active-blue" : ""
              }`}
              onClick={() => setActiveBlock(block)}
              disabled={
                timeLeft > 0 || userHearts === 0 || opponentHearts === 0
              }
            >
              {block}
            </button>
          ))}
        </div>

        <div className="attack">
          <label htmlFor="">Атака</label>
          {["Челюсть", "Грудь", "Пах"].map((attack) => (
            <button
              key={attack}
              className={`fight_btn ${
                activeAttack === attack
                  ? result === "block"
                    ? "active-red"
                    : "active-green"
                  : ""
              }`}
              onClick={() => handleAttack(attack)}
              disabled={
                timeLeft > 0 || userHearts === 0 || opponentHearts === 0
              }
            >
              {attack}
            </button>
          ))}
        </div>
      </div>

      <div className="fight_foot">
        <button className="back_to_main" onClick={() => navigate("/main")}>
          Выйти
        </button>
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
