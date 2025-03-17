import React, { useEffect, useState } from "react";
import BottomNavbar from "../components/Navbar";
import heart from "../img/Heart.svg";
import star from "../img/star.svg";
import ambulance from "../img/ambulance.svg";
import avatar from "../img/inner.svg";
import skull from "../img/boom.svg";
import battle from "../img/battle.svg";
import "../style.css";
import { useNavigate } from "react-router-dom";

const opponentsList = [
  { name: "Player1", avatar: avatar },
  { name: "Player2", avatar: avatar },
  { name: "Player3", avatar: avatar },
];
const BattlePage = ({ setActivePage, hearts, stars, userName }) => {
  const TotalHearts = 9;
  const [timeLeft, setTimeLeft] = useState("");
  const [opponent, setOpponent] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateTimer = () => {
      const lastClaimDate = localStorage.getItem("lastClaimDate");
      const nextRewardTime = new Date(lastClaimDate);
      nextRewardTime.setDate(nextRewardTime.getDate() + 1);

      const now = new Date();
      const diff = nextRewardTime - now;

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      } else {
        setTimeLeft("0:00:00");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleFindOpponent = () => {
    setIsSearching(true);

    setTimeout(() => {
      const randomOpponent =
        opponentsList[Math.floor(Math.random() * opponentsList.length)];
      setOpponent(randomOpponent);
      setIsSearching(false);
      setShowModal(true);
    }, 2000); // 2 soniyadan keyin opponent topiladi
  };

  const handleStartFight = () => {
    navigate("/fight", {
      state: { user: { name: userName, avatar, hearts }, opponent },
    });
  };

  return (
    <div className="main-page">
      <div className="battle_header">
        <div className="user_top_data">
          <img src={heart} alt="" />
          {Array.from({ length: TotalHearts }, (_, index) => (
            <div
              key={index}
              className={index < hearts ? "heart_rate" : "heart_rate-outline"}
            ></div>
          ))}

          <p className="timeleft">
            <span className="timeleft_text">До бонуса:</span>
            {timeLeft}{" "}
            <span>
              <img src={ambulance} alt="" />
              +1
            </span>
          </p>
        </div>

        <hr />

        <div className="user_bottom_data">
          <img src={avatar} alt="" />
          <span className="bottom_name">{userName}</span>
          <img src={ambulance} alt="" className="bottom_data_ambulance" />
          <span className="bottom_reward">{hearts}</span>
          <img src={star} alt="" />
          <span className="bottom_reward">{stars}</span>
        </div>
      </div>

      <div className="battle_card">
        <div className="battle_card_top-data">
          <p>Доступные баттлы:</p>
          <p>Участники:</p>
        </div>
        <div className="battle_card_bottom-data">
          <img src={skull} alt="" />
          <p>123</p>
          <p className="batlle_gamers">1 456</p>
        </div>

        <hr />

        <div className="batlle_data">
          <p className="battle_data_title">До финального боя:</p>
          <img src={star} alt="" className="battle_data-star" />
          <p>15/50</p>
        </div>

        {isSearching ? (
          <button className="battle_data-btn loading">
            Поиск соперника...
          </button>
        ) : opponent ? (
          <>
            <div className="battle_opponent animated">
              <img src={avatar} alt="" className="fade-in" />
              <span className="battle_vs">VS</span>
              <img src={opponent.avatar} alt="" className="fade-in" />
            </div>
            <button
              className="battle_data-btn green-btn"
              onClick={handleStartFight}
            >
              Начать бой
            </button>
          </>
        ) : (
          <button className="battle_data-btn" onClick={handleFindOpponent}>
            Подобрать соперника
          </button>
        )}

        <img src={battle} alt="" className="battle_img" />
      </div>

      <BottomNavbar setActivePage={setActivePage} activePage="battle" />

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Бой найден!</h2>
            <img src={opponent.avatar} alt="" className="fade-in" />
            <p>Ваш соперник: {opponent.name}</p>
            <button onClick={() => setShowModal(false)} className="close-btn">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BattlePage;
