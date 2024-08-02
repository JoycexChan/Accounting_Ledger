import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import "../app/globals.css";
import styles from "./home.module.css";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log("User registered:", userCredential.user);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log("User logged in:", userCredential.user);
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <h1 className={styles.title}>React 練習專案</h1>
      </div>

      <div className={styles.container_2}>
        <div className={styles.container_3}>
          {user ? (
            <div className={styles.container_3in}>
              <p className={styles.custom_p}>您已經使用 {user.email} 登入</p>
              <div className={styles.container_3button}>
                <button
                  className={styles.button2}
                  onClick={() => router.push("/accounting")}
                >
                  立即開始
                </button>
                <button className={styles.button2} onClick={handleLogout}>
                  登出
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.container_3in}>
              <h2 className={styles.custom_h2}>登入系統</h2>
              <div className={styles.input_text}>
                <label>電郵: </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className={styles.input_text}>
                <label>密碼: </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div>
                <button className={styles.button} onClick={handleLogin}>
                  登入
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.container_3}>
          <div className={styles.container_3in}>
            <h2 className={styles.custom_h2}>註冊帳戶</h2>

            <div className={styles.input_text}>
              <label>電郵: </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <div className={styles.input_text}>
              <label>密碼: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div>
              <button className={styles.button} onClick={handleRegister}>
                註冊
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
