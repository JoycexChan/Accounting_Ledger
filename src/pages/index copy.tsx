import React from "react";
import "../app/globals.css";
import styles from "./home.module.css";
import Link from "next/link";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <h1 className={styles.title}>React 練習專案</h1>
      </div>

      <div className={styles.container_2}>
        <p className={styles.subtitle}>歡迎光臨我的頁面</p>
      </div>

      <div className={styles.container_3}>
        <Link href="/accounting" passHref>
          <button className={styles.button}>點此開始</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
