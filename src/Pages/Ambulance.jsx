import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ambulance from "../img/ambulance.svg";
import star from "../img/star.svg";
import "../style.css";

const modalVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.3 } },
};

const AmbulanceModal = ({ isOpen, onClose,setsSho }) => {
  const [count, setCount] = useState(2);
  const pricePerUnit = 5;
  const totalPrice = count * pricePerUnit;

  const decreaseCount = () => setCount((prev) => Math.max(1, prev - 1));
  const increaseCount = () => setCount((prev) => prev + 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-container"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Купить аптечки</h2>
            <div className="balance-info">
              <span>
                <img src={star} alt="stars" /> 3 456
              </span>
              <span>
                <img src={ambulance} alt="ambulance" /> 24
              </span>
            </div>
            <div className="quantity-control">
              <button onClick={decreaseCount}>-</button>
              <span>{count}</span>
              <button onClick={increaseCount}>+</button>
            </div>
            <div className="price-info">
              <span>К оплате:</span>
              <span>{totalPrice} ₽</span>
            </div>
            <button className="buy-button">Купить</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AmbulanceModal;
