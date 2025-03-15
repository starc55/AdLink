import React, { useEffect, useState, useCallback } from "react";
import mainMale from "../img/mainMale.svg";
import mainFemale from "../img/mainFemale.svg";
import BottomNavbar from "../components/Navbar";
import heart from "../img/Heart.svg";
import inner from "../img/inner.svg";
import star from "../img/star.svg";
import ambulance from "../img/ambulance.svg";

const MainPage = () => {
  const [gender, setGender] = useState(
    localStorage.getItem("userGender") || "male"
  );
  const [hearts, setHearts] = useState(
    parseInt(localStorage.getItem("userHearts"), 10) || 6
  );
  const [rewardCollected, setRewardCollected] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const lastClaimDate = localStorage.getItem("lastClaimDate");
    const today = new Date().toDateString();

    if (lastClaimDate !== today) {
      setShowReward(true);
      setTimeout(() => setAnimate(true), 250);
    }
  }, []);

  const claimReward = useCallback(() => {
    setHearts((prevHearts) => {
      const newHearts = prevHearts + 1;
      localStorage.setItem("userHearts", newHearts);
      return newHearts;
    });
    localStorage.setItem("lastClaimDate", new Date().toDateString());
    setRewardCollected(true);
    setShowReward(false);
  }, []);

  return (
    <div className="main-page">
      {showReward && !rewardCollected && (
        <div className={`daily-reward ${animate ? "show" : ""}`}>
          <p>Ежедневная награда!</p>
          <div className="reward_container">
            <span className="reward">
              <img src={ambulance} alt="daily reward" />
              <span>+1</span>
            </span>
            <button onClick={claimReward}>Забрать</button>
          </div>
        </div>
      )}
      <div className="inner_container">
        <div className="inner_cont">
          <button className="inner_btn">Купить аптечки</button>
          <div className="heart_container">
            <img src={heart} alt="" />
            {Array.from({ length: 9 }, (_, index) => (
              <div
                key={index}
                className={index < hearts ? "heart_rate" : "heart_rate-outline"}
              ></div>
            ))}
          </div>
        </div>
        <div className="inner_bottom">
          <img src={inner} alt="example" />
          <p>User Name</p>
          <span className="inner_number">
            <img src={ambulance} alt="example" />
            <span>{hearts}</span>
            <img src={star} alt="example" />
            <span>3 456</span>
          </span>
        </div>
      </div>
      <img
        src={gender === "male" ? mainMale : mainFemale}
        alt="Character"
        className="main_gender"
      />
      <BottomNavbar />
    </div>
  );
};

export default MainPage;
