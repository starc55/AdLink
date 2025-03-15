import React, { useState, useEffect } from "react";
import "../style.css";
import maleSvg from "../img/male.svg";
import femaleSvg from "../img/female.svg"; 
import backgroundImg from "../img/bg.png";
import coupleSvg from "../img/couple.svg";
import { useNavigate } from "react-router-dom"; 

const onboardingData = [
  {
    title: "ДОБРО ПОЖАЛОВАТЬ!",
    text: "Игра представляет собой боевые сражения один на один между реальными игроками в формате пошаговых баттлов. Игроки выбирают область атаки или защиты в ограниченное время. Побеждает тот, кто первым нанесёт противнику достаточное количество урона.",
    buttonText: "ПРОДОЛЖИТЬ",
  },
  {
    title: "ГЛАВНЫЙ ПРИЗ!",
    text: "Шанс выиграть главный приз есть у каждого игрока. \n +10 000 РУБ.",
    buttonText: "ПРОДОЛЖИТЬ",
  },
  {
    title: "ВЫБЕРИТЕ ГЕНДЕР ПЕРСОНАЖА",
  },
];

const Onboarding = () => {
  const [onboardingState, setOnboardingState] = useState({
    pageIndex: 0,
    gender: "male",
    bgPosition: "100% 50%",
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.requestFullscreen?.();
  }, []);

  const handleNextPage = () => {
    setOnboardingState((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex < 2 ? prev.pageIndex + 1 : prev.pageIndex,
    }));
  };

  const handleGenderSelect = (selectedGender) => {
    setOnboardingState((prev) => ({
      ...prev,
      gender: selectedGender,
      bgPosition: selectedGender === "male" ? "100% 50%" : "0% 50%",
    }));
  };

  const handleSkip = () => setOnboardingState((prev) => ({ ...prev, pageIndex: 2 }));

  const handleStartGame = () => {
    localStorage.setItem("userGender", onboardingState.gender);
    navigate("/main");
  };

  return (
    <div
      className="onboarding-container"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: onboardingState.bgPosition,
        transition: "background-position 1s ease-in-out",
      }}
    >
      <button className="onboarding-skip" onClick={handleSkip}>
        <span>ПРОПУСТИТЬ</span>
      </button>
      
      {onboardingState.pageIndex < 2 && (
        <img src={coupleSvg} alt="couple" className="onboarding-couple" />
      )}

      {onboardingState.pageIndex === 2 && (
        <div className="gender-image-container">
          <img
            src={onboardingState.gender === "male" ? maleSvg : femaleSvg}
            alt="Character"
            className="gender-image"
          />
        </div>
      )}

      <div className="onboarding-card">
        <div className="onboarding-content">
          {onboardingState.pageIndex < 2 ? (
            <>
              <h2 className="onboarding-title">
                {onboardingData[onboardingState.pageIndex].title}
              </h2>
              <p className="onboarding-text" style={{ color: "#ddd" }}>
                {onboardingData[onboardingState.pageIndex].text}
              </p>
              <button className="onboarding-button" onClick={handleNextPage}>
                {onboardingData[onboardingState.pageIndex].buttonText}
              </button>
            </>
          ) : (
            <>
              <h2 className="onboarding-title">ВЫБЕРИТЕ ГЕНДЕР ПЕРСОНАЖА</h2>
              <div className="gender-selector">
                <div
                  className="gender-slider"
                  style={{
                    transform:
                      onboardingState.gender === "male"
                        ? "translateX(0)"
                        : "translateX(95%)",
                  }}
                ></div>

                <button
                  className={`gender-btn ${
                    onboardingState.gender === "male" ? "selected" : ""
                  }`}
                  onClick={() => handleGenderSelect("male")}
                >
                  МУЖЧИНА
                </button>
                <button
                  className={`gender-btn ${
                    onboardingState.gender === "female" ? "selected" : ""
                  }`}
                  onClick={() => handleGenderSelect("female")}
                >
                  ЖЕНЩИНА
                </button>
              </div>
              <button className="onboarding-start_btn" onClick={handleStartGame}>
                НАЧАТЬ ИГРУ
              </button>
            </>
          )}
        </div>

        <div className="onboarding-dots">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className={`onboarding-dot ${
                idx === onboardingState.pageIndex ? "active" : ""
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
