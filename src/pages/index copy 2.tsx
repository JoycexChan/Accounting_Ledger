import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import "../app/globals.css";
import styles from "./home.module.css";
import Link from "next/link";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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
    <div>
      <h1>React 練習專案</h1>
      {user ? (
        <div>
          <p>您已經使用 {user.email} 登入</p>
          <button onClick={() => router.push("/accounting")}>立即開始</button>
          <button onClick={handleLogout}>登出</button>
        </div>
      ) : (
        <div>
          <div>
            <h2>登入系統</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button onClick={handleLogin}>登入</button>
          </div>
          <div>
            <h2>註冊帳戶</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button onClick={handleRegister}>註冊</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
