import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../style.css";
import avatar from "../img/inner.svg";
import star from "../img/star.svg";
import BottomNavbar from "../components/Navbar";
import rectangle from "../img/rectangle.svg";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const transactions = [
  { type: "Вывод", date: "12.01.25", amount: -123 },
  { type: "Начисление", date: "21.01.25", amount: +242 },
  { type: "Вывод", date: "12.01.25", amount: -123 },
  { type: "Начисление", date: "21.01.25", amount: +242 },
  { type: "Вывод", date: "12.01.25", amount: -123 },
  { type: "Начисление", date: "21.01.25", amount: +242 },
  { type: "Вывод", date: "12.01.25", amount: -123 },
  { type: "Начисление", date: "21.01.25", amount: +242 },
  { type: "Вывод", date: "12.01.25", amount: -123 },
  { type: "Начисление", date: "21.01.25", amount: +242 },
  { type: "Вывод", date: "12.01.25", amount: -123 },
  { type: "Начисление", date: "21.01.25", amount: +242 },
  { type: "Вывод", date: "12.01.25", amount: -123 },
  { type: "Начисление", date: "21.01.25", amount: +242 },
  { type: "Вывод", date: "12.01.25", amount: -123 },
  { type: "Начисление", date: "21.01.25", amount: +242 },
  { type: "Вывод", date: "12.01.25", amount: -123 },
  { type: "Начисление", date: "21.01.25", amount: +242 },
];

const WalletPage = ({ setActivePage, stars, userName }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [walletNumber, setWalletNumber] = useState("");

  const totalAmount = Math.max(0, stars - withdrawAmount);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="wallet-page"
    >
      {/* Header */}
      <div className="wallet_header">
        <div className="wallet_header-status">
          <img src={avatar} alt="" />
          <span className="player-name">{userName}</span>
          <img src={star} alt="" className="wallet-star" />
          <span className="wallet_star_rate">{stars}</span>
        </div>

        <button className="send_request" onClick={() => setModalOpen(true)}>
          Запросить вывод
        </button>
      </div>

      {/* Transaction List */}
      <div className="transactions_list">
        {transactions.map((txn, index) => (
          <motion.div
            key={index}
            className="transaction_card"
            style={{
              backgroundColor: "#10295C",
              borderRadius: "10px",
              color: "#fff",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="transaction_info">
              <span className="transaction_type">{txn.type}</span>
              <span className="transaction_date">{txn.date}</span>
            </div>
            <div className="transaction_amount">
              <img src={star} alt="Star" className="transaction_star" />
              <span
                className="transaction_value"
                style={{ color: txn.amount < 0 ? "#E24C03" : "#B4FF00" }}
              >
                {txn.amount}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Blur Background */}
            <motion.div
              className="modal_backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="modal_container"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <img src={rectangle} alt="" />
              <h2 className="wallet-request-title">Вывод средств</h2>
              <p className="balance">
                Текущий баланс:
                <br /> <img src={star} alt="Star" />{" "}
                <b className="balance_star">{stars}</b>
              </p>

              <div className="request_input">
                <input
                  type="number"
                  id="withdrawAmount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  placeholder="Сумма вывода"
                  className="top"
                />
                <input
                  type="text"
                  value={totalAmount}
                  readOnly
                  placeholder="Итого"
                  className="top"
                />
              </div>

              <input
                type="text"
                id="walletNumber"
                placeholder="Номер кошелька"
                value={walletNumber}
                onChange={(e) => setWalletNumber(e.target.value)}
                className="wallet_location"
              />
              <br />
              <button
                className="modal_button"
                disabled={!withdrawAmount || !walletNumber}
              >
                Отправить запрос
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNavbar setActivePage={setActivePage} activePage="wallet" />
    </motion.div>
  );
};

export default WalletPage;
