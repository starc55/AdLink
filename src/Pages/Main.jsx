import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mainMale from "../img/mainMale.svg";
import mainFemale from "../img/mainFemale.svg";
import BottomNavbar from "../components/Navbar";
import heart from "../img/Heart.svg";
import inner from "../img/inner.svg";
import star from "../img/star.svg";
import ambulance from "../img/ambulance.svg";
import BattlePage from "./BattlePage";
import RatingPage from "./RatingPage";
import WalletPage from "./Wallet";
import "../style.css";
import rectangle from "../img/rectangle.svg";

const modalVariants = {
  hidden: { y: "50vh", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: {
    y: "50vh",
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const MainPage = () => {
  const [activePage, setActivePage] = useState("hub");
  const [showModal, setShowModal] = useState(false);
  const [gender, setGender] = useState(
    localStorage.getItem("userGender") || "male"
  );
  const [hearts, setHearts] = useState(
    parseInt(localStorage.getItem("userHearts"), 10) || 6
  );
  const [stars, setStars] = useState(
    parseInt(localStorage.getItem("userStars"), 10) || 3456
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || "User Name"
  );

  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 5;

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activePage}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`main-page ${showModal ? "blur" : ""}`}
      >
        {activePage === "battle" ? (
          <BattlePage
            setActivePage={setActivePage}
            hearts={hearts}
            stars={stars}
            userName={userName}
          />
        ) : activePage === "rating" ? (
          <RatingPage
            setActivePage={setActivePage}
            hearts={hearts}
            stars={stars}
            userName={userName}
          />
        ) : activePage === "wallet" ? (
          <WalletPage
            setActivePage={setActivePage}
            hearts={hearts}
            stars={stars}
            userName={userName}
          />
        ) : (
          <>
            <div className="inner_container">
              <div className="inner_cont">
                <button
                  className="inner_btn"
                  onClick={() => setShowModal(true)}
                >
                  Купить аптечки
                </button>
                <div className="heart_container">
                  <img src={heart} alt="" />
                  {Array.from({ length: 9 }, (_, index) => (
                    <div
                      key={index} 
                      className={
                        index < hearts ? "heart_rate" : "heart_rate-outline"
                      }
                    ></div>
                  ))}
                </div>
              </div>
              <div className="inner_bottom">
                <img src={inner} alt="example" />
                <p>{userName}</p>
                <span className="inner_number">
                  <img src={ambulance} alt="example" />
                  <span>{hearts}</span>
                  <img src={star} alt="example" />
                  <span>{stars}</span>
                </span>
              </div>
            </div>
            <img
              src={gender === "male" ? mainMale : mainFemale}
              alt="Character"
              className="main_gender"
            />
            <BottomNavbar
              setActivePage={setActivePage}
              activePage={activePage}
            />
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={rectangle} alt="" />
              <h2 className="buy-title">Купить аптечки</h2>
              <div>
                <div className="buy_title">
                  <p>Баланс</p>
                  <p>Аптечки</p>
                </div>
                <div className="buy_sub">
                  <img src={star} alt="" className="buy-img_star" />
                  <span className="buy_value">{stars}</span>
                  <img src={ambulance} alt="" className="buy-img" />
                  <span className="buy_value">{hearts}</span>
                </div>
              </div>
              <div className="quantity-control">
                <button onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
              <p>К оплате: {quantity * pricePerItem} ₽</p>
              <button className="buy-btn">Купить</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default MainPage;
