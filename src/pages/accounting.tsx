import React, { useState } from "react";
import "../app/globals.css";
import styles from "./accounting.module.css";
import Link from "next/link";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  description: string;
}

const Accounting = () => {
  // 初始設定兩筆交易資料
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "income",
      amount: 5000,
      description: "五月份薪水",
    },
    {
      id: 2,
      type: "expense",
      amount: -1500,
      description: "租金",
    },
  ]);
  const [type, setType] = useState<string>("expense");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleAddTransaction = () => {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type: type,
      amount: type === "income" ? parseFloat(amount) : -parseFloat(amount),
      description: description,
    };
    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setDescription("");
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const totalAmount = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.container_in}>
        <div className={styles.container_input}>
          <select
            className={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">收入</option>
            <option value="expense">支出</option>
          </select>
          <div className={styles.formControl}>
            <input
              className={styles.input}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="金額"
            />
          </div>
          <div className={styles.formControl}>
            <input
              className={styles.input}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="備註"
            />
          </div>
          <button className={styles.button} onClick={handleAddTransaction}>
            新增記錄
          </button>
        </div>

        <div className={styles.container_output}>
          <ul className={styles.transactionList}>
            {transactions.map((transaction) => (
              <li className={styles.transactionItem} key={transaction.id}>
                <div className={styles.amountContainer}>
                  <span
                    className={`${styles.transactionAmount} ${
                      transaction.amount >= 0 ? styles.income : styles.expense
                    }`}
                  >
                    {transaction.amount}
                  </span>
                </div>
                <div className={styles.descriptionContainer}>
                  {transaction.description}
                </div>
                <button onClick={() => handleDeleteTransaction(transaction.id)}>
                  刪除
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.total}>小計：{totalAmount}</div>
      </div>

      <div className={styles.container_exit}>
        <Link href="/" passHref>
          <button className={styles.button}>回到首頁</button>
        </Link>
      </div>
    </div>
  );
};

export default Accounting;
