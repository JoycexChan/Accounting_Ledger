import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import "../app/globals.css";
import styles from "./accounting.module.css";
import Link from "next/link";

interface Transaction {
  id: string;
  userId: string;
  type: string;
  amount: number;
  description: string;
}

const Accounting = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [type, setType] = useState<string>("expense");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const q = query(
          collection(db, "transactions"),
          where("userId", "==", user.uid)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const transactionsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Transaction[];
          setTransactions(transactionsData);
        });
        return () => unsubscribe();
      } else {
        setUser(null);
        setTransactions([]);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const handleAddTransaction = async () => {
    if (!user) return;

    try {
      const newTransaction: Omit<Transaction, "id"> = {
        userId: user.uid,
        type: type,
        amount: type === "income" ? parseFloat(amount) : -parseFloat(amount),
        description: description,
      };
      await addDoc(collection(db, "transactions"), newTransaction);
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteDoc(doc(db, "transactions", id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const totalAmount = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  return (
    <div className={styles.container}>
      {user && <p>您已經使用 {user.email} 登入</p>}
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
