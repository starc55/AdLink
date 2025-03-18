import React from "react";
import { motion } from "framer-motion";
import "../style.css";
import starIcon from "../img/star.svg";
import BottomNavbar from "../components/Navbar";
import avatar from "../img/inner.svg";
import heart from "../img/Heart.svg";
import ambulance from "../img/ambulance.svg";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const users = [
  { id: 1, name: "User 1", stars: 123456, avatar: avatar },
  { id: 2, name: "User 2", stars: 1100456, avatar: avatar },
  { id: 3, name: "User 3", stars: 1090456, avatar: avatar },
  { id: 4, name: "User 4", stars: 999456, avatar: avatar },
  { id: 5, name: "User 5", stars: 876456, avatar: avatar },
  { id: 6, name: "User 6", stars: 754456, avatar: avatar },
  { id: 7, name: "User 7", stars: 532456, avatar: avatar },
  { id: 8, name: "User 8", stars: 456123, avatar: avatar },
  { id: 9, name: "User 9", stars: 401234, avatar: avatar },
  { id: 9, name: "User 9", stars: 401234, avatar: avatar },
  { id: 9, name: "User 9", stars: 401234, avatar: avatar },
  { id: 9, name: "User 9", stars: 401234, avatar: avatar },
  { id: 9, name: "User 9", stars: 401234, avatar: avatar },
  { id: 9, name: "User 9", stars: 401234, avatar: avatar },
];

const RatingPage = ({ setActivePage, hearts, stars, userName }) => {
  return (
    <div>
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="rating-page"
      > 
        <div className="rating_container">
          <div className="rating_header">
            <img src={avatar} alt="" className="rating_avatar" />
            <span className="player-name">{userName}</span>
            <div className="heart-container">
              <img src={heart} alt="" className="rating_heart" />
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
          <hr />
          <div className="player-stats">
            <img src={ambulance} alt="" className="rating_ambulance" />
            <p>{hearts}</p>
            <img src={starIcon} alt="Star" className="star_icon" />
            <p>{stars}</p>
          </div>
          <hr className="rating-gap" />
          <div className="rating_footer">
            <div className="rating_footer-title">
              <p>Ваше место:</p>
              <p>До повышения:</p>
            </div>
            <div className="rating_footer_paragraph">
              <p>234</p>
              <img src={starIcon} alt="" />
              <span>+10</span>
            </div>
          </div>
        </div>

        <div className="rating_list-container">
          <div className="rating_list">
            {users.map((user, index) => {
              return (
                <motion.div
                  key={user.id}
                  className="rating_card"
                  style={{
                    backgroundColor:
                      userName === user.name ? "#FFD700" : "#10295C",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="ranking-number">{index + 1}</span>
                  <img
                    src={user.avatar}
                    alt=""
                    className="rating_avatar_small"
                  />
                  <span className="player-name">{user.name}</span>
                  <img src={starIcon} alt="Star" className="star_icon_small" />
                  <span className="player-stars">
                    {user.stars.toLocaleString()}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <BottomNavbar setActivePage={setActivePage} activePage="rating" />
    </div>
  );
};

export default RatingPage;
